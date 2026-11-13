import React from "react";
<<<<<<< HEAD
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
import { useTheme } from "../../context/ThemeContext";
export default function AlertDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const alert = alerts.find((a) => a.id === id);
  const { styles, theme } = useTheme();
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
            <View style={styles.between}>
              <Badge severity={alert.severity} />
              <Icon name="flame-outline" color={theme.warning} size={32} />
            </View>
            <Text style={[styles.title, { fontSize: 27 }]}>{alert.title}</Text>
            <Text style={styles.small}>SIMULATED ALERT · {alert.time}</Text>
            <View style={styles.divider} />
            <Detail label="Affected area" value="Oak Valley · Eastern Ridge" />
            <Text style={styles.body}>{alert.detail}</Text>
          </Card>
          <Card style={{ backgroundColor: theme.surfaceMuted }}>
            <View style={styles.row}>
              <Icon name="shield-checkmark-outline" />
              <Text style={styles.heading}>Recommended action</Text>
            </View>
            <Text style={styles.body}>{alert.action}</Text>
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
=======
import { Redirect } from "expo-router";
export default function LegacyAlertDetails() { return <Redirect href="/updates"/>; }
>>>>>>> origin/main
