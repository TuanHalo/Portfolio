import type { Lang } from '@/i18n/ui';

/**
 * Formats a Date into a localized Month Year string.
 */
export function formatMonthYear(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'vi' ? 'vi-VN' : 'en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/**
 * Formats a Date into a full localized date string.
 */
export function formatFullDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'vi' ? 'vi-VN' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/**
 * Computes whole years elapsed from a career start date to today.
 */
export function computeYearsExperience(careerStart: Date): number {
  const now = new Date();
  const diffMs = now.getTime() - careerStart.getTime();
  const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
  return Math.max(1, years);
}

