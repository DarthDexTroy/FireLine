import React, { useState } from "react";
import { Platform, Pressable, Share, Text, View } from "react-native";
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

  async function sharePlan() {
    if (!shelter) return;
    const message = `Fireline evacuation plan\nCurrent status: Evacuation Warning — Zone B\nDestination: ${shelter.name}\nStarting location: ${state.location}\nCheck official instructions and current shelter availability before leaving.`;
    try {
      if (Platform.OS === "web" && typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(message);
        setMessage("Plan details copied. You can paste them into a message to your family.");
      } else {
        await Share.share({message});
      }
    } catch {
      setMessage("Sharing was not available. You can still review your plan here.");
    }
  }

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

  async function removeSavedPlan() {
    const next = reducer(state, { type: "unsave" });
    dispatch({ type: "unsave" });
    await persist(next);
    setMessage("Saved plan removed from this device.");
  }

  return (
    <Screen title="My Evacuation Plan" subtitle="Your checklist and selected destination.">
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
            <View style={styles.divider} />
            <Detail label="Route" value={`Home → ${shelter.name}`} />
            <Detail label="Starting location" value={state.location} />
            <Text style={styles.small}>
              {shelter.distanceMiles} miles · About {shelter.minutes} minutes ·
              Simulated
            </Text>
          </>
        ) : (
          <Button title="Choose a Shelter" href="/prepare/shelters" />
        )}
      </Card>

      {state.plan && (
        <Text style={styles.small}>
          Last saved: {new Date(state.plan.editedAt).toLocaleString()}
          {changed
            ? "\nYour current changes have not been saved yet."
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

      {(!state.plan || changed) && (
        <Button
          title={saving ? "Saving…" : "Save Evacuation Plan"}
          onPress={save}
          disabled={!shelter || saving}
          icon="bookmark-outline"
        />
      )}

      <Button title="Edit Plan" href="/prepare/checklist" secondary icon="create-outline" />

      {state.plan && !changed && shelter ? (
        <Button title="Share with Family" icon="share-social-outline" onPress={sharePlan} />
      ) : null}

      {state.plan ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Remove saved plan"
          onPress={removeSavedPlan}
          style={{ minHeight: 44, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: "#A84A34", fontWeight: "700", fontSize: 13 }}>Remove Saved Plan</Text>
        </Pressable>
      ) : null}
    </Screen>
  );
}
