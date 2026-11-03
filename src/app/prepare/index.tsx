import React from "react";
import { Text, View } from "react-native";
import { categories, checklist } from "../../data/demo";
import { useApp } from "../../context/AppContext";
import {
  Button,
  Card,
  Icon,
  Progress,
  Screen,
  Warning,
} from "../../components/UI";
import { styles as s } from "../../styles/theme";
export default function Prepare() {
  const { state } = useApp();
  return (
    <Screen
      title="Prepare for Evacuation"
      subtitle="A plan today. Peace of mind tomorrow."
    >
      <Warning />
      <Card>
        <Progress />
        <Button
          title="Start Preparing"
          href="/prepare/checklist"
          icon="bag-handle-outline"
        />
      </Card>
      {categories.map((cat) => (
        <Card key={cat.id}>
          <View style={s.row}>
            <Icon name={cat.icon} />
            <View style={{ flex: 1 }}>
              <Text style={s.subheading}>{cat.title}</Text>
              <Text style={s.small}>
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
      <Button title="Find Nearby Shelters" href="/prepare/shelters" secondary />
      <Button title="My Evacuation Plan" href="/prepare/plan" secondary />
    </Screen>
  );
}
