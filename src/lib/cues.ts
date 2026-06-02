/** Body-release cues, ported from the prototype. */
export interface Cue {
  title: string;
  sub: string;
}
export const CUES: Cue[] = [
  { title: 'Drop your shoulders.', sub: "They've crept up toward your ears. Let them fall." },
  { title: 'Unclench your jaw.', sub: 'Let your teeth part slightly. Soften your tongue.' },
  { title: 'Soften your forehead.', sub: 'Release the little furrow between your brows.' },
  { title: 'Take one slow breath.', sub: 'In through the nose, longer breath out.' },
  { title: 'Relax your hands.', sub: 'Unfurl your fingers. Let the grip go.' },
  { title: 'Loosen your belly.', sub: 'Stop holding it in. Let it move with your breath.' },
];

/** Pick a cue deterministically from a seed (so renders/tests are stable). */
export function pickCue(seed: number): Cue {
  return CUES[Math.abs(seed) % CUES.length];
}
