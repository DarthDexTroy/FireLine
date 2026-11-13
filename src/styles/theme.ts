import { StyleSheet } from "react-native";

export type ThemeMode = "light" | "dark";

const brand = {
  primary: "#BC4422",
  green: "#2E6657",
  red: "#D64545",
  orange: "#F29F38",
  yellow: "#F4C95D",
  safe: "#38A169",
} as const;

const light = {
  mode: "light" as const,
  primary: brand.primary,
  accent: brand.green,
  danger: brand.red,
  warning: brand.orange,
  caution: brand.yellow,
  safe: brand.safe,
  background: "#F5F7F8",
  backgroundAlt: "#DFE7E4",
  surface: "#FFFFFF",
  surfaceMuted: "#E6F2EA",
  surfaceElevated: "#FFFFFFED",
  text: "#142B3B",
  textSecondary: "#697B84",
  textMuted: "#74868D",
  textOnPrimary: "#FFFFFF",
  border: "#E2E8E7",
  borderStrong: "#D2DBD9",
  icon: "#2E6657",
  iconMuted: "#8A999E",
  tabBarBackground: "#FFFFFF",
  tabBarBorder: "#E2E8E7",
  statusBar: "dark" as const,
  demoBannerBackground: "#E6F2EA",
  demoBannerText: "#2E6657",
  progressTrack: "#DEE9E3",
  warningCardBackground: "#FFF6E8",
  warningCardBorder: "#F0D6AD",
  warningCardText: "#87521C",
  routeNoticeBackground: "#FFF3E0",
  routeNoticeBorder: "#F1D7B3",
  routeNoticeText: "#89551B",
  selectedBorder: "#8EB59E",
} as const;

const dark = {
  mode: "dark" as const,
  primary: "#D25E3D",
  accent: "#60B28D",
  danger: "#FF7F7F",
  warning: "#F7B562",
  caution: "#FFD98D",
  safe: "#58C58A",
  background: "#11191E",
  backgroundAlt: "#0A1216",
  surface: "#1B272D",
  surfaceMuted: "#223239",
  surfaceElevated: "#1B272DE8",
  text: "#E8EFF2",
  textSecondary: "#B8C6CC",
  textMuted: "#9EB0B8",
  textOnPrimary: "#FFF4EE",
  border: "#324148",
  borderStrong: "#455962",
  icon: "#88D1B1",
  iconMuted: "#8EA5AF",
  tabBarBackground: "#182229",
  tabBarBorder: "#324148",
  statusBar: "light" as const,
  demoBannerBackground: "#223239",
  demoBannerText: "#88D1B1",
  progressTrack: "#32474F",
  warningCardBackground: "#43331F",
  warningCardBorder: "#775B35",
  warningCardText: "#FFD8A6",
  routeNoticeBackground: "#3D2E1D",
  routeNoticeBorder: "#7D603A",
  routeNoticeText: "#FFD9AE",
  selectedBorder: "#6AA28A",
} as const;

export type AppTheme = typeof light | typeof dark;

export function getTheme(mode: ThemeMode): AppTheme {
  return mode === "dark" ? dark : light;
}

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
