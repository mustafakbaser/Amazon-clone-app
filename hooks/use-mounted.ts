import { useEffect, useState } from 'react';

/**
 * False during the hydration render, true afterwards.
 *
 * While React hydrates a statically exported page, persisted zustand stores
 * report their initial state (no user, empty cart, no orders). Redirect guards
 * must wait for this flag, otherwise a reload always bounces the visitor away.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
