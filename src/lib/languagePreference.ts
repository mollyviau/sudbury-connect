import type { Language } from '../types';

export const LANGUAGE_STORAGE_KEY = 'sudbury-connect:language';
export const LANGUAGE_CHANGE_EVENT = 'sudbury-connect:language-change';

export function languageToHtmlLang(language: Language): 'en' | 'fr' {
  return language === 'French' ? 'fr' : 'en';
}

export function syncDocumentLanguage(language: Language): void {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = languageToHtmlLang(language);
}

export function readStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'English';
  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return saved === 'French' ? 'French' : 'English';
}

export function persistLanguage(language: Language): void {
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  syncDocumentLanguage(language);
  window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGE_EVENT, { detail: language }));
}
