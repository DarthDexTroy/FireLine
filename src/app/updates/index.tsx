import React, { useState } from "react";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import { alerts } from "../../data/demo";
import { Badge, Button, Card, Icon, Screen } from "../../components/UI";
import { styles as s, colors as c } from "../../styles/theme";
export default function Updates() {
  const [refreshing, setRefreshing] = useState(false);
  const [updated, setUpdated] = useState("Not refreshed yet");
  async function refresh() {
    if (refreshing) return;
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 1000));
    setUpdated(
      `Refreshed at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`,
    );
    setRefreshing(false);
  }
  return (
    <Screen
      title="Live Updates"
      subtitle="Your local picture, at a glance."
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
          tintColor={c.green}
        />
      }
    >
      <Card style={{ backgroundColor: c.pale }}>
        <View style={s.row}>
          <Icon name="radio-outline" />
          <Text style={s.subheading}>Demo updates · Oak Valley</Text>
        </View>
        <Text style={s.small}>
          Fictional incident times remain fixed. Refreshing updates the local
          refresh time only.
        </Text>
        <View style={s.between}>
          <Text accessibilityLiveRegion="polite" style={s.small}>
            {updated}
          </Text>
          {refreshing && <ActivityIndicator color={c.green} />}
        </View>
        <Button
          title={refreshing ? "Refreshing…" : "Refresh Updates"}
          onPress={refresh}
          secondary
          disabled={refreshing}
          icon="refresh"
        />
      </Card>
      {alerts.map((alert) => (
        <Card key={alert.id}>
          <View style={s.between}>
            <Badge severity={alert.severity} />
            <Text style={s.small}>{alert.time}</Text>
          </View>
          <Text style={s.heading}>{alert.title}</Text>
          <Text style={s.body}>{alert.description}</Text>
          <Button
            title="View Details"
            href={{ pathname: "/updates/[id]", params: { id: alert.id } }}
            secondary
          />
        </Card>
      ))}
    </Screen>
  );
}
