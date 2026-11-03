import React from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { useApp } from "../context/AppContext";
import { visibleNotifications } from "../lib/state";
import { Badge, Button, Card, Empty, Screen } from "../components/UI";
import { styles as s, colors as c } from "../styles/theme";
export default function Notifications() {
  const { state, dispatch } = useApp();
  const notifications = visibleNotifications(state);
  return (
    <Screen title="Notifications" subtitle="Your simulated local alerts.">
      {notifications.length > 0 ? (
        <>
          <Button
            title="Mark All as Read"
            secondary
            onPress={() =>
              dispatch({ type: "read", ids: notifications.map((a) => a.id) })
            }
          />
          {notifications.map((alert) => (
            <Card
              key={alert.id}
              style={{
                borderColor: state.read.includes(alert.id)
                  ? c.border
                  : "#8EB59E",
              }}
            >
              <View style={s.between}>
                <Badge severity={alert.severity} />
                <Text style={s.small}>
                  {state.read.includes(alert.id) ? "Read" : "● Unread"}
                </Text>
              </View>
              <Text style={s.heading}>{alert.title}</Text>
              <Text style={s.body}>{alert.description}</Text>
              <Text style={s.small}>
                Scenario near {state.location} · {alert.time}
              </Text>
              <Button
                title="View Related Alert"
                onPress={() => {
                  dispatch({ type: "read", ids: [alert.id] });
                  router.push({
                    pathname: "/updates/[id]",
                    params: { id: alert.id },
                  });
                }}
                secondary
              />
              {!state.read.includes(alert.id) && (
                <Button
                  title="Mark as Read"
                  onPress={() => dispatch({ type: "read", ids: [alert.id] })}
                  secondary
                />
              )}
              <Button
                title="Clear Notification"
                onPress={() => dispatch({ type: "clear", ids: [alert.id] })}
                secondary
              />
            </Card>
          ))}
          <Button
            title="Clear All Notifications"
            onPress={() =>
              dispatch({ type: "clear", ids: notifications.map((a) => a.id) })
            }
            secondary
          />
        </>
      ) : (
        <Empty
          title="You’re all caught up"
          detail="No notifications match your preferences. Reset the demo to restore cleared alerts."
          href="/settings/notifications"
          button="Notification Preferences"
        />
      )}
      <Button
        title="Notification Preferences"
        href="/settings/notifications"
        secondary
      />
    </Screen>
  );
}
