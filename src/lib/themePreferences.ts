import type { ThemeMode } from "../styles/theme";

export const THEME_STORAGE_KEY = "fireline-theme-preference-v1";

export type ThemeStorage = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
};

export function parseThemePreference(value: string | null): ThemeMode | null {
  return value === "light" || value === "dark" ? value : null;
}

export function resolveThemeMode(
  preference: ThemeMode | null,
  system: "light" | "dark" | "unspecified" | null | undefined,
): ThemeMode {
  if (preference) return preference;
  return system === "dark" ? "dark" : "light";
}

export async function readThemePreference(
  storage: ThemeStorage,
  key = THEME_STORAGE_KEY,
): Promise<{ preference: ThemeMode | null; error: string | null }> {
  try {
    const value = await storage.getItem(key);
    return { preference: parseThemePreference(value), error: null };
  } catch {
    return {
      preference: null,
      error:
        "Theme preference could not be loaded. Using your device appearance.",
    };
  }
}

export async function writeThemePreference(
  storage: ThemeStorage,
  mode: ThemeMode,
  key = THEME_STORAGE_KEY,
): Promise<{ ok: boolean; error: string | null }> {
  try {
    await storage.setItem(key, mode);
    return { ok: true, error: null };
  } catch {
    return {
      ok: false,
      error:
        "Theme preference could not be saved. Your choice applies this session only.",
    };
  }
}
