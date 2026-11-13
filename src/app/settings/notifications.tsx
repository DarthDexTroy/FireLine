import React from "react";
import { Switch, Text, View } from "react-native";
import { preferenceLabels, type Preference } from "../../data/demo";
import { useApp } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import { Card, Screen } from "../../components/UI";
export default function Preferences() {
  const { state, dispatch } = useApp();
  const { styles, theme } = useTheme();
  return (
    <Screen
      title="Notification Preferences"
      subtitle="Stay informed, your way."
    >
      <Text style={styles.body}>
        Preferences control which fictional alerts appear in your notification
        center. No real push notifications are sent.
      </Text>
      <Card>
        {(Object.keys(preferenceLabels) as Preference[]).map((key) => (
          <View key={key} style={styles.between}>
            <Text style={[styles.subheading, { flex: 1 }]}>
              {preferenceLabels[key]}
            </Text>
            <Switch
              accessibilityLabel={preferenceLabels[key]}
              value={state.preferences[key]}
              onValueChange={(value) =>
                dispatch({ type: "preference", key, value })
              }
              trackColor={{ false: theme.borderStrong, true: theme.accent }}
            />
          </View>
        ))}
      </Card>
      <Text style={styles.small}>
        Disabling Critical Alerts hides critical items even when their category
        is enabled. The Updates feed always contains the full demo scenario.
      </Text>
    </Screen>
  );
}
