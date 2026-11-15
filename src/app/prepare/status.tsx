
import React from "react";
import { Text, View } from "react-native";
import { Button, Card, Icon, Screen } from "../../components/UI";
import { useTheme } from "../../context/ThemeContext";

export default function AreaStatus() {
  const { styles: s, theme } = useTheme();

  return (
    <Screen
      title="Your Area Status"
      subtitle="Information for your saved home in Zone B"
    >
      <View
        style={{
          backgroundColor: theme.surfaceMuted,
          padding: 17,
          borderRadius: 16,
          gap: 6,
        }}
      >
        <View style={[s.row, { gap: 9 }]}>
          <Icon
            name="warning-outline"
            size={28}
            color={theme.accent}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 21,
                color: theme.text,
                fontWeight: "800",
              }}
            >
              Prepare
            </Text>
            <Text
              style={{
                color: theme.text,
                fontWeight: "700",
              }}
            >
              Zone B · Evacuation Warning
            </Text>
          </View>
        </View>

        <Text
          style={{
            color: theme.textSecondary,
            marginTop: 5,
          }}
        >
          Be ready to leave soon if an evacuation order is issued.
        </Text>
      </View>

      <Card style={{ gap: 8 }}>
        <Text style={s.heading}>What this means</Text>
        <Text style={s.body}>
          A wildfire is nearby and conditions may change quickly.
          Prepare your household, review shelter options, and
          monitor instructions from emergency authorities.
        </Text>
      </Card>

      <View style={{ flexDirection: "row", gap: 8 }}>
        {(
          [
            {
              icon: "flame",
              big: "4.8 mi",
              label: "From home",
            },
            {
              icon: "navigate-outline",
              big: "SE · 15 mph",
              label: "Reported movement",
            },
            {
              icon: "time-outline",
              big: "Changing",
              label: "Conditions",
            },
          ] as const
        ).map((item) => (
          <View
            key={item.label}
            style={{
              flex: 1,
              alignItems: "center",
              gap: 5,
              backgroundColor: theme.surfaceMuted,
              borderRadius: 12,
              padding: 10,
            }}
          >
            <Icon
              name={item.icon}
              size={23}
              color={theme.accent}
            />
            <Text
              style={{
                fontWeight: "800",
                fontSize: 14,
                color: theme.text,
              }}
            >
              {item.big}
            </Text>
            <Text
              style={{
                fontSize: 10,
                textAlign: "center",
                color: theme.textSecondary,
              }}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </View>

      <Card style={{ gap: 10 }}>
        <Text style={s.heading}>Recommendations</Text>

        {[
          "Prepare important documents and essential items",
          "Check on household members and pets",
          "Review nearby shelters and road information",
          "Continue monitoring official updates",
        ].map((item) => (
          <View key={item} style={[s.row, { gap: 9 }]}>
            <Icon
              name="checkmark-circle-outline"
              color={theme.accent}
              size={17}
            />
            <Text style={[s.body, { flex: 1 }]}>
              {item}
            </Text>
          </View>
        ))}
      </Card>

      <Button
        title="Start Preparing"
        href="/prepare/checklist"
        icon="arrow-forward"
      />
    </Screen>
  );
}
