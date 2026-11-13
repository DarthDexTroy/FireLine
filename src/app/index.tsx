import React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  Badge,
  Button,
  Card,
  Icon,
  IconButton,
  Progress,
  Section,
  type IconName,
} from "../components/UI";
import { ThemeToggle } from "../components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import { useApp } from "../context/AppContext";
import { isCompactHomeHeader } from "../lib/layout";
import { visibleNotifications } from "../lib/state";
export default function Home() {
  const { state } = useApp();
  const { theme, styles } = useTheme();
  const { width } = useWindowDimensions();
  const compactHeader = isCompactHomeHeader(width);
  const unread = visibleNotifications(state).filter(
    (a) => !state.read.includes(a.id),
  ).length;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 22, paddingBottom: 30, gap: 23 }}
    >
      <View
        style={[styles.between, { flexWrap: "wrap", alignItems: "flex-start" }]}
      >
        <View style={[styles.row, { flexShrink: 1, minWidth: 0 }]}>
          <View
            style={{
              width: 42,
              height: 46,
              borderRadius: 14,
              backgroundColor: theme.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="flame" color={theme.textOnPrimary} size={27} />
          </View>
          <View>
            <Text style={[styles.title, { fontSize: 31 }]}>Fireline</Text>
            <Text
              style={{ fontSize: 11, color: theme.textSecondary, marginTop: 3 }}
            >
              Stay informed. Stay prepared.
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 6,
            marginLeft: compactHeader ? 0 : "auto",
            width: compactHeader ? "100%" : undefined,
            justifyContent: compactHeader ? "flex-end" : "flex-start",
            marginTop: compactHeader ? 8 : 0,
          }}
        >
          <ThemeToggle />
          <IconButton
            name="settings-outline"
            label="Open settings"
            onPress={() => router.push("/settings")}
          />
          <IconButton
            name="notifications-outline"
            label="Open notifications"
            onPress={() => router.push("/notifications")}
          />
          {unread > 0 && (
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                right: -2,
                top: -3,
                backgroundColor: theme.danger,
                borderRadius: 10,
                minWidth: 18,
                height: 18,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: theme.textOnDanger,
                  fontSize: 10,
                  fontWeight: "700",
                }}
              >
                {unread}
              </Text>
            </View>
          )}
        </View>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Change saved location"
        onPress={() => router.push("/settings/location")}
        style={[
          styles.row,
          {
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
            paddingBottom: 18,
          },
        ]}
      >
        <Icon name="location-outline" size={22} />
        <View style={{ flex: 1, gap: 3 }}>
          <Text style={styles.subheading}>{state.location}</Text>
          <Text style={styles.small}>Your saved demonstration location</Text>
        </View>
        <Icon name="chevron-down" size={17} />
      </Pressable>
      <LinearGradient
        colors={["#8C361F", "#B84725"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ padding: 22, borderRadius: 24, gap: 17, overflow: "hidden" }}
      >
        <View style={styles.between}>
          <Text
            style={{
              color: "#F7D5C3",
              fontSize: 10,
              fontWeight: "600",
              letterSpacing: 1.6,
            }}
          >
            NEAR YOUR SAVED LOCATION
          </Text>
          <Icon name="flame-outline" color="#F7D5C3" size={24} />
        </View>
        <View style={{ gap: 10 }}>
          <Badge severity="warning" />
          <Text
            style={{
              color: "white",
              fontSize: 28,
              fontWeight: "700",
              letterSpacing: -0.8,
            }}
          >
            Wildfire Warning
          </Text>
          <Text style={{ color: "#FBE4D8", fontSize: 14, lineHeight: 21 }}>
            Simulated wildfire activity near your area. Now is the time to
            prepare.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            borderTopWidth: 1,
            borderTopColor: "#C9785C",
            paddingTop: 15,
          }}
        >
          <View>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
              4.8 <Text style={{ fontSize: 12 }}>miles away</Text>
            </Text>
            <Text style={{ color: "#F7D5C3", fontSize: 11, marginTop: 4 }}>
              Oak Valley Wildfire
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#F8CF8B", fontSize: 13, fontWeight: "600" }}>
              Prepare to Evacuate
            </Text>
            <Text style={{ color: "#F7D5C3", fontSize: 11, marginTop: 7 }}>
              Scenario update · 5 min ago
            </Text>
          </View>
        </View>
        <Button
          title="View Alert Details"
          href="/updates/evacuation"
          secondary
          icon="arrow-forward"
        />
      </LinearGradient>
      <View style={{ gap: 12 }}>
        <Text style={styles.eyebrow}>
          A little preparation. More peace of mind.
        </Text>
        <Text style={styles.heading}>Your next steps</Text>
        {(
          [
            {
              title: "Live Updates",
              description: "The latest simulated wildfire updates.",
              action: "View Updates",
              icon: "radio-outline",
              href: "/updates",
            },
            {
              title: "Wildfire Nearby",
              description: "Explore activity and evacuation zones.",
              action: "View Map",
              icon: "map-outline",
              href: "/wildfire",
            },
            {
              title: "Prepare",
              description: "Build a plan for your household.",
              action: "Start Preparing",
              icon: "bag-handle-outline",
              href: "/prepare/checklist",
            },
          ] as const
        ).map((item) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${item.title}: ${item.action}`}
            key={item.title}
            onPress={() => router.push(item.href)}
            style={({ pressed }) => [
              styles.card,
              styles.row,
              { padding: 16, opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <View
              style={{
                width: 46,
                height: 48,
                borderRadius: 14,
                backgroundColor: theme.surfaceMuted,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name={item.icon as IconName} />
            </View>
            <View style={{ flex: 1, gap: 5 }}>
              <Text style={styles.subheading}>{item.title}</Text>
              <Text style={[styles.small, { fontSize: 11 }]}>
                {item.description}
              </Text>
              <Text
                style={{ fontSize: 11, color: theme.accent, fontWeight: "600" }}
              >
                {item.action} →
              </Text>
            </View>
            <Icon name="chevron-forward" color={theme.iconMuted} size={18} />
          </Pressable>
        ))}
      </View>
      <View style={{ gap: 10 }}>
        <Section
          title="Ready, one step at a time"
          label="My plan"
          href="/prepare/plan"
        />
        <Card>
          <Progress compact />
          <Button
            title="Continue Preparing"
            href="/prepare/checklist"
            secondary
          />
        </Card>
      </View>
      <Text style={[styles.small, { textAlign: "center", fontSize: 10 }]}>
        Educational demonstration. Not for emergency use.
      </Text>
    </ScrollView>
  );
}
