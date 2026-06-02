import { describe, expect, it, vi } from 'vitest';
import { playChime } from './chime';

describe('playChime', () => {
  it('does nothing when disabled', () => {
    expect(() => playChime(false)).not.toThrow();
  });
  it('never throws even if the AudioContext blows up', () => {
    (window as unknown as { AudioContext: unknown }).AudioContext = class {
      constructor() {
        throw new Error('blocked');
      }
    };
    expect(() => playChime(true)).not.toThrow();
    vi.restoreAllMocks();
  });
});
