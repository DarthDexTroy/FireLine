import React from "react";
import { Text } from "react-native";
import { Screen } from "../../components/UI";
import { WildfireMap } from "../../components/WildfireMap";
import { styles as s } from "../../styles/theme";
export default function MapScreen() {
  return (
    <Screen title="Wildfire Map" subtitle="Fire, evacuation zones, and your home location.">
      <WildfireMap />
      <Text style={s.small}>
        Drag to explore. Use + / − to zoom. Select a marker for details. Zones,
        distances, and roads are illustrative.
      </Text>
    </Screen>
  );
}
