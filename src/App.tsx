import { useEffect, useState } from 'react';
import { SettingsOverlay } from '@/components/settings-overlay';
import { useApplyAccent } from '@/hooks/use-apply-accent';
import { useInterval } from '@/hooks/use-interval';
import { playChime } from '@/lib/chime';
import { pickCue, type Cue } from '@/lib/cues';
import { useUnclenchStore } from '@/store/unclench-store';

export function App() {
  useApplyAccent();
  const { everyMin, sound } = useUnclenchStore((state) => state.settings);
  const setEveryMin = useUnclenchStore((state) => state.setEveryMin);
  const released = useUnclenchStore((state) => state.released);
  const recordRelease = useUnclenchStore((state) => state.release);

  const [running, setRunning] = useState(false);
  const [cue, setCue] = useState<Cue | null>(null);
  const [next, setNext] = useState(everyMin * 60);
  const [seed, setSeed] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);

  function start() {
    setNext(everyMin * 60);
    setRunning(true);
  }
  function stop() {
    setRunning(false);
  }

  // Countdown to the next nudge: the updater stays pure (just decrement); when it
  // reaches zero, an effect shows a cue and chimes (keeping setState out of the
  // updater). The interval pauses while a cue is showing.
  useInterval(() => setNext((s) => Math.max(0, s - 1)), running && cue === null ? 1000 : null);

  useEffect(() => {
    if (running && cue === null && next <= 0) {
      const nextSeed = seed + 1;
      setSeed(nextSeed);
      setNext(everyMin * 60);
      setCue(pickCue(nextSeed));
      playChime(sound);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, cue, next]);

  function release() {
    recordRelease();
    setCue(null);
  }

  const mm = Math.floor(next / 60);
  const ss = next % 60;

  return (
    <div className="app">
      {!running && !cue && (
        <button
          className="corner"
          type="button"
          onClick={() => setSettingsOpen(true)}
          aria-label="Settings"
        >
          ⚙
        </button>
      )}
      <div className="stage">
        <div className="word">Unclench</div>

        {!running && !cue && (
          <div className="rise">
            <div className="orb" aria-hidden="true" />
            <h1 className="h1">
              You&rsquo;re holding tension
              <br />
              you can&rsquo;t feel.
            </h1>
            <p className="sub">
              Most of us clench our jaw and hunch our shoulders all day without noticing. I&rsquo;ll
              tap you on the shoulder every so often to let go.
            </p>
            <div className="chips" role="group" aria-label="Nudge interval">
              {[10, 20, 30, 45].map((m) => (
                <button
                  key={m}
                  type="button"
                  className={'chip' + (everyMin === m ? ' on' : '')}
                  aria-pressed={everyMin === m}
                  onClick={() => setEveryMin(m)}
                >
                  every {m}m
                </button>
              ))}
            </div>
            <button className="cta" type="button" onClick={start}>
              Start check-ins
            </button>
            {released > 0 && <div className="stat">{released} releases so far</div>}
          </div>
        )}

        {running && !cue && (
          <div className="rise">
            <div
              className="orb go"
              style={{ '--bd': everyMin > 20 ? '7s' : '6s' } as React.CSSProperties}
              aria-hidden="true"
            />
            <h1 className="h1" style={{ fontSize: 'clamp(26px,7vw,34px)' }}>
              Carry on.
            </h1>
            <p className="sub" aria-live="polite">
              I&rsquo;ll gently nudge you in {mm > 0 ? `${mm}m ` : ''}
              {String(ss).padStart(2, '0')}s. Keep me open in a tab.
            </p>
            <button className="cta ghost" type="button" onClick={stop}>
              Stop
            </button>
            {released > 0 && <div className="stat">{released} releases so far</div>}
          </div>
        )}

        {cue && (
          <div className="rise" key={cue.title}>
            <div className="orb" aria-hidden="true" />
            <h1 className="h1">{cue.title}</h1>
            <p className="sub">{cue.sub}</p>
            <button className="cta" type="button" onClick={release}>
              Released
            </button>
          </div>
        )}
      </div>

      {settingsOpen && <SettingsOverlay onClose={() => setSettingsOpen(false)} />}
    </div>
  );
}
