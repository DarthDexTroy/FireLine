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

const THEME_STORAGE_KEY = "fireline-theme-preference-v1";

type ThemePreference = ThemeMode | null;

const ThemeContext = createContext<{
  mode: ThemeMode;
  preference: ThemePreference;
  setMode: (mode: ThemeMode) => Promise<void>;
  toggleMode: () => Promise<void>;
  theme: AppTheme;
  styles: ReturnType<typeof createTextStyles>;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const [ready, setReady] = useState(false);
  const [preference, setPreference] = useState<ThemePreference>(null);

  const mode: ThemeMode = preference ?? (system === "dark" ? "dark" : "light");
  const theme = useMemo(() => getTheme(mode), [mode]);
  const styles = useMemo(() => createTextStyles(theme), [theme]);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(THEME_STORAGE_KEY)
      .then((value) => {
        if (!active) return;
        if (value === "light" || value === "dark") {
          setPreference(value);
        } else {
          setPreference(null);
        }
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
    await AsyncStorage.setItem(THEME_STORAGE_KEY, nextMode);
  }, []);

  const toggleMode = React.useCallback(async () => {
    const next = mode === "light" ? "dark" : "light";
    setPreference(next);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, next);
  }, [mode]);

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5F7F8",
          gap: 14,
        }}
      >
        <ActivityIndicator color="#2E6657" />
        <Text style={{ color: "#142B3B" }}>Loading Fireline theme…</Text>
      </View>
    );
  }

  return (
    <ThemeContext.Provider
      value={{ mode, preference, setMode, toggleMode, theme, styles }}
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
