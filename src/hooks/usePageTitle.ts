import { useEffect } from 'react';

const DEFAULT_TITLE = 'Sudbury Connect';

export function usePageTitle(title: string): void {
  useEffect(() => {
    const previous = document.title;
    document.title = title.includes(DEFAULT_TITLE) ? title : `${title} — ${DEFAULT_TITLE}`;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
