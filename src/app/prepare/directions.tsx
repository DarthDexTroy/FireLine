import React from "react";
import { Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { shelters } from "../../data/demo";
import { useApp } from "../../context/AppContext";
import { Button, Card, Detail, Empty, Screen } from "../../components/UI";
import { WildfireMap } from "../../components/WildfireMap";
import { styles as s, colors as c } from "../../styles/theme";
export default function Directions() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { state, dispatch } = useApp();
  const shelter = shelters.find((s) => s.id === (id || state.shelterId));
  return (
    <Screen title="Your Route" subtitle="Know your plan before you go.">
      {!shelter ? (
        <Empty
          title="Choose a destination"
          detail="Select a demonstration shelter to see its mock route."
          href="/prepare/shelters"
          button="Find Nearby Shelters"
        />
      ) : (
        <>
          <Card style={{ backgroundColor: "#FFF3E0", borderColor: "#F1D7B3" }}>
            <Text style={{ color: "#89551B", fontWeight: "600", fontSize: 13 }}>
              Simulated route for demonstration only.
            </Text>
            <Text style={s.small}>
              This is not a geographic map or real evacuation guidance.
            </Text>
          </Card>
          <Card>
            <Detail label="From" value={`Home — ${state.location}`} />
            <Detail label="To" value={shelter.name} />
            <Text style={[s.heading, { color: c.green }]}>
              {shelter.minutes} min · {shelter.distanceMiles} miles
            </Text>
          </Card>
          <WildfireMap destination={shelter} preview />
          <Button
            title="Save Selected Shelter"
            disabled={!shelter.available}
            onPress={() => {
              dispatch({ type: "shelter", id: shelter.id });
              router.push("/prepare/plan");
            }}
            icon="bookmark-outline"
          />
          <Button
            title="Back to Shelter Details"
            href={{
              pathname: "/prepare/shelter-details",
              params: { id: shelter.id },
            }}
            secondary
          />
        </>
      )}
    </Screen>
  );
}
