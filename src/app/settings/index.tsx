
import React from "react";
import { Text } from "react-native";
import { useApp } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import { Button, Card, Detail, Screen } from "../../components/UI";
import { ThemeToggle } from "../../components/ThemeToggle";

export default function Settings() {
  const { state } = useApp();
  const { styles: s } = useTheme();

  return (
    <Screen title="Settings" subtitle="Manage your preferences.">
      <Card>
        <Text style={s.heading}>Your home location</Text>
        <Detail label="Saved home" value={state.location} />
        <Text style={s.small}>
          Fireline uses this location when displaying
          area-specific information.
        </Text>
      </Card>

      <Card>
        <Text style={s.heading}>Appearance</Text>
        <Text style={s.body}>
          Switch between light and dark mode.
        </Text>
        <ThemeToggle />
      </Card>

      <Card>
        <Text style={s.heading}>Notifications</Text>
        <Text style={s.body}>
          Choose the types of wildfire updates you want
          to see in your notification center.
        </Text>
        <Button
          title="Notification Preferences"
          href="/settings/notifications"
          secondary
        />
      </Card>

      <Button
        title="About Fireline"
        href="/settings/about"
        secondary
      />
    </Screen>
  );
}
