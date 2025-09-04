import { useRef, useEffect } from 'react';

export type SafeFetchResult<T> = {
  data: T | null;
  error: Error | null;
  aborted: boolean;
  notModified: boolean;
};

export async function safeFetchJson<T>(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<SafeFetchResult<T>> {
  try {
    const res = await fetch(input, { headers: { Accept: "application/json", ...(init.headers || {}) }, ...init });
    if (res.status === 304) return { data: null, error: null, aborted: false, notModified: true };
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const ct = res.headers.get("content-type") || "";
    const data = ct.includes("application/json") ? ((await res.json()) as T) : (null as unknown as T);
    return { data, error: null, aborted: false, notModified: false };
  } catch (e: any) {
    if (e?.name === "AbortError") {
      // nunca relancar AbortError para nao poluir o console
      return { data: null, error: null, aborted: true, notModified: false };
    }
    return { data: null, error: e as Error, aborted: false, notModified: false };
  }
}

export const useIsMounted = () => {
  const isMountedRef = useRef(true);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  return isMountedRef;
};