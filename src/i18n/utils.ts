import { getRelativeLocaleUrl } from 'astro:i18n';
import { defaultLang, ui, type Lang, type UiKey } from './ui';

/**
 * Extracts the active locale from the current request URL.
 */
export function getLangFromUrl(url: URL): Lang {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const pathname = url.pathname.startsWith(base)
    ? url.pathname.slice(base.length)
    : url.pathname;
  const [, firstSegment] = pathname.split('/');
  if (firstSegment === 'vi') {
    return 'vi';
  }
  return defaultLang;
}

/**
 * Returns a typed translation lookup function for the given locale.
 */
export function useTranslations(lang: Lang): (key: UiKey) => string {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Generates a locale-aware path that always includes Astro's configured base path.
 */
export function localizedPath(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return getRelativeLocaleUrl(lang, clean);
}

/**
 * Computes the equivalent URL in the target locale for the language switcher and hreflang links.
 */
export function getAlternatePath(url: URL, target: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  let stripped = url.pathname.startsWith(base)
    ? url.pathname.slice(base.length)
    : url.pathname;

  stripped = stripped.replace(/^\/+/, '');
  if (stripped === 'vi' || stripped.startsWith('vi/')) {
    stripped = stripped.replace(/^vi\/?/, '');
  }

  return localizedPath(target, stripped);
}

