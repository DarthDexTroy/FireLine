import React from "react";
import { Text } from "react-native";
import { Screen } from "../../components/UI";
import { WildfireMap } from "../../components/WildfireMap";
import { useTheme } from "../../context/ThemeContext";
export default function MapScreen() {
  const { styles } = useTheme();
  return (
    <Screen title="Wildfire Map" subtitle="Explore the demonstration area.">
      <WildfireMap />
      <Text style={styles.small}>
        Drag to explore. Use + / − to zoom. Select a marker for details. Zones,
        distances, and roads are simulated and not geographic boundaries.
      </Text>
    </Screen>
  );
}
