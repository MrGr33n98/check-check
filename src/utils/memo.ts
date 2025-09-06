const cache = new Map<string, { ts: number; value: any }>();

export function getCache<T>(key: string, ttlMs: number = 60000): T | undefined {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.ts < ttlMs) {
    return entry.value as T;
  }
  cache.delete(key); // Expired or not found
  return undefined;
}

export function setCache<T>(key: string, value: T): void {
  cache.set(key, { ts: Date.now(), value });
}
