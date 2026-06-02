/** A soft two-note WebAudio chime, fully guarded so a blocked context never throws. */
export function playChime(enabled: boolean): void {
  if (!enabled) {
    return;
  }
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) {
      return;
    }
    const ctx = new Ctx();
    const now = ctx.currentTime;
    [528, 792].forEach((frequency, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = frequency;
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0, now + i * 0.14);
      gain.gain.linearRampToValueAtTime(0.12, now + i * 0.14 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.14 + 1);
      osc.start(now + i * 0.14);
      osc.stop(now + i * 0.14 + 1.1);
    });
    setTimeout(() => ctx.close?.(), 1600);
  } catch {
    // Audio can be unavailable or blocked; the cue still shows silently.
  }
}
