import { z } from 'zod';

export const ACCENTS = ['#7fa0a8', '#8a9ac0', '#9aa87f', '#b08a9a'] as const;
export const accentSchema = z.enum(ACCENTS);
export type Accent = z.infer<typeof accentSchema>;

export const settingsSchema = z.object({
  everyMin: z.number().int().min(5).max(60),
  sound: z.boolean(),
  accent: accentSchema,
});
export type Settings = z.infer<typeof settingsSchema>;

export const persistedStateSchema = z.object({
  version: z.literal(1),
  settings: settingsSchema,
  released: z.number().int().nonnegative(),
});
export type PersistedState = z.infer<typeof persistedStateSchema>;
