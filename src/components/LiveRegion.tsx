type LiveRegionProps = {
  message: string;
  politeness?: 'polite' | 'assertive';
  atomic?: boolean;
  hidden?: boolean;
};

export function LiveRegion({
  message,
  politeness = 'polite',
  atomic = true,
  hidden = true,
}: LiveRegionProps) {
  return (
    <p
      className={hidden ? 'sr-only' : undefined}
      aria-live={politeness}
      aria-atomic={atomic}
    >
      {message}
    </p>
  );
}
