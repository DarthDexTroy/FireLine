import React from "react";
import { Text, View } from "react-native";
import { categories, checklist } from "../../data/demo";
import { useApp } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import { Button, Card, Icon, Progress, Screen } from "../../components/UI";
export default function NextSteps() {
  const { state } = useApp();
  const { styles } = useTheme();
  return (
    <Screen title="Next Steps" subtitle="Give your plan a destination.">
      <Card>
        <Icon name="compass-outline" size={40} />
        <Text style={styles.heading}>You’re making progress.</Text>
        <Text style={styles.body}>
          Review nearby shelters and create your evacuation plan. You can return
          to your checklist at any time.
        </Text>
        <Progress />
      </Card>
      <Card>
        {categories.map((cat) => (
          <View key={cat.id} style={styles.between}>
            <Text style={styles.subheading}>{cat.title}</Text>
            <Text style={styles.body}>
              {
                checklist.filter(
                  (i) =>
                    i.category === cat.id && state.completed.includes(i.id),
                ).length
              }
              /{checklist.filter((i) => i.category === cat.id).length}
            </Text>
          </View>
        ))}
      </Card>
      <Button
        title="Find Nearby Shelters"
        href="/prepare/shelters"
        icon="business-outline"
      />
      <Button title="Review Checklist" href="/prepare/checklist" secondary />
      <Button title="View My Plan" href="/prepare/plan" secondary />
    </Screen>
  );
}
