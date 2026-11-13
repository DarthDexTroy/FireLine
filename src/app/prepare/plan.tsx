import React, { useState } from "react";
import { Text } from "react-native";
import { shelters } from "../../data/demo";
import { useApp } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import { reducer } from "../../lib/state";
import {
  Badge,
  Button,
  Card,
  Detail,
  Icon,
  Progress,
  Screen,
} from "../../components/UI";
export default function Plan() {
  const { state, dispatch, persist } = useApp();
  const { styles, theme } = useTheme();
  const shelter = shelters.find((s) => s.id === state.shelterId);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const changed =
    !state.plan ||
    state.plan.shelterId !== state.shelterId ||
    state.plan.from !== state.location ||
    [...state.plan.completed].sort().join() !==
      [...state.completed].sort().join();
  async function save() {
    setSaving(true);
    const time = new Date().toISOString();
    const next = reducer(state, { type: "save", time });
    dispatch({ type: "save", time });
    const ok = await persist(next);
    setMessage(
      ok
        ? "Evacuation plan saved successfully."
        : "Plan could not be saved. Please try again.",
    );
    setSaving(false);
  }
  return (
    <Screen title="My Evacuation Plan" subtitle="Everything in one place.">
      <Card>
        <Icon name="shield-checkmark-outline" size={38} />
        <Text style={styles.heading}>
          {state.completed.length === 14
            ? "Checklist complete"
            : "Your plan is taking shape"}
        </Text>
        <Progress />
        <Badge severity="warning" />
        <Text style={styles.body}>
          Evacuation status: Prepare to Evacuate · Simulated
        </Text>
      </Card>
      <Card>
        <Detail
          label="Selected shelter"
          value={shelter?.name || "No shelter selected yet"}
        />
        {shelter ? (
          <>
            <Detail label="Route" value={`Home → ${shelter.name}`} />
            <Detail label="Starting location" value={state.location} />
            <Text style={styles.small}>
              {shelter.distanceMiles} miles · About {shelter.minutes} minutes ·
              Simulated
            </Text>
            <Button title="Change Shelter" href="/prepare/shelters" secondary />
          </>
        ) : (
          <Button title="Choose a Shelter" href="/prepare/shelters" />
        )}
      </Card>
      {state.plan && (
        <Text style={styles.small}>
          Last saved: {new Date(state.plan.editedAt).toLocaleString()}
          {changed
            ? "\nYour current changes have not been saved to the plan yet."
            : "\nYour saved plan is up to date."}
        </Text>
      )}
      {message !== "" && (
        <Text
          accessibilityRole="alert"
          style={{
            color: theme.accent,
            backgroundColor: theme.surfaceMuted,
            borderRadius: 12,
            padding: 15,
          }}
        >
          {message}
        </Text>
      )}
      <Button
        title={saving ? "Saving…" : "Save Evacuation Plan"}
        onPress={save}
        disabled={!shelter || saving}
        icon="bookmark-outline"
      />
      <Button title="Edit Plan" href="/prepare/checklist" secondary />
      {shelter && (
        <Button
          title="View Directions"
          href={{ pathname: "/prepare/directions", params: { id: shelter.id } }}
          secondary
        />
      )}
      <Button title="Return Home" href="/" secondary />
    </Screen>
  );
}
