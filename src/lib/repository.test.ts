import { beforeEach, describe, expect, it } from 'vitest';
import { createLocalStorageRepository, type Repository } from './repository';

function memoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (k: string) => map.get(k) ?? null,
    key: (i: number) => Array.from(map.keys())[i] ?? null,
    removeItem: (k: string) => {
      map.delete(k);
    },
    setItem: (k: string, v: string) => {
      map.set(k, v);
    },
  } as Storage;
}

describe('repository', () => {
  let repo: Repository;
  let storage: Storage;
  beforeEach(() => {
    storage = memoryStorage();
    repo = createLocalStorageRepository(storage);
  });
  it('returns defaults / tolerates corrupt data', () => {
    expect(repo.getState().settings.everyMin).toBe(20);
    storage.setItem('unclench-v1', 'nope');
    expect(repo.getState().released).toBe(0);
  });
  it('round-trips released and settings', () => {
    repo.setReleased(5);
    repo.setSettings({ everyMin: 30, sound: false });
    expect(repo.getState().released).toBe(5);
    expect(repo.getState().settings.everyMin).toBe(30);
    expect(repo.getState().settings.sound).toBe(false);
  });
});
