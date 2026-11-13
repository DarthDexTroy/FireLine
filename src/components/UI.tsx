import React, { useEffect, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  View,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, type Href } from "expo-router";
import { useApp } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import { checklist, type Severity } from "../data/demo";
import { ThemeToggle } from "./ThemeToggle";
export type IconName = React.ComponentProps<typeof Ionicons>["name"];
export function Icon({
  name,
  color,
  size = 22,
}: {
  name: IconName;
  color?: string;
  size?: number;
}) {
  const { theme } = useTheme();
  return <Ionicons name={name} color={color ?? theme.icon} size={size} />;
}
export function Button({
  title,
  onPress,
  href,
  secondary = false,
  icon,
  disabled = false,
}: {
  title: string;
  onPress?: () => void;
  href?: Href;
  secondary?: boolean;
  icon?: IconName;
  disabled?: boolean;
}) {
  const { theme } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
      aria-disabled={disabled}
      disabled={disabled}
      onPress={href ? () => router.push(href) : onPress}
      style={({ pressed }) => ({
        minHeight: 50,
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 14,
        backgroundColor: secondary
          ? theme.secondaryButtonBackground
          : theme.primary,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
        opacity: disabled ? 0.45 : pressed ? 0.75 : 1,
        borderWidth: 1,
        borderColor: secondary ? theme.secondaryButtonBorder : theme.primary,
      })}
    >
      {icon && (
        <Icon
          name={icon}
          color={secondary ? theme.secondaryButtonText : theme.textOnPrimary}
          size={18}
        />
      )}
      <Text
        style={{
          color: secondary ? theme.secondaryButtonText : theme.textOnPrimary,
          fontSize: 14,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
export function IconButton({
  name,
  label,
  onPress,
}: {
  name: IconName;
  label: string;
  onPress: () => void;
}) {
  const { theme } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
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
      <Icon name={name} color={theme.text} />
    </Pressable>
  );
}
export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { styles } = useTheme();
  return <View style={[styles.card, style]}>{children}</View>;
}
export function Screen({
  children,
  title,
  subtitle,
  back = true,
  ...props
}: ScrollViewProps & { title: string; subtitle?: string; back?: boolean }) {
  const { styles } = useTheme();
  return (
    <ScrollView
      {...props}
      contentContainerStyle={[
        { padding: 22, gap: 22, paddingBottom: 30 },
        props.contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.row}>
        {back && (
          <IconButton
            name="arrow-back"
            label="Go back"
            onPress={() =>
              router.canGoBack() ? router.back() : router.replace("/")
            }
          />
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && (
            <Text style={[styles.body, { marginTop: 6 }]}>{subtitle}</Text>
          )}
        </View>
        <ThemeToggle />
      </View>
      {children}
    </ScrollView>
  );
}
export function Badge({ severity }: { severity: Severity }) {
  const { mode } = useTheme();
  const values =
    mode === "dark"
      ? {
          critical: ["#5E2525", "#FFB3B3", "alert-circle"],
          warning: ["#604626", "#FFD8A4", "warning"],
          advisory: ["#5B4F2A", "#FFE8B5", "information-circle"],
        }
      : {
          critical: ["#FCE9E9", "#A82C2C", "alert-circle"],
          warning: ["#FFF0D9", "#935813", "warning"],
          advisory: ["#FFF7D6", "#7C6512", "information-circle"],
        };
  const [bg, fg, icon] = values[severity];
  return (
    <View
      style={{
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: bg,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
      }}
    >
      <Icon name={icon as IconName} color={fg} size={14} />
      <Text
        style={{
          color: fg,
          fontSize: 11,
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: 0.6,
        }}
      >
        {severity}
      </Text>
    </View>
  );
}
export function Progress({ compact = false }: { compact?: boolean }) {
  const { state } = useApp();
  const { styles, theme } = useTheme();
  const completed = state.completed.length;
  const percent = Math.round((completed / checklist.length) * 100);
  const [animated] = useState(() => new Animated.Value(percent));
  useEffect(() => {
    Animated.timing(animated, {
      toValue: percent,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [percent, animated]);
  return (
    <View style={{ gap: 12 }}>
      <View style={styles.between}>
        <Text style={styles.subheading}>
          {compact ? "Your readiness" : `Preparation ${percent}% Complete`}
        </Text>
        <Text style={{ fontSize: 13, fontWeight: "700", color: theme.accent }}>
          {percent}%
        </Text>
      </View>
      <View
        accessibilityRole="progressbar"
        accessibilityLabel="Preparation progress"
        accessibilityValue={{ min: 0, max: 14, now: completed }}
        aria-valuemin={0}
        aria-valuemax={14}
        aria-valuenow={completed}
        style={{
          backgroundColor: theme.progressTrack,
          height: 8,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            height: 8,
            backgroundColor: theme.accent,
            borderRadius: 4,
            width: animated.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
          }}
        />
      </View>
      <Text style={styles.small}>
        {completed} of {checklist.length} items packed
        {completed === 14
          ? " · Checklist complete"
          : " · Every small step helps"}
      </Text>
    </View>
  );
}
export function Section({
  title,
  label,
  href,
}: {
  title: string;
  label?: string;
  href?: Href;
}) {
  const { styles, theme } = useTheme();
  return (
    <View style={styles.between}>
      <Text style={styles.heading}>{title}</Text>
      {href && (
        <Pressable
          accessibilityRole="link"
          onPress={() => router.push(href)}
          style={{ minHeight: 44, justifyContent: "center" }}
        >
          <Text
            style={{ color: theme.accent, fontSize: 12, fontWeight: "600" }}
          >
            {label || "View all"} →
          </Text>
        </Pressable>
      )}
    </View>
  );
}
export function Detail({ label, value }: { label: string; value: string }) {
  const { styles } = useTheme();
  return (
    <View style={{ gap: 4 }}>
      <Text style={styles.small}>{label}</Text>
      <Text style={styles.subheading}>{value}</Text>
    </View>
  );
}
export function Empty({
  title,
  detail,
  href = "/",
  button = "Return Home",
}: {
  title: string;
  detail: string;
  href?: Href;
  button?: string;
}) {
  const { styles } = useTheme();
  return (
    <Card>
      <Icon name="information-circle-outline" size={32} />
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.body}>{detail}</Text>
      <Button title={button} href={href} />
    </Card>
  );
}
export function Warning() {
  const { styles, theme } = useTheme();
  return (
    <Card
      style={{
        backgroundColor: theme.warningCardBackground,
        borderColor: theme.warningCardBorder,
      }}
    >
      <View style={styles.row}>
        <Icon name="warning-outline" color={theme.warningCardText} />
        <Text style={[styles.subheading, { color: theme.warningCardText }]}>
          Evacuation Warning
        </Text>
      </View>
      <Text style={[styles.body, { color: theme.warningCardText }]}>
        Prepare your household in case an evacuation order is issued in this
        simulated scenario.
      </Text>
    </Card>
  );
}
