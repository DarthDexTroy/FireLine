import React from "react";
import { Text } from "react-native";
import { useApp } from "../../context/AppContext";
<<<<<<< HEAD
import { useTheme } from "../../context/ThemeContext";
import {
  Button,
  Card,
  Icon,
  Progress,
  Screen,
  Warning,
} from "../../components/UI";
=======
import { Button, Card, Screen, Warning } from "../../components/UI";
import { styles as s } from "../../styles/theme";

// Keep this screen for existing deep links, but remove competing category actions.
// The tab bar opens the checklist directly.
>>>>>>> origin/main
export default function Prepare() {
  const { state } = useApp();
  const { styles } = useTheme();
  return (
    <Screen title="Prepare for Evacuation" subtitle="Your next steps, in one place.">
      <Warning />
      <Card>
        <Text style={s.heading}>Household checklist</Text>
        <Text style={s.small}>{state.completed.length} items marked packed · Checklist is optional</Text>
        <Text style={s.body}>Review documents, essential items and pet supplies. You can continue without completing every item.</Text>
        <Button title="Open Checklist" href="/prepare/checklist" icon="checkbox-outline" />
      </Card>
<<<<<<< HEAD
      {categories.map((cat) => (
        <Card key={cat.id}>
          <View style={styles.row}>
            <Icon name={cat.icon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.subheading}>{cat.title}</Text>
              <Text style={styles.small}>
                {
                  checklist.filter(
                    (i) =>
                      i.category === cat.id && state.completed.includes(i.id),
                  ).length
                }{" "}
                of {checklist.filter((i) => i.category === cat.id).length}{" "}
                packed
              </Text>
            </View>
          </View>
          <Button
            title={`Review ${cat.title}`}
            href={{
              pathname: "/prepare/checklist",
              params: { category: cat.id },
            }}
            secondary
          />
        </Card>
      ))}
=======
>>>>>>> origin/main
      <Button title="Find Nearby Shelters" href="/prepare/shelters" secondary />
      {state.shelterId ? <Button title="View My Evacuation Plan" href="/prepare/plan" secondary /> : null}
    </Screen>
  );
}
