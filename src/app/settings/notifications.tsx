import React from "react";
import { Switch, Text, View } from "react-native";
import { preferenceLabels, type Preference } from "../../data/demo";
import { useApp } from "../../context/AppContext";
import { Card, Screen } from "../../components/UI";
import { styles as s, colors as c } from "../../styles/theme";
export default function Preferences() {
  const { state, dispatch } = useApp();
  return (
    <Screen
      title="Notification Preferences"
      subtitle="Stay informed, your way."
    >
      <Text style={s.body}>
        Preferences control which alerts appear in your notification
        center. No real push notifications are sent.
      </Text>
      <Card>
        {(Object.keys(preferenceLabels) as Preference[]).map((key) => (
          <View key={key} style={s.between}>
            <Text style={[s.subheading, { flex: 1 }]}>
              {preferenceLabels[key]}
            </Text>
            <Switch
              accessibilityLabel={preferenceLabels[key]}
              value={state.preferences[key]}
              onValueChange={(value) =>
                dispatch({ type: "preference", key, value })
              }
              trackColor={{ false: "#CCD6D0", true: c.green }}
            />
          </View>
        ))}
      </Card>
      <Text style={s.small}>
        Disabling Critical Alerts hides critical items even when their category
        is enabled. The Updates feed always contains the full incident feed.
      </Text>
    </Screen>
  );
}
