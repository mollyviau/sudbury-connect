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
    <header className="border-b-2 border-border bg-secondary">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-5 py-4">
        <div className="w-24 shrink-0">
          {showHome && (
            <button
              type="button"
              onClick={onHome}
              className="inline-flex min-h-10 items-center gap-1 rounded-xl border-2 border-border bg-card px-3 text-sm font-bold text-foreground shadow-sm hover:bg-background"
            >
              <span aria-hidden>⌂</span> {homeLabel}
            </button>
          )}
        </div>
        <div className="flex items-center justify-center gap-3 text-center">
          <div
            aria-hidden
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-2xl text-primary-foreground"
          >
            🤝
          </div>
          <div>
            <p className="font-display text-xl font-bold leading-none text-foreground sm:text-2xl">
              {strings.appTitle}
            </p>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">{strings.tagline}</p>
          </div>
        </div>
        <div className="w-24 shrink-0" aria-hidden />
      </div>
    </header>
  );
}
