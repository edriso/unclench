import { describe, expect, it } from 'vitest';
import { CUES, pickCue } from './cues';

describe('pickCue', () => {
  it('is deterministic and wraps within the cue list', () => {
    expect(pickCue(0)).toBe(CUES[0]);
    expect(pickCue(1)).toBe(CUES[1]);
    expect(pickCue(CUES.length)).toBe(CUES[0]);
    expect(pickCue(-1)).toBe(CUES[1 % CUES.length]);
  });
});
