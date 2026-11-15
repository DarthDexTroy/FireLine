import test from "node:test";
import assert from "node:assert/strict";
import { getTheme, type ThemeMode } from "../src/styles/themeTokens";
import { isCompactHomeHeader } from "../src/lib/layout";
import {
  readThemePreference,
  resolveThemeMode,
  writeThemePreference,
} from "../src/lib/themePreferences";

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  const normalized =
    value.length === 3
      ? value
          .split("")
          .map((ch) => `${ch}${ch}`)
          .join("")
      : value;

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function toLinearChannel(channel: number) {
  const value = channel / 255;
  return value <= 0.03928
    ? value / 12.92
    : Math.pow((value + 0.055) / 1.055, 2.4);
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return (
    0.2126 * toLinearChannel(r) +
    0.7152 * toLinearChannel(g) +
    0.0722 * toLinearChannel(b)
  );
}

function contrastRatio(foreground: string, background: string) {
  const l1 = luminance(foreground);
  const l2 = luminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

test("system fallback picks system theme when preference missing", () => {
  assert.equal(resolveThemeMode(null, "dark"), "dark");
  assert.equal(resolveThemeMode(null, "light"), "light");
  assert.equal(resolveThemeMode(null, "unspecified"), "light");
  assert.equal(resolveThemeMode("dark", "light"), "dark");
});

test("readThemePreference handles storage read failures", async () => {
  const storage = {
    getItem: async () => {
      throw new Error("boom");
    },
    setItem: async () => {},
  };

  const result = await readThemePreference(storage);
  assert.equal(result.preference, null);
  assert.match(result.error ?? "", /could not be loaded/i);
});

test("writeThemePreference handles storage write failures", async () => {
  const storage = {
    getItem: async () => null,
    setItem: async () => {
      throw new Error("disk full");
    },
  };

  const result = await writeThemePreference(storage, "dark");
  assert.equal(result.ok, false);
  assert.match(result.error ?? "", /could not be saved/i);
});

test("writeThemePreference succeeds when storage succeeds", async () => {
  let stored: ThemeMode | null = null;
  const storage = {
    getItem: async () => null,
    setItem: async (_key: string, value: string) => {
      stored = value as ThemeMode;
    },
  };

  const result = await writeThemePreference(storage, "light");
  assert.equal(result.ok, true);
  assert.equal(result.error, null);
  assert.equal(stored, "light");
});

test("home header breakpoint switches to compact layout", () => {
  assert.equal(isCompactHomeHeader(320), true);
  assert.equal(isCompactHomeHeader(375), true);
  assert.equal(isCompactHomeHeader(390), false);
});

test("contrast ratios meet accessibility targets for updated theme tokens", () => {
  const light = getTheme("light");
  const dark = getTheme("dark");

  assert.ok(contrastRatio(light.toggleSunIcon, light.surface) >= 3);
  assert.ok(contrastRatio(light.textOnDanger, light.danger) >= 4.5);

  assert.ok(
    contrastRatio(dark.secondaryButtonText, dark.secondaryButtonBackground) >=
      4.5,
  );
  assert.ok(contrastRatio(dark.textOnPrimary, dark.primary) >= 4.5);
  assert.ok(contrastRatio(dark.textOnAccent, dark.accent) >= 4.5);
  assert.ok(contrastRatio(dark.textOnDanger, dark.danger) >= 4.5);
});
