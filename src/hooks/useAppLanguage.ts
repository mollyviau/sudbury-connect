import { useEffect, useState } from 'react';
import { LANGUAGE_CHANGE_EVENT, readStoredLanguage } from '../lib/languagePreference';
import type { Language } from '../types';

/** Shared UI language from localStorage, kept in sync across tabs and pages. */
export function useAppLanguage(): Language {
  const [language, setLanguage] = useState<Language>(() => readStoredLanguage());

  useEffect(() => {
    function syncFromStorage() {
      setLanguage(readStoredLanguage());
    }

    function onLanguageChange(event: Event) {
      const detail = (event as CustomEvent<Language>).detail;
      setLanguage(detail ?? readStoredLanguage());
    }

    window.addEventListener(LANGUAGE_CHANGE_EVENT, onLanguageChange);
    window.addEventListener('storage', syncFromStorage);
    return () => {
      window.removeEventListener(LANGUAGE_CHANGE_EVENT, onLanguageChange);
      window.removeEventListener('storage', syncFromStorage);
    };
  }, []);

  return language;
}
