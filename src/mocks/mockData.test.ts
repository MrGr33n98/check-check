import { describe, it, expect, vi } from 'vitest';

describe('mockData exports', () => {
  it('provides mock data when enabled', async () => {
    vi.stubEnv('VITE_USE_MOCKS', 'true');
    vi.resetModules();
    const data = await import('./mockData');
    expect(data.mockUsers.length).toBeGreaterThan(0);
  });

  it('exports empty arrays when disabled', async () => {
    vi.stubEnv('VITE_USE_MOCKS', 'false');
    vi.resetModules();
    const data = await import('./mockData');
    expect(data.mockUsers.length).toBe(0);
  });
});
