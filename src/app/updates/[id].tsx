import React from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { alerts } from "../../data/demo";
import {
  Badge,
  Button,
  Card,
  Detail,
  Empty,
  Icon,
  Screen,
} from "../../components/UI";
import { styles as s, colors as c } from "../../styles/theme";
export default function AlertDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const alert = alerts.find((a) => a.id === id);
  return (
    <Screen title="Alert Details" subtitle="Understand what’s happening.">
      {!alert ? (
        <Empty
          title="Alert not found"
          detail="This demo alert is no longer available."
          button="Back to Updates"
          href="/updates"
        />
      ) : (
        <>
          <Card>
            <View style={s.between}>
              <Badge severity={alert.severity} />
              <Icon name="flame-outline" color={c.orange} size={32} />
            </View>
            <Text style={[s.title, { fontSize: 27 }]}>{alert.title}</Text>
            <Text style={s.small}>SIMULATED ALERT · {alert.time}</Text>
            <View style={s.divider} />
            <Detail label="Affected area" value="Oak Valley · Eastern Ridge" />
            <Text style={s.body}>{alert.detail}</Text>
          </Card>
          <Card style={{ backgroundColor: c.pale }}>
            <View style={s.row}>
              <Icon name="shield-checkmark-outline" />
              <Text style={s.heading}>Recommended action</Text>
            </View>
            <Text style={s.body}>{alert.action}</Text>
          </Card>
          <Detail
            label="Related incident"
            value="Oak Valley Wildfire · 4.8 miles away"
          />
          <Button title="View Map" icon="map-outline" href="/wildfire/map" />
          <Button
            title="Prepare Evacuation Plan"
            href="/prepare/checklist"
            secondary
          />
          <Button title="Back to Updates" href="/updates" secondary />
        </>
      )}
    </Screen>
  );
}
