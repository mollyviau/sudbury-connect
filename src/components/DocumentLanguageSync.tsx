import { useEffect } from 'react';
import { readStoredLanguage, syncDocumentLanguage } from '../lib/languagePreference';

/** Sets `<html lang>` on load so document language matches stored preference. */
export function DocumentLanguageSync() {
  useEffect(() => {
    syncDocumentLanguage(readStoredLanguage());
  }, []);

  return null;
}
