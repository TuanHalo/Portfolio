# AGENTS.md — AI Contract for Portfolio Repository

This repository is **Minh Tuấn's personal portfolio and knowledge base** (`https://tuanhalo.github.io/Portfolio/`), built with Astro, TypeScript, and Tailwind CSS. All site content lives in plain YAML and MDX files under `content/`, and raw supporting files (certificate scans, photos, documents) live under `assets/`.

## 1. Repository Map

| Path | Purpose |
|---|---|
| `content/profile.yaml` | Bio, title, tagline, location, availability, email, avatar, socials |
| `content/experience.yaml` | Work history timeline |
| `content/education.yaml` | Education history |
| `content/certificates.yaml` | Verified certificates & links to files in `assets/certificates/` |
| `content/skills.yaml` | Grouped technical skills |
| `content/projects/{en,vi}/*.mdx` | Project case studies + `content/projects/_images/` |
| `content/blog/{en,vi}/*.mdx` | Blog posts |
| `content/_templates/` | Copy-me templates for new entries |
| `assets/` | Public static files (`certificates/`, `documents/`, `photos/`) |
| `src/` | Astro layouts, views, components, i18n, and `src/content.config.ts` |
| `scripts/` | Build/validation scripts (`validate-content.ts`, `export-schemas.ts`, `generate-resume-pdf.ts`) |
| `docs/ai/` | Content contract, writing style guide, generated JSON Schemas |
| `.agents/skills/` | Task-specific playbooks for AI assistants |

## 2. Allowed Zones

- **✅ Free to edit:** `content/**`, `assets/**`
- **⚠️ Edit only when explicitly asked by the owner:** `src/**`, `scripts/**`, `astro.config.mjs`, `package.json`
- **⛔ Never edit without explicit approval:** `.github/workflows/**`, `AGENTS.md`, `docs/ai/**`, `pnpm-lock.yaml`

## 3. Hard Rules (MUST / MUST NOT)

1. **MUST NOT invent facts** about the owner (employers, dates, degrees, metrics, certificates, URLs). If information is missing, insert a `TODO(owner): <what is needed>` comment and list every `TODO(owner)` item in your final summary.
2. **MUST NOT commit private data:** phone numbers, home street addresses, national ID / passport numbers, salaries, or private emails other than `profile.email`.
3. **MUST keep EN and VI in sync:** when creating or updating an EN entry, create or update its VI counterpart (or set `translation: machine` in VI frontmatter if auto-translated).
4. **MUST use identical kebab-case ASCII slugs** across locales (e.g., `en/project-alpha.mdx` ↔ `vi/project-alpha.mdx`).
5. **MUST place images cleanly:** project covers go in `content/projects/_images/`, raw files go in `assets/<type>/` with descriptive kebab-case filenames, and every image MUST have `alt` / `coverAlt` text.
6. **MUST NOT modify schemas** (`src/content.config.ts`) just to make invalid content pass. Propose schema changes to the owner instead.
7. **MUST follow the style guide** in [`docs/ai/style-guide.md`](docs/ai/style-guide.md) and field rules in [`docs/ai/content-contract.md`](docs/ai/content-contract.md).

## 4. Definition of Done

Before reporting completion:
1. Run `pnpm validate` and confirm **0 errors**.
2. Summarize the exact files changed and list any `TODO(owner)` items that need human input.
3. If asked to commit, use Conventional Commits (e.g., `content(projects): add demo-cli`).

## 5. Skill Index

Read the relevant playbook before executing a content task:
- [`add-project`](.agents/skills/add-project/SKILL.md)
- [`add-blog-post`](.agents/skills/add-blog-post/SKILL.md)
- [`update-experience`](.agents/skills/update-experience/SKILL.md)
- [`add-certificate`](.agents/skills/add-certificate/SKILL.md)
- [`update-profile`](.agents/skills/update-profile/SKILL.md)
- [`translate-content`](.agents/skills/translate-content/SKILL.md)
- [`import-from-cv`](.agents/skills/import-from-cv/SKILL.md)

