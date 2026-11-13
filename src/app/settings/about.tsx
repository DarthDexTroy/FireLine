import React from "react";
import { Text } from "react-native";
import { Card, Icon, Screen } from "../../components/UI";
<<<<<<< HEAD
import { useTheme } from "../../context/ThemeContext";
=======
import { styles as s } from "../../styles/theme";

>>>>>>> origin/main
export default function About() {
  const { styles } = useTheme();
  return (
    <Screen title="About Fireline">
      <Card>
        <Icon name="flame" size={50} />
        <Text style={styles.title}>Fireline</Text>
        <Text style={styles.heading}>Stay informed. Stay prepared.</Text>
        <Text style={styles.body}>
          Wildfire awareness and evacuation preparedness.
        </Text>
<<<<<<< HEAD
        <Text style={styles.body}>
          Educational demonstration prototype. Not for emergency use.
        </Text>
        <Text style={styles.body}>
          Every incident, alert, shelter, road, and route is fictional. The app
          does not contact emergency services, collect your GPS location, or
          send push notifications. Your demo progress stays on this device.
        </Text>
        <Text style={styles.small}>Version 1.0 · Built for learning</Text>
=======
        <Text style={s.body}>
          Educational prototype. Not for emergency use.
        </Text>
        <Text style={s.body}>
          The app does not contact emergency services, collect your GPS location,
          or send push notifications. Your progress stays on this device.
        </Text>
        <Text style={s.small}>Version 1.0</Text>
>>>>>>> origin/main
      </Card>
    </Screen>
  );
}
