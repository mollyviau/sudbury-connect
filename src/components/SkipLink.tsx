import { SKIP_TO_MAIN_BILINGUAL } from '../i18n';

export function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      {SKIP_TO_MAIN_BILINGUAL}
    </a>
  );
}
