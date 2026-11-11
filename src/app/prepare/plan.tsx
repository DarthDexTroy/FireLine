import React, { useState } from "react";
import { Platform, Pressable, Share, Text, View } from "react-native";
import { shelters } from "../../data/demo";
import { useApp } from "../../context/AppContext";
import { reducer } from "../../lib/state";
import {
  Badge,
  Button,
  Card,
  Detail,
  Icon,
  Screen,
} from "../../components/UI";
import { styles as s, colors as c } from "../../styles/theme";

export default function Plan() {
  const { state, dispatch, persist } = useApp();
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
        <View style={{ alignItems: "center", gap: 10 }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: "#E6F6EE", alignItems: "center", justifyContent: "center" }}>
            <Icon name="shield-checkmark-outline" size={38} color="#1F8A5C" />
          </View>
          <Text style={[s.heading, { fontSize: 18 }]}>Plan Ready</Text>
          <Text style={[s.small, { textAlign: "center" }]}>{state.completed.length} optional checklist items marked packed</Text>
          <Badge severity="warning" />
        </View>
      </Card>

      <Card>
        <Detail
          label="Selected shelter"
          value={shelter?.name || "No shelter selected yet"}
        />
        {shelter ? (
          <>
            <View style={s.divider} />
            <Detail label="Route" value={`Home → ${shelter.name}`} />
            <Detail label="Starting location" value={state.location} />
            <Text style={s.small}>
              {shelter.distanceMiles} miles · About {shelter.minutes} minutes
            </Text>
          </>
        ) : (
          <Button title="Choose a Shelter" href="/prepare/shelters" />
        )}
      </Card>

      {state.plan && (
        <Text style={s.small}>
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
            color: c.green,
            backgroundColor: c.pale,
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
