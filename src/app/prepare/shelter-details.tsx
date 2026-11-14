
import React from "react";
import { Image, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { shelters } from "../../data/demo";
import { useApp } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import {
  Button,
  Card,
  Detail,
  Empty,
  Icon,
  Screen,
} from "../../components/UI";

const shelterImages = {
  school: require("../../../assets/images/shelter-school.png"),
  community: require("../../../assets/images/shelter-community.png"),
  recreation: require("../../../assets/images/shelter-recreation.png"),
  library: require("../../../assets/images/shelter-library.png"),
} as const;

export default function ShelterDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const shelter = shelters.find((s) => s.id === id);
  const { dispatch, state } = useApp();
  const { styles: s, theme } = useTheme();

  return (
    <Screen title="Shelter Details">
      {!shelter ? (
        <Empty
          title="Shelter not found"
          detail="Choose a shelter from the list."
          href="/prepare/shelters"
          button="Browse Shelters"
        />
      ) : (
        <>
          <Card>
            <Image
              source={
                shelterImages[
                  shelter.id as keyof typeof shelterImages
                ]
              }
              resizeMode="cover"
              style={{
                width: "100%",
                height: 174,
                borderRadius: 13,
              }}
            />

            <Text style={s.title}>{shelter.name}</Text>

            <Text style={s.body}>{shelter.address}</Text>

            <Text
              style={{
                color: shelter.available
                  ? theme.accent
                  : theme.danger,
                fontWeight: "700",
              }}
            >
              {shelter.availability}
            </Text>

            <View style={s.divider} />

            <Detail
              label="Distance"
              value={`${shelter.distanceMiles} miles · About ${shelter.minutes} min`}
            />

            <Detail
              label="Pets"
              value={
                shelter.petFriendly
                  ? "Accepted"
                  : "Not accommodated"
              }
            />
          </Card>

          <Card>
            <Text style={s.heading}>Route preview</Text>

            <Text style={s.body}>
              Review the map route to this shelter before
              adding it to your plan.
            </Text>

            <Button
              title="Preview Route"
              href={{
                pathname: "/prepare/directions",
                params: { id: shelter.id },
              }}
              secondary
              icon="map-outline"
            />
          </Card>

          <Card>
            <Text style={s.heading}>Amenities</Text>

            {shelter.facilities.map((facility) => (
              <View style={s.row} key={facility}>
                <Icon
                  name="checkmark-circle-outline"
                  size={18}
                />
                <Text style={s.body}>{facility}</Text>
              </View>
            ))}
          </Card>

          {!shelter.available && (
            <Text
              style={{
                color: theme.danger,
                fontWeight: "600",
              }}
            >
              This shelter is unavailable. Choose another shelter.
            </Text>
          )}

          <Button
            title={
              state.shelterId === shelter.id
                ? "Review My Plan"
                : "Choose This Shelter"
            }
            disabled={!shelter.available}
            onPress={() => {
              dispatch({
                type: "shelter",
                id: shelter.id,
              });
              router.push("/prepare/plan");
            }}
            icon="checkmark-circle-outline"
          />
        </>
      )}
    </Screen>
  );
}
