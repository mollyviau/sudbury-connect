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
    <footer className="emergency-footer" aria-label={strings.footerTitle}>
      <p className="emergency-footer-lead">{strings.footerEmergency}</p>
      <div className="emergency-footer-grid">
        <a href={`tel:${CRISIS_LOCAL}`} className="emergency-link">
          <span className="emergency-label">{strings.footerCrisis}</span>
          <span className="emergency-number">705-675-4760</span>
        </a>
        <a href="tel:988" className="emergency-link">
          <span className="emergency-label">{strings.footerSuicide}</span>
          <span className="emergency-number">988</span>
        </a>
        <a href="tel:811" className="emergency-link">
          <span className="emergency-label">{strings.footer811}</span>
          <span className="emergency-number">811</span>
        </a>
        <a href="tel:211" className="emergency-link">
          <span className="emergency-label">{strings.footer211}</span>
          <span className="emergency-number">211</span>
        </a>
        <a href="tel:18006686868" className="emergency-link">
          <span className="emergency-label">{strings.footerKids}</span>
          <span className="emergency-number">1-800-668-6868</span>
        </a>
        <a href={`tel:${CRISIS_TOLL_FREE}`} className="emergency-link">
          <span className="emergency-label">{strings.footer247}</span>
          <span className="emergency-number">1-877-841-1101</span>
        </a>
      </div>
    </footer>
  );
}
