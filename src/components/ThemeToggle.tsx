import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { mode, toggleMode, theme } = useTheme();
  const isDark = mode === "dark";

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={
        isDark ? "Switch to light mode" : "Switch to dark mode"
      }
      accessibilityState={{ checked: isDark }}
      onPress={() => {
        void toggleMode();
      }}
      style={({ pressed }) => ({
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: pressed ? theme.surfaceMuted : theme.surface,
        borderWidth: 1,
        borderColor: theme.border,
      })}
    >
      <Ionicons
        name={isDark ? "moon" : "sunny-outline"}
        size={20}
        color={isDark ? theme.toggleMoonIcon : theme.toggleSunIcon}
      />
    </Pressable>
  );
}
