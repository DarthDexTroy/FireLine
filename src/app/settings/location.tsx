
import React from "react";
import { Pressable, Text, View } from "react-native";
import { locations } from "../../data/demo";
import { useApp } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import { Card, Icon, Screen } from "../../components/UI";

export default function Location() {
  const { state, dispatch } = useApp();
  const { styles: s, theme } = useTheme();

  return (
    <Screen
      title="Saved Location"
      subtitle="Choose a fictional home location."
    >
      <Card>
        <Text style={s.body}>
          Locations personalize your demo labels and
          notification center. The map, incident, and
          distances stay in the same fictional Oak Valley
          scenario. No GPS is used.
        </Text>
      </Card>

      {locations.map((location) => {
        const selected = state.location === location;

        return (
          <Pressable
            key={location}
            accessibilityRole="radio"
            accessibilityLabel={location}
            accessibilityState={{ checked: selected }}
            aria-checked={selected}
            onPress={() =>
              dispatch({ type: "location", location })
            }
            style={[
              s.card,
              s.row,
              {
                backgroundColor: selected
                  ? theme.surfaceMuted
                  : theme.surface,
                borderColor: selected
                  ? theme.selectedBorder
                  : theme.border,
              },
            ]}
          >
            <Icon
              name="location-outline"
              color={theme.textSecondary}
            />

            <View style={{ flex: 1 }}>
              <Text style={s.subheading}>
                {location}
              </Text>

              <Text style={s.small}>
                Demonstration location
              </Text>
            </View>

            <Icon
              name={
                selected
                  ? "checkmark-circle"
                  : "ellipse-outline"
              }
              color={
                selected
                  ? theme.text
                  : theme.textSecondary
              }
            />
          </Pressable>
        );
      })}
    </Screen>
  );
}
