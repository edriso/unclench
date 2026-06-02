import { create } from 'zustand';
import { repository } from '@/lib/repository';
import type { Accent } from '@/types/domain';

interface UnclenchState {
  settings: { everyMin: number; sound: boolean; accent: Accent };
  released: number;
  release: () => void;
  setEveryMin: (n: number) => void;
  setSound: (on: boolean) => void;
  setAccent: (accent: Accent) => void;
}

const initial = repository.getState();

export const useUnclenchStore = create<UnclenchState>((set, get) => ({
  settings: initial.settings,
  released: initial.released,
  release: () => set({ released: repository.setReleased(get().released + 1).released }),
  setEveryMin: (everyMin) => set({ settings: repository.setSettings({ everyMin }).settings }),
  setSound: (sound) => set({ settings: repository.setSettings({ sound }).settings }),
  setAccent: (accent) => set({ settings: repository.setSettings({ accent }).settings }),
}));
