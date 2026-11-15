
import React from "react";
import { Text } from "react-native";
import { Screen } from "../../components/UI";
import { WildfireMap } from "../../components/WildfireMap";
import { useTheme } from "../../context/ThemeContext";

export default function MapScreen() {
  const { styles: s } = useTheme();

  return (
    <Screen
      title="Wildfire Map"
      subtitle="Fire, evacuation zones, and your home location."
    >
      <WildfireMap />

      <Text style={s.small}>
        Drag to explore. Use + / − to zoom.
        Select a marker for details. Zones,
        distances, and roads are illustrative.
      </Text>
    </Screen>
  );
}
