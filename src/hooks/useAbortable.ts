import { useEffect } from 'react';

export function useAbortableEffect(
  effect: (signal: AbortSignal) => void | Promise<void>,
  deps: React.DependencyList
) {
  useEffect(() => {
    const ac = new AbortController();
    let alive = true;
    const run = async () => {
      try {
        await effect(ac.signal);
      } catch (e: any) {
        if (e?.name === "AbortError") return; // ignore AbortError
        console.error("Error in useAbortableEffect:", e);
      }
    };
    run();
    return () => {
      alive = false;
      ac.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
