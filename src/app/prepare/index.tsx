import React from "react";
import { Text } from "react-native";
import { useApp } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import { Button, Card, Screen, Warning } from "../../components/UI";
export default function Prepare() {
  const { state } = useApp();
  const { styles } = useTheme();
  return (
    <Screen title="Prepare for Evacuation" subtitle="Your next steps, in one place.">
      <Warning />
      <Card>
        <Text style={styles.heading}>Household checklist</Text>
        <Text style={styles.small}>{state.completed.length} items marked packed · Checklist is optional</Text>
        <Text style={styles.body}>Review documents, essential items and pet supplies. You can continue without completing every item.</Text>
        <Button title="Open Checklist" href="/prepare/checklist" icon="checkbox-outline" />
      </Card>
      <Button title="Find Nearby Shelters" href="/prepare/shelters" secondary />
      {state.shelterId ? <Button title="View My Evacuation Plan" href="/prepare/plan" secondary /> : null}
    </Screen>
  );
}
