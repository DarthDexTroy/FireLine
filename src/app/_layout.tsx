import React from "react";
import { Stack, router, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AppProvider, useApp } from "../context/AppContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { Icon, type IconName } from "../components/UI";
const tabs: {
  label: string;
  href: "/" | "/wildfire/map" | "/prepare/checklist" | "/prepare/shelters";
  icon: IconName;
}[] = [
  { label: "Home", href: "/", icon: "home-outline" },
  { label: "Map", href: "/wildfire/map", icon: "map-outline" },
  { label: "Prepare", href: "/prepare/checklist", icon: "create-outline" },
  { label: "Shelters", href: "/prepare/shelters", icon: "business-outline" },
];
function Shell() {
  const path = usePathname();
  const { storageError } = useApp();
  const { theme, storageError: themeStorageError } = useTheme();
  return (
<<<<<<< HEAD
    <View
      style={{
        flex: 1,
        backgroundColor: theme.backgroundAlt,
        alignItems: "center",
      }}
    >
=======
    <View style={{ flex: 1, backgroundColor: "#E9EDEE", alignItems: "center" }}>
>>>>>>> origin/main
      <SafeAreaView
        style={{
          flex: 1,
          width: "100%",
<<<<<<< HEAD
          maxWidth: 430,
          backgroundColor: theme.background,
        }}
      >
        <StatusBar style={theme.statusBar} />
        <View
          style={{
            backgroundColor: theme.demoBannerBackground,
            padding: 8,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 10,
              color: theme.demoBannerText,
              fontWeight: "600",
              letterSpacing: 0.8,
            }}
          >
            DEMO MODE · ALL EMERGENCY DATA IS SIMULATED
          </Text>
        </View>
=======
          maxWidth: 393,
          backgroundColor: c.background,
        }}
      >
        <StatusBar style="dark" />
>>>>>>> origin/main
        {storageError && (
          <Text
            accessibilityRole="alert"
            style={{
              backgroundColor: theme.routeNoticeBackground,
              color: theme.routeNoticeText,
              padding: 12,
              fontSize: 12,
            }}
          >
            {storageError}
          </Text>
        )}
        {themeStorageError && (
          <Text
            accessibilityRole="alert"
            style={{
              backgroundColor: theme.warningCardBackground,
              color: theme.warningCardText,
              padding: 12,
              fontSize: 12,
            }}
          >
            {themeStorageError}
          </Text>
        )}
        <View style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: theme.background },
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: theme.tabBarBackground,
            borderTopColor: theme.tabBarBorder,
            borderTopWidth: 1,
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
          {tabs.map((tab) => {
            const active =
              tab.href === "/"
                ? path === "/"
                : tab.href === "/prepare/checklist"
                  ? path.startsWith("/prepare") &&
                    !path.includes("shelter") &&
                    !path.includes("directions")
                  : path.startsWith(tab.href);
            return (
              <Pressable
                key={tab.href}
                accessibilityRole="tab"
                accessibilityLabel={tab.label}
                accessibilityState={{ selected: active }}
                aria-selected={active}
                onPress={() => router.navigate(tab.href)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  gap: 5,
                  paddingVertical: 8,
                  minHeight: 54,
                }}
              >
                <Icon
                  name={tab.icon}
                  color={active ? theme.primary : theme.iconMuted}
                  size={22}
                />
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: active ? "700" : "500",
                    color: active ? theme.primary : theme.textMuted,
                  }}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}
export default function Layout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppProvider>
          <Shell />
        </AppProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
