import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Text, useColorScheme, View } from "react-native";
import {
  createTextStyles,
  getTheme,
  type AppTheme,
  type ThemeMode,
} from "../styles/theme";
import {
  readThemePreference,
  resolveThemeMode,
  writeThemePreference,
} from "../lib/themePreferences";

type ThemePreference = ThemeMode | null;

const ThemeContext = createContext<{
  mode: ThemeMode;
  preference: ThemePreference;
  setMode: (mode: ThemeMode) => Promise<void>;
  toggleMode: () => Promise<void>;
  theme: AppTheme;
  styles: ReturnType<typeof createTextStyles>;
  storageError: string | null;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const [ready, setReady] = useState(false);
  const [preference, setPreference] = useState<ThemePreference>(null);
  const [storageError, setStorageError] = useState<string | null>(null);

  const bootTheme = useMemo(
    () => getTheme(resolveThemeMode(null, system)),
    [system],
  );
  const mode: ThemeMode = resolveThemeMode(preference, system);
  const theme = useMemo(() => getTheme(mode), [mode]);
  const styles = useMemo(() => createTextStyles(theme), [theme]);

  useEffect(() => {
    let active = true;
    readThemePreference(AsyncStorage)
      .then(({ preference: storedPreference, error }) => {
        if (!active) return;
        setPreference(storedPreference);
        setStorageError(error);
      })
      .finally(() => {
        if (active) setReady(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const setMode = React.useCallback(async (nextMode: ThemeMode) => {
    setPreference(nextMode);
    const result = await writeThemePreference(AsyncStorage, nextMode);
    setStorageError(result.error);
  }, []);

  const toggleMode = React.useCallback(async () => {
    const next = mode === "light" ? "dark" : "light";
    setPreference(next);
    const result = await writeThemePreference(AsyncStorage, next);
    setStorageError(result.error);
  }, [mode]);

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: bootTheme.background,
          gap: 14,
        }}
      >
        <ActivityIndicator color={bootTheme.accent} />
        <Text style={{ color: bootTheme.text }}>Loading Fireline theme…</Text>
      </View>
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        mode,
        preference,
        setMode,
        toggleMode,
        theme,
        styles,
        storageError,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("ThemeProvider missing");
  }
  return value;
}
