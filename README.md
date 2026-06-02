# Unclench

A **frontend-only** app of periodic, gentle check-ins to release the tension you
hold without noticing — shoulders crept toward your ears, a clenched jaw, a held
breath. Pick an interval, start, and every so often it taps you on the shoulder
with a soft cue (and an optional chime) to let go. No backend, works offline.

## The flow

Pick an interval → "start check-ins" → every interval a random body-release cue
appears (drop your shoulders, unclench your jaw, soften your forehead, one slow
breath, relax your hands, loosen your belly). Tap **Released** and it returns to
waiting, counting your releases.

## Tech

React 19 + TypeScript (strict), Vite, Tailwind v4, Zustand, Zod-validated
localStorage, PWA. Tested with Vitest + Testing Library and Playwright.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm test:e2e
```

## Notes

- The cue picker is pure and deterministic (`lib/cues.ts`); the chime is WebAudio
  fully wrapped in try/catch (`lib/chime.ts`) so a blocked context never throws.
- Entrances animate transform only and keep `opacity: 1`; reduced motion settles
  the orb.

## License

MIT.
