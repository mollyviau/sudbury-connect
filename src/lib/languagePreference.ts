import type { Language } from '../types';

export const LANGUAGE_STORAGE_KEY = 'sudbury-connect:language';

export function readStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'English';
  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return saved === 'French' ? 'French' : 'English';
}

export function persistLanguage(language: Language): void {
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}
