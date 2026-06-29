import { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { trapFocus } from '../lib/focusTrap';
import { useAppLanguage } from '../hooks/useAppLanguage';
import { t } from '../i18n';

const NAV_LINK_CLASS = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring ${
    isActive ? 'text-primary underline underline-offset-4' : 'text-foreground hover:text-primary'
  }`;

const NAV_BUTTON_CLASS = ({ isActive }: { isActive: boolean }) =>
  `inline-flex min-h-11 items-center justify-center rounded-lg border-2 px-4 py-2 text-base font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring ${
    isActive
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-primary bg-card text-primary hover:bg-secondary'
  }`;

export function Navbar() {
  const language = useAppLanguage();
  const strings = t(language);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const firstLink = menuPanelRef.current?.querySelector<HTMLElement>('a');
    firstLink?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (menuPanelRef.current) {
        trapFocus(menuPanelRef.current, event);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#d6e8fa] bg-background shadow-[0_1px_3px_rgba(24,95,165,0.08)]">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6"
        aria-label={strings.navMainLabel}
      >
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring sm:gap-3"
          aria-label={strings.navHomeLabel}
        >
          <img
            src="/logo-navbar.png"
            alt=""
            aria-hidden="true"
            className="h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11"
            width={44}
            height={44}
            decoding="async"
          />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate font-display text-lg font-bold text-[#0c447c] sm:text-xl">
              Sudbury
            </span>
            <span className="truncate text-base font-semibold text-[#185fa5] sm:text-lg">
              Connect
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 sm:flex">
          <NavLink to="/resources" className={NAV_LINK_CLASS}>
            {strings.navResources}
          </NavLink>
          <NavLink to="/about" className={NAV_BUTTON_CLASS}>
            {strings.navAbout}
          </NavLink>
        </div>

        <div className="flex items-center sm:hidden">
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border-2 border-border bg-card text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-haspopup="dialog"
            aria-label={menuOpen ? strings.closeMenu : strings.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <>
                  <path d="M6 6l12 12M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          ref={menuPanelRef}
          id={menuId}
          className="border-t border-[#d6e8fa] bg-background px-4 py-3 sm:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={strings.mobileMenuLabel}
        >
          <ul className="flex flex-col gap-2">
            <li>
              <NavLink
                to="/resources"
                className="block min-h-11 rounded-lg px-3 py-2 text-lg font-semibold text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
                onClick={() => setMenuOpen(false)}
              >
                {strings.navResources}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="block min-h-11 rounded-lg px-3 py-2 text-lg font-semibold text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
                onClick={() => setMenuOpen(false)}
              >
                {strings.navAbout}
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
