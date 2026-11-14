import React from "react";
import { Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { shelters } from "../../data/demo";
import { useApp } from "../../context/AppContext";
import { Button, Card, Detail, Empty, Screen } from "../../components/UI";
import { WildfireMap } from "../../components/WildfireMap";
import { styles as s } from "../../styles/theme";
export default function Directions() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { state, dispatch } = useApp();
  const shelter = shelters.find((item) => item.id === (id || state.shelterId));
  return (
    <Screen title="Route Preview" subtitle="Review your destination before leaving.">
      {!shelter ? (
        <Empty title="Choose a destination" detail="Select a shelter to view its route preview." href="/prepare/shelters" button="Find Nearby Shelters" />
      ) : (
        <>
          <Card>
            <Detail label="From" value={`Home — ${state.location}`} />
            <Detail label="To" value={shelter.name} />
            <Text style={s.heading}>{shelter.distanceMiles} miles · About {shelter.minutes} min</Text>
          </Card>
          <WildfireMap destination={shelter} preview />
          <Card style={{ backgroundColor: "#FFF3E0", borderColor: "#F1D7B3" }}>
            <Text style={s.small}>Preview route only. Check official guidance before traveling.</Text>
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
