import React from "react";
import { Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { shelters } from "../../data/demo";
import { useApp } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import { Button, Card, Detail, Empty, Screen } from "../../components/UI";
import { WildfireMap } from "../../components/WildfireMap";
export default function Directions() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { state, dispatch } = useApp();
  const { styles, theme } = useTheme();
  const shelter = shelters.find((s) => s.id === (id || state.shelterId));
  return (
    <Screen title="Route Preview" subtitle="Review your destination before leaving.">
      {!shelter ? (
        <Empty title="Choose a destination" detail="Select a shelter to view its route preview." href="/prepare/shelters" button="Find Nearby Shelters" />
      ) : (
        <>
          <Card
            style={{
              backgroundColor: theme.routeNoticeBackground,
              borderColor: theme.routeNoticeBorder,
            }}
          >
            <Text
              style={{
                color: theme.routeNoticeText,
                fontWeight: "600",
                fontSize: 13,
              }}
            >
              Simulated route for demonstration only.
            </Text>
            <Text style={styles.small}>
              This is not a geographic map or real evacuation guidance.
            </Text>
          </Card>
          <Card>
            <Detail label="From" value={`Home — ${state.location}`} />
            <Detail label="To" value={shelter.name} />
            <Text style={[styles.heading, { color: theme.accent }]}>
              {shelter.minutes} min · {shelter.distanceMiles} miles
            </Text>
          </Card>
          <WildfireMap destination={shelter} preview />
          <Card
            style={{
              backgroundColor: theme.routeNoticeBackground,
              borderColor: theme.routeNoticeBorder,
            }}
          >
            <Text style={[styles.small, { color: theme.routeNoticeText }]}>Preview route only. Check official guidance before traveling.</Text>
          </Card>
          <Button
            title={state.shelterId === shelter.id ? "Back to My Plan" : "Choose This Shelter"}
            disabled={!shelter.available}
            onPress={() => { dispatch({ type: "shelter", id: shelter.id }); router.push("/prepare/plan"); }}
          />
        </>
      )}
    </Screen>
  );
}
