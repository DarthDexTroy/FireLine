import { StyleSheet } from "react-native";
import { getTheme, type AppTheme } from "./themeTokens";

export { getTheme, type AppTheme, type ThemeMode } from "./themeTokens";

export function createTextStyles(theme: AppTheme) {
  return StyleSheet.create({
    row: { flexDirection: "row", alignItems: "center", gap: 12 },
    between: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    title: {
      color: theme.text,
      fontSize: 28,
      fontWeight: "700",
      letterSpacing: -0.9,
    },
    heading: {
      color: theme.text,
      fontSize: 20,
      fontWeight: "700",
      letterSpacing: -0.4,
    },
    subheading: { color: theme.text, fontSize: 16, fontWeight: "600" },
    body: { color: theme.textSecondary, fontSize: 14, lineHeight: 22 },
    small: { color: theme.textSecondary, fontSize: 12, lineHeight: 18 },
    eyebrow: {
      color: theme.accent,
      fontSize: 11,
      fontWeight: "700",
      letterSpacing: 1.8,
      textTransform: "uppercase",
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      padding: 20,
      borderWidth: 1,
      borderColor: theme.border,
      gap: 14,
    },
    divider: { height: 1, backgroundColor: theme.border },
  });
}

export const colors = getTheme("light");
export const styles = createTextStyles(colors);
