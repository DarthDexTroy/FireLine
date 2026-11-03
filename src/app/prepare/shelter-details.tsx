import React from "react";
import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { shelters } from "../../data/demo";
import { useApp } from "../../context/AppContext";
import { Button, Card, Detail, Empty, Icon, Screen } from "../../components/UI";
import { styles as s, colors as c } from "../../styles/theme";
export default function ShelterDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const shelter = shelters.find((s) => s.id === id);
  const { dispatch, state } = useApp();
  return (
    <Screen title="Shelter Details">
      {!shelter ? (
        <Empty
          title="Shelter not found"
          detail="Choose a shelter from the demonstration list."
          href="/prepare/shelters"
          button="Browse Shelters"
        />
      ) : (
        <>
          <Card>
            <View
              style={{
                backgroundColor: c.pale,
                height: 110,
                borderRadius: 14,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="school-outline" size={58} />
            </View>
            <Text style={s.title}>{shelter.name}</Text>
            <Text style={s.body}>{shelter.address}</Text>
            <View style={s.divider} />
            <Detail
              label="Distance from scenario home"
              value={`${shelter.distanceMiles} miles · ${shelter.minutes} min`}
            />
            <Detail
              label="Simulated availability"
              value={shelter.availability}
            />
            <Detail
              label="Pet friendly"
              value={
                shelter.petFriendly
                  ? "Yes · Pets welcome"
                  : "No · No pet accommodations"
              }
            />
          </Card>
          <Card>
            <Text style={s.heading}>Facilities</Text>
            {shelter.facilities.map((f) => (
              <View style={s.row} key={f}>
                <Icon name="checkmark-circle-outline" size={20} />
                <Text style={s.body}>{f}</Text>
              </View>
            ))}
          </Card>
          <Button
            title="View Directions"
            href={{
              pathname: "/prepare/directions",
              params: { id: shelter.id },
            }}
            icon="navigate-outline"
          />
          <Button
            title={
              !shelter.available
                ? "Shelter Unavailable"
                : state.shelterId === shelter.id
                  ? "View Selected Shelter in Plan"
                  : "Select Shelter"
            }
            disabled={!shelter.available}
            onPress={() => {
              dispatch({ type: "shelter", id: shelter.id });
              router.push("/prepare/plan");
            }}
            secondary
          />
          <Button title="Back to Shelters" href="/prepare/shelters" secondary />
        </>
      )}
    </Screen>
  );
}
