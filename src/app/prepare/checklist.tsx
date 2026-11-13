import React from "react";
import { Pressable, Text, View } from "react-native";
import { categories, checklist } from "../../data/demo";
import { useApp } from "../../context/AppContext";
import { Button, Card, Icon, Screen } from "../../components/UI";
import { styles as s, colors as c } from "../../styles/theme";
export default function Checklist() {
  const { state, dispatch } = useApp();
  return (
    <Screen title="Prepare" subtitle="Household checklist">
      <Text style={[s.small,{fontWeight:"600"}]}>{state.completed.length} of {checklist.length} items marked packed · Optional checklist</Text>
      <Text style={s.small}>Tap any item to mark it packed. Items are optional; you can find a shelter at any time.</Text>
      {categories.map((category) => {
        const items = checklist.filter((item) => item.category === category.id);
        const count = items.filter((item) => state.completed.includes(item.id)).length;
        return (
          <Card key={category.id} style={{ padding: 0, overflow: "hidden", gap: 0 }}>
            <View style={{ padding: 16, backgroundColor: c.pale, gap: 4 }}>
              <View style={s.row}>
                <Icon name={category.icon} color={c.green} size={20} />
                <Text style={[s.subheading, { flex: 1 }]}>{category.title}</Text>
                <Text style={s.small}>{count}/{items.length}</Text>
              </View>
              <Text style={s.small}>{category.description}</Text>
            </View>
            {items.map((item, index) => {
              const checked = state.completed.includes(item.id);
              return (
                <Pressable
                  key={item.id}
                  accessibilityRole="checkbox"
                  accessibilityLabel={item.title}
                  accessibilityState={{ checked }}
                  onPress={() => dispatch({ type: "toggle", id: item.id })}
                  style={({ pressed }) => ({
                    flexDirection: "row", alignItems: "center", padding: 14, minHeight: 68, gap: 12,
                    borderTopWidth: index ? 1 : 0, borderTopColor: c.border,
                    backgroundColor: checked ? "#F0F7F1" : pressed ? "#F5F7F8" : "white",
                  })}
                >
                  <View style={{ width: 24, height: 24, borderRadius: 6, borderWidth: checked ? 0 : 1.5, borderColor: c.muted, backgroundColor: checked ? c.green : "white", justifyContent: "center", alignItems: "center" }}>
                    {checked ? <Icon name="checkmark" color="white" size={17} /> : null}
                  </View>
                  <View style={{ flex: 1, gap: 3 }}>
                    <Text style={s.subheading}>{item.title}</Text>
                    <Text style={s.small}>{item.hint}</Text>
                  </View>
                </Pressable>
              );
            })}
          </Card>
        );
      })}
      <Text style={s.small}>You can continue even if not every item is checked.</Text>
      <Button title="Next Step: Find Shelters" href="/prepare/shelters" />
    </Screen>
  );
}
