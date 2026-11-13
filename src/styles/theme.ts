import { StyleSheet } from "react-native";
<<<<<<< HEAD
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
=======
export const colors = {
  primary: "#BC4422",
  blush: "#FDF0E9",
  navy: "#142B3B",
  green: "#2E6657",
  pale: "#E6F2EA",
  white: "#FFFFFF",
  background: "#FFFFFF",
  red: "#D64545",
  orange: "#F29F38",
  yellow: "#F4C95D",
  safe: "#38A169",
  muted: "#52616E",
  border: "#E2E8E7",
};
export const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  between: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    color: colors.navy,
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.9,
  },
  heading: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.4,
  },
  subheading: { color: colors.navy, fontSize: 16, fontWeight: "600" },
  body: { color: colors.muted, fontSize: 14, lineHeight: 21 },
  small: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  eyebrow: {
    color: colors.green,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.8,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 14,
  },
  divider: { height: 1, backgroundColor: colors.border },
});
>>>>>>> origin/main
