import { useEffect } from 'react';
import { useUnclenchStore } from '@/store/unclench-store';

export function useApplyAccent(): void {
  const accent = useUnclenchStore((state) => state.settings.accent);
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
  }, [accent]);
}
