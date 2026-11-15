import React from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { useApp } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import { visibleNotifications } from "../lib/state";
import { Badge, Button, Card, Empty, Screen } from "../components/UI";
export default function Notifications() {
  const { state, dispatch } = useApp();
  const { styles: s, theme: c } = useTheme();
  const notifications = visibleNotifications(state);
  return (
    <Screen title="Notifications" subtitle="Your local alerts.">
      {notifications.length > 0 ? (
        <>
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
                Near {state.location} · {alert.time}
              </Text>
              <Button
                title="Open Update"
                onPress={() => {
                  dispatch({ type: "read", ids: [alert.id] });
                  router.push({
                    pathname: "/updates",
                    params: { open: alert.id },
                  });
                }}
                secondary
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Clear notification"
                onPress={() => dispatch({ type: "clear", ids: [alert.id] })}
                style={{ minHeight: 44, justifyContent: "center" }}
              >
                <Text style={{ color: c.primary, fontWeight: "700", fontSize: 13 }}>Clear Notification</Text>
              </Pressable>
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
