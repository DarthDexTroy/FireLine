import React from "react";
import { Text } from "react-native";
import { Card, Icon, Screen } from "../../components/UI";
import { styles as s } from "../../styles/theme";
export default function About() {
  return (
    <Screen title="About Fireline">
      <Card>
        <Icon name="flame" size={50} />
        <Text style={s.title}>Fireline</Text>
        <Text style={s.heading}>Stay informed. Stay prepared.</Text>
        <Text style={s.body}>
          Wildfire awareness and evacuation preparedness.
        </Text>
        <Text style={s.body}>
          Educational prototype. Not for emergency use.
        </Text>
        <Text style={s.body}>
          The app does not contact emergency services, collect your GPS location,
          or send push notifications. Your progress stays on this device.
        </Text>
        <Text style={s.small}>Version 1.0</Text>
      </Card>
    </Screen>
  );
}
