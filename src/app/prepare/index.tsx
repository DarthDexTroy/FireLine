import React from "react";
import { Text } from "react-native";
import { useApp } from "../../context/AppContext";
import { Button, Card, Screen, Warning } from "../../components/UI";
import { styles as s } from "../../styles/theme";

// Keep this screen for existing deep links, but remove competing category actions.
// The tab bar opens the checklist directly.
export default function Prepare() {
  const { state } = useApp();
  return (
    <Screen title="Prepare for Evacuation" subtitle="Your next steps, in one place.">
      <Warning />
      <Card>
        <Text style={s.heading}>Household checklist</Text>
        <Text style={s.small}>{state.completed.length} items marked packed · Checklist is optional</Text>
        <Text style={s.body}>Review documents, essential items and pet supplies. You can continue without completing every item.</Text>
        <Button title="Open Checklist" href="/prepare/checklist" icon="checkbox-outline" />
      </Card>
      <Button title="Find Nearby Shelters" href="/prepare/shelters" secondary />
      {state.shelterId ? <Button title="View My Evacuation Plan" href="/prepare/plan" secondary /> : null}
    </Screen>
  );
}
