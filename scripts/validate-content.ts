import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';

interface Diagnostic {
  readonly severity: 'error' | 'warning';
  readonly file: string;
  readonly line: number;
  readonly ruleId: string;
  readonly message: string;
}

const strictMode = process.argv.includes('--strict');
const reportTranslations = process.argv.includes('--report-translations');
const diagnostics: Diagnostic[] = [];

function addDiagnostic(
  severity: 'error' | 'warning',
  file: string,
  line: number,
  ruleId: string,
  message: string,
): void {
  diagnostics.push({ severity, file: path.relative(process.cwd(), file), line, ruleId, message });
}

function checkNfcAndPrivacy(
  file: string,
  raw: string,
  allowedEmail: string,
  allowedPhone: string,
): void {
  const lines = raw.split(/\r?\n/);
  const phoneRegex = /(?:\+84|0)(?:\s|\.|-)?\d{2,3}(?:\s|\.|-)?\d{3}(?:\s|\.|-)?\d{3,4}/g;
  const nationalIdRegex = /\b\d{9}\b|\b\d{12}\b/;
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const normalizedAllowedPhone = allowedPhone.replace(/\D/g, '');

  lines.forEach((lineText, idx) => {
    const lineNum = idx + 1;

    if (lineText !== lineText.normalize('NFC')) {
      addDiagnostic('error', file, lineNum, 'vi-nfc', 'Text is not Unicode NFC normalized.');
    }

    const phones = lineText.match(phoneRegex) ?? [];
    for (const phone of phones) {
      const normalized = phone.replace(/\D/g, '');
      const isAllowed =
        normalizedAllowedPhone.length > 0 &&
        (normalized === normalizedAllowedPhone ||
          (normalizedAllowedPhone.startsWith('0') &&
            normalized === `84${normalizedAllowedPhone.slice(1)}`));
      if (!isAllowed) {
        addDiagnostic('error', file, lineNum, 'privacy-phone', 'Possible phone number detected.');
      }
    }

    if (nationalIdRegex.test(lineText) && !lineText.includes('credentialId')) {
      addDiagnostic(
        'error',
        file,
        lineNum,
        'privacy-id',
        'Possible 9- or 12-digit national ID number detected.',
      );
    }

    const emails = lineText.match(emailRegex) ?? [];
    for (const email of emails) {
      if (email !== allowedEmail && !email.endsWith('@example.com')) {
        addDiagnostic(
          'error',
          file,
          lineNum,
          'privacy-email',
          `Unexpected email address "${email}" outside profile.email.`,
        );
      }
    }

    if (/\b(?:Lorem ipsum|REPLACE_ME)\b/i.test(lineText)) {
      addDiagnostic(
        'error',
        file,
        lineNum,
        'placeholder-text',
        'Leftover template placeholder ("Lorem ipsum" or "REPLACE_ME") found.',
      );
    }

    if (lineText.includes('TODO(owner)')) {
      addDiagnostic(
        strictMode ? 'error' : 'warning',
        file,
        lineNum,
        'todo-owner',
        'Unresolved TODO(owner) marker found.',
      );
    }
  });
}

function parseFrontmatter(raw: string): { readonly data: Record<string, unknown>; readonly body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: raw };
  }
  const parsed: unknown = parseYaml(match[1] ?? '');
  const data =
    parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {};
  return { data, body: match[2] ?? '' };
}

async function listMdxFiles(dir: string): Promise<readonly string[]> {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir);
  return entries.filter((f) => f.endsWith('.mdx')).sort();
}

