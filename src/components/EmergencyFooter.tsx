import type { Language } from '../types';
import { t } from '../i18n';

const CRISIS_LOCAL = '7056754760';
const CRISIS_TOLL_FREE = '18778411101';

type EmergencyFooterProps = {
  language: Language;
};

const CRISIS_LINKS = [
  { href: `tel:${CRISIS_LOCAL}`, labelKey: 'footerCrisis' as const, number: '705-675-4760' },
  { href: 'tel:988', labelKey: 'footerSuicide' as const, number: '988' },
  { href: 'tel:811', labelKey: 'footer811' as const, number: '811' },
  { href: 'tel:211', labelKey: 'footer211' as const, number: '211' },
  { href: 'tel:18006686868', labelKey: 'footerKids' as const, number: '1-800-668-6868' },
  { href: `tel:${CRISIS_TOLL_FREE}`, labelKey: 'footer247' as const, number: '1-877-841-1101' },
];

export function EmergencyFooter({ language }: EmergencyFooterProps) {
  const strings = t(language);

  return (
    <footer className="border-t-2 border-border bg-secondary px-5 py-4">
      <section aria-labelledby="emergency-heading">
        <h2
          id="emergency-heading"
          className="text-center text-base font-bold text-emergency"
        >
          {strings.footerEmergency}
        </h2>
        <ul
          className="mx-auto mt-3 grid max-w-3xl list-none grid-cols-2 gap-2 p-0 sm:grid-cols-3"
          aria-label={strings.footerCrisisGridLabel}
        >
          {CRISIS_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="a11y-card flex min-h-14 flex-col items-center justify-center rounded-xl px-2 py-2 text-center hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
              >
                <span className="text-xs font-semibold leading-snug text-muted-foreground">
                  {strings[link.labelKey]}
                </span>
                <span className="text-base font-bold text-primary">{link.number}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </footer>
  );
}
