import React from "react";
import { Stack, router, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AppProvider, useApp } from "../context/AppContext";
import { Icon, type IconName } from "../components/UI";
import { colors as c } from "../styles/theme";
const tabs: {
  label: string;
  href: "/" | "/wildfire/map" | "/prepare" | "/prepare/shelters";
  icon: IconName;
}[] = [
  { label: "Home", href: "/", icon: "home-outline" },
  { label: "Map", href: "/wildfire/map", icon: "map-outline" },
  { label: "Prepare", href: "/prepare", icon: "create-outline" },
  { label: "Shelters", href: "/prepare/shelters", icon: "business-outline" },
];
function Shell() {
  const path = usePathname();
  const { storageError } = useApp();
  return (
    <View style={{ flex: 1, backgroundColor: "#DFE7E4", alignItems: "center" }}>
      <SafeAreaView
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 430,
          backgroundColor: c.background,
        }}
      >
        <StatusBar style="dark" />
        <View
          style={{ backgroundColor: c.pale, padding: 8, alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 10,
              color: c.green,
              fontWeight: "600",
              letterSpacing: 0.8,
            }}
          >
            DEMO MODE · ALL EMERGENCY DATA IS SIMULATED
          </Text>
        </View>
        {storageError && (
          <Text
            accessibilityRole="alert"
            style={{ backgroundColor: "#FFF0D9", padding: 12, fontSize: 12 }}
          >
            {storageError}
          </Text>
        )}
        <View style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: c.background },
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            borderTopColor: c.border,
            borderTopWidth: 1,
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
          {tabs.map((tab) => {
            const active =
              tab.href === "/"
                ? path === "/"
                : tab.href === "/prepare"
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
                  color={active ? c.primary : "#8A999E"}
                  size={22}
                />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: active ? "700" : "500",
                    color: active ? c.primary : "#74868D",
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
      <AppProvider>
        <Shell />
      </AppProvider>
    </SafeAreaProvider>
  );
}
