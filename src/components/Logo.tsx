export const LOGO_ALT = 'Sudbury Connect';

/** Full wordmark — background matches page (`#F0F7FF`). */
export const LOGO_SPLASH_SRC = '/logo-principal-clair.svg';

/** Compact mark + text for the header bar. */
export const LOGO_HEADER_SRC = '/logo-compact-header.svg';

type LogoProps = {
  size?: 'header' | 'splash';
  className?: string;
};

const sizeClass: Record<NonNullable<LogoProps['size']>, string> = {
  header: 'h-11 w-auto max-w-[11rem] sm:h-12 sm:max-w-[12rem]',
  splash: 'h-auto w-full max-w-[20rem] sm:max-w-[24rem]',
};

export function Logo({ size = 'header', className = '' }: LogoProps) {
  const src = size === 'splash' ? LOGO_SPLASH_SRC : LOGO_HEADER_SRC;

  return (
    <img
      src={src}
      alt={LOGO_ALT}
      className={`object-contain ${sizeClass[size]} ${className}`.trim()}
      width={size === 'splash' ? 400 : 220}
      height={size === 'splash' ? 120 : 52}
      decoding="async"
    />
  );
}
