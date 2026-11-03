import React from "react";
import { Text, View } from "react-native";
import { Badge, Button, Card, Detail, Icon, Screen } from "../../components/UI";
import { styles as s, colors as c } from "../../styles/theme";
export default function Nearby() {
  return (
    <Screen
      title="Wildfire Nearby"
      subtitle="A clearer view of your surroundings."
    >
      <Card>
        <View style={s.between}>
          <Badge severity="warning" />
          <Text style={{ color: c.red, fontSize: 12, fontWeight: "600" }}>
            ● Active · Simulated
          </Text>
        </View>
        <Icon name="flame-outline" color={c.orange} size={50} />
        <Text style={s.title}>Oak Valley Wildfire</Text>
        <Text style={s.heading}>4.8 miles away</Text>
        <View style={s.divider} />
        <Detail label="Fire location" value="Eastern Ridge, Oak Valley" />
        <Detail label="Evacuation status" value="Prepare to Evacuate" />
        <Detail label="Scenario update" value="5 minutes ago · 35% contained" />
        <Detail
          label="Nearby affected areas"
          value="Oak Valley · Pine Hollow"
        />
      </Card>
      <Button title="View Map" href="/wildfire/map" icon="map-outline" />
      <Button title="View Live Updates" href="/updates" secondary />
      <Button title="Prepare" href="/prepare/checklist" secondary />
      <Text style={s.small}>
        All locations, distances, and boundaries are fictional demonstration
        data.
      </Text>
    </Screen>
  );
}