async function main(): Promise<void> {
  const profilePath = path.resolve('content/profile.yaml');
  const profileRaw = await readFile(profilePath, 'utf8');
  const profileList = parseYaml(profileRaw) as Array<Record<string, unknown>>;
  const profile = profileList[0] ?? {};
  const allowedEmail = typeof profile.email === 'string' ? profile.email : '';
  const allowedPhone = typeof profile.phone === 'string' ? profile.phone : '';

  // 1. Profile checks
  checkNfcAndPrivacy(profilePath, profileRaw, allowedEmail, allowedPhone);
  const tagline = profile.tagline as Record<string, unknown> | undefined;
  for (const lang of ['en', 'vi'] as const) {
    const val = tagline?.[lang];
    if (typeof val === 'string' && val.length > 60) {
      addDiagnostic(
        'error',
        profilePath,
        1,
        'length-tagline',
        `profile.tagline.${lang} exceeds 60 chars (${val.length}).`,
      );
    }
  }
  if (typeof profile.avatar === 'string') {
    const avatarFile = path.resolve('assets', profile.avatar.replace(/^\/+/, ''));
    if (!existsSync(avatarFile)) {
      addDiagnostic('error', profilePath, 1, 'missing-asset', `Avatar not found: ${profile.avatar}`);
    }
  }

  // 2. Other YAML files
  for (const yamlName of ['experience.yaml', 'education.yaml', 'certificates.yaml', 'skills.yaml']) {
    const p = path.resolve('content', yamlName);
    const raw = await readFile(p, 'utf8');
    checkNfcAndPrivacy(p, raw, allowedEmail, allowedPhone);

    if (yamlName === 'certificates.yaml') {
      const items = (parseYaml(raw) as Array<Record<string, unknown>>) ?? [];
      for (const item of items) {
        if (typeof item.file === 'string' && item.file.length > 0) {
          const certFile = path.resolve('assets', item.file.replace(/^\/+/, ''));
          if (!existsSync(certFile)) {
            addDiagnostic(
              'error',
              p,
              1,
              'missing-asset',
              `Certificate file not found: ${item.file}`,
            );
          }
        }
      }
    }
  }

  // 3. Projects & Blog MDX collections
  const tagMap = new Map<string, Set<string>>();
  const missingTranslations: string[] = [];
  const machineTranslations: string[] = [];

  for (const col of ['projects', 'blog'] as const) {
    const enDir = path.resolve('content', col, 'en');
    const viDir = path.resolve('content', col, 'vi');
    const enFiles = await listMdxFiles(enDir);
    const viFiles = await listMdxFiles(viDir);
    const enSet = new Set(enFiles);
    const viSet = new Set(viFiles);

    for (const file of enFiles) {
      if (!/^[a-z0-9-]+\.mdx$/.test(file)) {
        addDiagnostic('error', path.join(enDir, file), 1, 'slug-format', 'Slug must be kebab-case ASCII.');
      }
      if (!viSet.has(file)) {
        missingTranslations.push(`content/${col}/vi/${file}`);
      }
    }

    for (const file of viFiles) {
      if (!enSet.has(file)) {
        addDiagnostic(
          'error',
          path.join(viDir, file),
          1,
          'i18n-orphan',
          `Vietnamese file has no English counterpart at content/${col}/en/${file}.`,
        );
      }
    }

    for (const [locale, dir, files] of [
      ['en', enDir, enFiles],
      ['vi', viDir, viFiles],
    ] as const) {
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const raw = await readFile(fullPath, 'utf8');
        checkNfcAndPrivacy(fullPath, raw, allowedEmail, allowedPhone);

        const { data } = parseFrontmatter(raw);
        if (col === 'projects') {
          if (typeof data.summary === 'string' && data.summary.length > 160) {
            addDiagnostic(
              'error',
              fullPath,
              1,
              'length-summary',
              `Project summary exceeds 160 chars (${data.summary.length}).`,
            );
          }
          if (typeof data.cover === 'string') {
            const coverPath = path.resolve(dir, data.cover);
            if (!existsSync(coverPath)) {
              addDiagnostic('error', fullPath, 1, 'missing-asset', `Cover image not found: ${data.cover}`);
            }
            if (typeof data.coverAlt !== 'string' || data.coverAlt.trim().length === 0) {
              addDiagnostic('error', fullPath, 1, 'missing-alt', 'coverAlt is required when cover is set.');
            }
          }
        } else {
          if (typeof data.description === 'string' && data.description.length > 160) {
            addDiagnostic(
              'error',
              fullPath,
              1,
              'length-description',
              `Blog description exceeds 160 chars (${data.description.length}).`,
            );
          }
        }

        if (locale === 'vi' && data.translation === 'machine') {
          machineTranslations.push(`content/${col}/vi/${file}`);
        }

        if (Array.isArray(data.tags)) {
          for (const tag of data.tags) {
            if (typeof tag === 'string') {
              const key = tag.toLowerCase();
              const variants = tagMap.get(key) ?? new Set<string>();
              variants.add(tag);
              tagMap.set(key, variants);
            }
          }
        }
      }
    }
  }

  for (const [, variants] of tagMap.entries()) {
    if (variants.size > 1) {
      addDiagnostic(
        'warning',
        'content',
        1,
        'tag-case',
        `Inconsistent tag casing found: ${[...variants].join(' vs ')}`,
      );
    }
  }

  if (reportTranslations) {
    console.log('=== Translation Report ===');
    console.log('Missing VI files:', missingTranslations.length ? missingTranslations : 'None');
    console.log('Machine-translated VI files:', machineTranslations.length ? machineTranslations : 'None');
  }

  for (const d of diagnostics) {
    const prefix = d.severity === 'error' ? 'ERROR' : 'WARN';
    console.log(`${d.file}:${d.line}: [${prefix}] ${d.ruleId}: ${d.message}`);
  }

  const errors = diagnostics.filter((d) => d.severity === 'error').length;
  const warnings = diagnostics.filter((d) => d.severity === 'warning').length;
  console.log(`\nValidation complete: ${errors} error(s), ${warnings} warning(s).`);

  if (errors > 0) {
    process.exit(1);
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});

