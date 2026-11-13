import React from "react";
import { Pressable, Text, View } from "react-native";
import { locations } from "../../data/demo";
import { useApp } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import { Card, Icon, Screen } from "../../components/UI";
export default function Location() {
  const { state, dispatch } = useApp();
  const { styles, theme } = useTheme();
  return (
    <Screen title="Saved Location" subtitle="Choose a fictional home location.">
      <Card>
        <Text style={styles.body}>
          Locations personalize your demo labels and notification center. The
          map, incident, and distances stay in the same fictional Oak Valley
          scenario. No GPS is used.
        </Text>
      </Card>
      {locations.map((location) => (
        <Pressable
          key={location}
          accessibilityRole="radio"
          accessibilityLabel={location}
          accessibilityState={{ checked: state.location === location }}
          aria-checked={state.location === location}
          onPress={() => dispatch({ type: "location", location })}
          style={[
            styles.card,
            styles.row,
            {
              backgroundColor:
                state.location === location
                  ? theme.surfaceMuted
                  : theme.surface,
            },
          ]}
        >
          <Icon name="location-outline" />
          <View style={{ flex: 1 }}>
            <Text style={styles.subheading}>{location}</Text>
            <Text style={styles.small}>Demonstration location</Text>
          </View>
          <Icon
            name={
              state.location === location
                ? "checkmark-circle"
                : "ellipse-outline"
            }
          />
        </Pressable>
      ))}
    </Screen>
  );
}
