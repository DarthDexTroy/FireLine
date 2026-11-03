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
import { colors as c, styles as s } from "../styles/theme";
import { useApp } from "../context/AppContext";
import { checklist, type Severity } from "../data/demo";
export type IconName = React.ComponentProps<typeof Ionicons>["name"];
export function Icon({
  name,
  color = c.green,
  size = 22,
}: {
  name: IconName;
  color?: string;
  size?: number;
}) {
  return <Ionicons name={name} color={color} size={size} />;
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
        backgroundColor: secondary ? c.blush : c.primary,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
        opacity: disabled ? 0.45 : pressed ? 0.75 : 1,
      })}
    >
      {icon && (
        <Icon name={icon} color={secondary ? c.primary : "white"} size={18} />
      )}
      <Text
        style={{
          color: secondary ? c.primary : "white",
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
        backgroundColor: pressed ? c.pale : c.white,
        borderWidth: 1,
        borderColor: c.border,
      })}
    >
      <Icon name={name} color={c.navy} />
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
  return <View style={[s.card, style]}>{children}</View>;
}
export function Screen({
  children,
  title,
  subtitle,
  back = true,
  ...props
}: ScrollViewProps & { title: string; subtitle?: string; back?: boolean }) {
  return (
    <ScrollView
      {...props}
      contentContainerStyle={[
        { padding: 22, gap: 22, paddingBottom: 30 },
        props.contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={s.row}>
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
          <Text style={s.title}>{title}</Text>
          {subtitle && (
            <Text style={[s.body, { marginTop: 6 }]}>{subtitle}</Text>
          )}
        </View>
      </View>
      {children}
    </ScrollView>
  );
}
export function Badge({ severity }: { severity: Severity }) {
  const values = {
    critical: ["#FCE9E9", "#A82C2C", "alert-circle"],
    warning: ["#FFF0D9", "#935813", "warning"],
    advisory: ["#FFF7D6", "#7C6512", "information-circle"],
  } as const;
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
      <Icon name={icon} color={fg} size={14} />
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
      <View style={s.between}>
        <Text style={s.subheading}>
          {compact ? "Your readiness" : `Preparation ${percent}% Complete`}
        </Text>
        <Text style={{ fontSize: 13, fontWeight: "700", color: c.green }}>
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
          backgroundColor: "#DEE9E3",
          height: 8,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            height: 8,
            backgroundColor: c.green,
            borderRadius: 4,
            width: animated.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
          }}
        />
      </View>
      <Text style={s.small}>
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
  return (
    <View style={s.between}>
      <Text style={s.heading}>{title}</Text>
      {href && (
        <Pressable
          accessibilityRole="link"
          onPress={() => router.push(href)}
          style={{ minHeight: 44, justifyContent: "center" }}
        >
          <Text style={{ color: c.green, fontSize: 12, fontWeight: "600" }}>
            {label || "View all"} →
          </Text>
        </Pressable>
      )}
    </View>
  );
}
export function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ gap: 4 }}>
      <Text style={s.small}>{label}</Text>
      <Text style={s.subheading}>{value}</Text>
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
  return (
    <Card>
      <Icon name="information-circle-outline" size={32} />
      <Text style={s.heading}>{title}</Text>
      <Text style={s.body}>{detail}</Text>
      <Button title={button} href={href} />
    </Card>
  );
}
export function Warning() {
  return (
    <Card style={{ backgroundColor: "#FFF6E8", borderColor: "#F0D6AD" }}>
      <View style={s.row}>
        <Icon name="warning-outline" color="#986021" />
        <Text style={[s.subheading, { color: "#87521C" }]}>
          Evacuation Warning
        </Text>
      </View>
      <Text style={[s.body, { color: "#87521C" }]}>
        Prepare your household in case an evacuation order is issued in this
        simulated scenario.
      </Text>
    </Card>
  );
}
