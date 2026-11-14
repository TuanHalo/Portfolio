/**
 * Prepends Astro's configured base path to a root-relative asset or route path.
 */
export function withBase(path: string): string {
  if (/^https?:\/\//i.test(path) || path.startsWith('mailto:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const clean = path.replace(/^\/+/, '');
  return clean ? `${base}/${clean}` : `${base}/`;
}

