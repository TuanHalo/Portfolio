import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@/i18n/ui';

export interface LocalizedItem<T extends 'projects' | 'blog'> {
  readonly slug: string;
  readonly entry: CollectionEntry<T>;
  readonly isFallback: boolean;
}

/**
 * Extracts the locale prefix and bare slug from a collection entry id (e.g. "en/project-alpha").
 */
export function parseLocaleId(id: string): { readonly lang: Lang; readonly slug: string } {
  const clean = id.replace(/\.mdx?$/, '');
  const [prefix, ...rest] = clean.split('/');
  if (prefix === 'vi' || prefix === 'en') {
    return { lang: prefix, slug: rest.join('/') };
  }
  return { lang: 'en', slug: clean };
}

/**
 * Returns the single profile entry from content/profile.yaml.
 */
export async function getProfile(): Promise<CollectionEntry<'profile'>['data']> {
  const entries = await getCollection('profile');
  const first = entries[0];
  if (!first) {
    throw new Error('content/profile.yaml must contain at least one profile entry.');
  }
  return first.data;
}

/**
 * Returns work experience entries sorted newest-first.
 */
export async function getExperience(): Promise<readonly CollectionEntry<'experience'>[]> {
  const entries = await getCollection('experience');
  return [...entries].sort((a, b) => b.data.start.getTime() - a.data.start.getTime());
}

/**
 * Returns education entries sorted newest-first.
 */
export async function getEducation(): Promise<readonly CollectionEntry<'education'>[]> {
  const entries = await getCollection('education');
  return [...entries].sort((a, b) => b.data.start.getTime() - a.data.start.getTime());
}

/**
 * Returns certificate entries sorted newest-first.
 */
export async function getCertificates(): Promise<readonly CollectionEntry<'certificates'>[]> {
  const entries = await getCollection('certificates');
  return [...entries].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Returns grouped skill entries in YAML order.
 */
export async function getSkills(): Promise<readonly CollectionEntry<'skills'>[]> {
  return getCollection('skills');
}

/**
 * Resolves localized project entries for the given language, falling back to EN when missing.
 */
export async function getLocalizedProjects(
  lang: Lang,
): Promise<readonly LocalizedItem<'projects'>[]> {
  const all = await getCollection('projects');
  const bySlug = new Map<string, { en?: CollectionEntry<'projects'>; vi?: CollectionEntry<'projects'> }>();

  for (const entry of all) {
    const { lang: entryLang, slug } = parseLocaleId(entry.id);
    const bucket = bySlug.get(slug) ?? {};
    bucket[entryLang] = entry;
    bySlug.set(slug, bucket);
  }

  const resolved: LocalizedItem<'projects'>[] = [];
  for (const [slug, bucket] of bySlug.entries()) {
    const preferred = bucket[lang];
    const fallback = bucket.en;
    const chosen = preferred ?? fallback;
    if (chosen) {
      resolved.push({
        slug,
        entry: chosen,
        isFallback: !preferred && lang !== 'en',
      });
    }
  }

  return resolved.sort((a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime());
}

/**
 * Resolves published blog posts for the given language, falling back to EN when missing.
 */
export async function getLocalizedBlogPosts(lang: Lang): Promise<readonly LocalizedItem<'blog'>[]> {
  const all = await getCollection('blog', ({ data }) => !data.draft);
  const bySlug = new Map<string, { en?: CollectionEntry<'blog'>; vi?: CollectionEntry<'blog'> }>();

  for (const entry of all) {
    const { lang: entryLang, slug } = parseLocaleId(entry.id);
    const bucket = bySlug.get(slug) ?? {};
    bucket[entryLang] = entry;
    bySlug.set(slug, bucket);
  }

  const resolved: LocalizedItem<'blog'>[] = [];
  for (const [slug, bucket] of bySlug.entries()) {
    const preferred = bucket[lang];
    const fallback = bucket.en;
    const chosen = preferred ?? fallback;
    if (chosen) {
      resolved.push({
        slug,
        entry: chosen,
        isFallback: !preferred && lang !== 'en',
      });
    }
  }

  return resolved.sort((a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime());
}

/**
 * Collects unique tags from a list of localized blog posts.
 */
export function getAllBlogTags(posts: readonly LocalizedItem<'blog'>[]): readonly string[] {
  const set = new Set<string>();
  for (const post of posts) {
    for (const tag of post.entry.data.tags) {
      set.add(tag);
    }
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

