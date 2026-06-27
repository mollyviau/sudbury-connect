import type { Language } from '../types';
import { t } from '../i18n';

type AppHeaderProps = {
  language: Language;
  showHome: boolean;
  onHome: () => void;
  /** Language picker — home button always says "Home". */
  isLanguageScreen?: boolean;
};

export function AppHeader({ language, showHome, onHome, isLanguageScreen }: AppHeaderProps) {
  const strings = t(language);
  const homeLabel = isLanguageScreen ? 'Home' : strings.home;

  return (
    <header className="app-header">
      <div className="app-header-side">
        {showHome && (
          <button type="button" className="home-btn" onClick={onHome}>
            <span className="home-btn-icon" aria-hidden="true">
              ⌂
            </span>
            {homeLabel}
          </button>
        )}
      </div>
      <h1 className="app-title">{strings.appTitle}</h1>
      <div className="app-header-side" aria-hidden="true" />
    </header>
  );
}
