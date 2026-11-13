import React, { useState } from "react";
import { Text } from "react-native";
import { useApp } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import { Button, Card, Detail, Screen } from "../../components/UI";
export default function Settings() {
  const { state, dispatch } = useApp();
  const { styles } = useTheme();
  const [confirm, setConfirm] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <Screen title="Settings" subtitle="Make your demo feel like home.">
      <Card>
        <Detail label="Saved location" value={state.location} />
        <Button
          title="Change Saved Location"
          href="/settings/location"
          secondary
        />
      </Card>
      <Card>
        <Text style={styles.heading}>Notifications</Text>
        <Text style={styles.body}>
          Choose which simulated alerts appear in your notification center.
        </Text>
        <Button
          title="Notification Preferences"
          href="/settings/notifications"
          secondary
        />
      </Card>
      <Card>
        <Text style={styles.heading}>A fresh start</Text>
        <Text style={styles.body}>
          Reset your checklist, shelter, saved plan, location, preferences, and
          notifications.
        </Text>
        {confirm ? (
          <>
            <Text style={styles.subheading}>
              Reset all demo progress on this device?
            </Text>
            <Button
              title="Confirm Reset"
              onPress={() => {
                dispatch({ type: "reset" });
                setConfirm(false);
                setDone(true);
              }}
            />
            <Button
              title="Keep My Progress"
              onPress={() => setConfirm(false)}
              secondary
            />
          </>
        ) : (
          <Button
            title="Reset Demo Data"
            secondary
            onPress={() => {
              setConfirm(true);
              setDone(false);
            }}
          />
        )}
        {done && (
          <Text accessibilityRole="alert" style={styles.body}>
            Demo data has been reset.
          </Text>
        )}
      </Card>
      <Button title="About Fireline" href="/settings/about" secondary />
    </Screen>
  );
}
