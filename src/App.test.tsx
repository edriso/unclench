import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';
import { createDefaultState } from './lib/repository';
import { useUnclenchStore } from './store/unclench-store';

function reset() {
  localStorage.clear();
  const d = createDefaultState();
  useUnclenchStore.setState({ settings: { ...d.settings, sound: false }, released: 0 });
}
beforeEach(() => {
  reset();
  vi.useFakeTimers();
});
afterEach(() => vi.useRealTimers());

describe('Unclench', () => {
  it('shows the intro and is visible (no opacity-freeze)', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /holding tension/ })).toBeVisible();
  });

  it('fires a cue after the interval and a release increments the count', () => {
    useUnclenchStore.setState((s) => ({ settings: { ...s.settings, everyMin: 5 } }));
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Start check-ins' }));
    expect(screen.getByRole('heading', { name: 'Carry on.' })).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(5 * 60 * 1000);
    });
    // A body-release cue is showing with a "Released" action.
    const release = screen.getByRole('button', { name: 'Released' });
    fireEvent.click(release);
    expect(useUnclenchStore.getState().released).toBe(1);
    expect(screen.getByRole('heading', { name: 'Carry on.' })).toBeInTheDocument(); // back to waiting
  });
});
