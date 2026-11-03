import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Button, Card, Icon, Screen } from "../../components/UI";
import { filterShelters } from "../../lib/state";
import { styles as s, colors as c } from "../../styles/theme";
export default function Shelters() {
  const [pet, setPet] = useState(false);
  const [available, setAvailable] = useState(false);
  const [closest, setClosest] = useState(false);
  const results = filterShelters(pet, available, closest);
  const clear = () => {
    setPet(false);
    setAvailable(false);
    setClosest(false);
  };
  return (
    <Screen
      title="Nearby Shelters"
      subtitle="Find a place that fits your household."
    >
      <Text style={s.small}>
        Fictional shelters · Distances from the scenario home
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {[
          {
            label: "All Shelters",
            active: !pet && !available && !closest,
            action: clear,
          },
          { label: "Pet Friendly", active: pet, action: () => setPet(!pet) },
          {
            label: "Closest",
            active: closest,
            action: () => setClosest(!closest),
          },
          {
            label: "Available",
            active: available,
            action: () => setAvailable(!available),
          },
        ].map((f) => (
          <Pressable
            key={f.label}
            accessibilityRole="button"
            accessibilityState={{ selected: f.active }}
            aria-pressed={f.active}
            onPress={f.action}
            style={{
              borderRadius: 30,
              minHeight: 44,
              paddingHorizontal: 16,
              justifyContent: "center",
              backgroundColor: f.active ? c.green : "white",
              borderWidth: 1,
              borderColor: f.active ? c.green : c.border,
            }}
          >
            <Text
              style={{
                color: f.active ? "white" : c.green,
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              {f.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text accessibilityLiveRegion="polite" style={s.small}>
        {results.length} shelters {pet ? "· Pet friendly" : ""}
        {available ? " · Available or limited space" : ""}
        {closest ? " · Nearest first" : ""}
      </Text>
      {results.length === 0 && (
        <Card>
          <Text style={s.heading}>
            No shelters match your selected filters.
          </Text>
          <Button title="Clear Filters" onPress={clear} />
        </Card>
      )}
      {results.map((shelter) => (
        <Card key={shelter.id}>
          <View style={s.between}>
            <View
              style={{ backgroundColor: c.pale, padding: 12, borderRadius: 14 }}
            >
              <Icon name="business-outline" size={26} />
            </View>
            <Text
              style={{
                fontSize: 12,
                color:
                  shelter.availability === "Available" ? c.green : "#936127",
                fontWeight: "600",
              }}
            >
              ● {shelter.availability}
            </Text>
          </View>
          <Text style={s.heading}>{shelter.name}</Text>
          <View style={s.row}>
            <Icon name="location-outline" size={16} />
            <Text style={s.body}>
              {shelter.distanceMiles} miles away · {shelter.minutes} min
            </Text>
          </View>
          <View style={s.row}>
            <Icon name="paw-outline" size={16} />
            <Text style={s.small}>
              {shelter.petFriendly ? "Pet friendly" : "No pet accommodations"}
            </Text>
          </View>
          <Button
            title="View Details"
            href={{
              pathname: "/prepare/shelter-details",
              params: { id: shelter.id },
            }}
            secondary
          />
        </Card>
      ))}
    </Screen>
  );
}
