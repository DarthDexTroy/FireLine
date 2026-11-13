import React, { useState } from "react";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import { alerts } from "../../data/demo";
import { Badge, Button, Card, Icon, Screen } from "../../components/UI";
import { useTheme } from "../../context/ThemeContext";
export default function Updates() {
  const [refreshing, setRefreshing] = useState(false);
  const [updated, setUpdated] = useState("Not refreshed yet");
  const { styles, theme } = useTheme();
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
          tintColor={theme.accent}
        />
      }
    >
      <Card style={{ backgroundColor: theme.surfaceMuted }}>
        <View style={styles.row}>
          <Icon name="radio-outline" />
          <Text style={styles.subheading}>Demo updates · Oak Valley</Text>
        </View>
        <Text style={styles.small}>
          Fictional incident times remain fixed. Refreshing updates the local
          refresh time only.
        </Text>
        <View style={styles.between}>
          <Text accessibilityLiveRegion="polite" style={styles.small}>
            {updated}
          </Text>
          {refreshing && <ActivityIndicator color={theme.accent} />}
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
          <View style={styles.between}>
            <Badge severity={alert.severity} />
            <Text style={styles.small}>{alert.time}</Text>
          </View>
          <Text style={styles.heading}>{alert.title}</Text>
          <Text style={styles.body}>{alert.description}</Text>
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
