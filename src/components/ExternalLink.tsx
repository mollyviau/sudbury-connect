import type { ReactNode } from 'react';
import { t } from '../i18n';
import { useAppLanguage } from '../hooks/useAppLanguage';

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  const language = useAppLanguage();
  const opensLabel = t(language).opensInNewTab;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
    >
      {children}
      <span className="sr-only"> ({opensLabel})</span>
    </a>
  );
}
