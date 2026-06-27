import type { Language } from '../types';
import { t } from '../i18n';

const CRISIS_LOCAL = '7056754760';
const CRISIS_TOLL_FREE = '18778411101';

type EmergencyFooterProps = {
  language: Language;
};

export function EmergencyFooter({ language }: EmergencyFooterProps) {
  const strings = t(language);

  return (
    <footer
      className="border-t-2 border-border bg-secondary px-5 py-4"
      aria-label={strings.footerTitle}
    >
      <p className="text-center text-base font-bold text-destructive">{strings.footerEmergency}</p>
      <div className="mx-auto mt-3 grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-3">
        <a
          href={`tel:${CRISIS_LOCAL}`}
          className="a11y-card flex min-h-14 flex-col items-center justify-center rounded-xl px-2 py-2 text-center hover:border-primary"
        >
          <span className="text-xs font-semibold leading-snug text-muted-foreground">
            {strings.footerCrisis}
          </span>
          <span className="text-base font-bold text-primary">705-675-4760</span>
        </a>
        <a
          href="tel:988"
          className="a11y-card flex min-h-14 flex-col items-center justify-center rounded-xl px-2 py-2 text-center hover:border-primary"
        >
          <span className="text-xs font-semibold leading-snug text-muted-foreground">
            {strings.footerSuicide}
          </span>
          <span className="text-base font-bold text-primary">988</span>
        </a>
        <a
          href="tel:811"
          className="a11y-card flex min-h-14 flex-col items-center justify-center rounded-xl px-2 py-2 text-center hover:border-primary"
        >
          <span className="text-xs font-semibold leading-snug text-muted-foreground">
            {strings.footer811}
          </span>
          <span className="text-base font-bold text-primary">811</span>
        </a>
        <a
          href="tel:211"
          className="a11y-card flex min-h-14 flex-col items-center justify-center rounded-xl px-2 py-2 text-center hover:border-primary"
        >
          <span className="text-xs font-semibold leading-snug text-muted-foreground">
            {strings.footer211}
          </span>
          <span className="text-base font-bold text-primary">211</span>
        </a>
        <a
          href="tel:18006686868"
          className="a11y-card flex min-h-14 flex-col items-center justify-center rounded-xl px-2 py-2 text-center hover:border-primary"
        >
          <span className="text-xs font-semibold leading-snug text-muted-foreground">
            {strings.footerKids}
          </span>
          <span className="text-base font-bold text-primary">1-800-668-6868</span>
        </a>
        <a
          href={`tel:${CRISIS_TOLL_FREE}`}
          className="a11y-card flex min-h-14 flex-col items-center justify-center rounded-xl px-2 py-2 text-center hover:border-primary"
        >
          <span className="text-xs font-semibold leading-snug text-muted-foreground">
            {strings.footer247}
          </span>
          <span className="text-base font-bold text-primary">1-877-841-1101</span>
        </a>
      </div>
    </footer>
  );
}
