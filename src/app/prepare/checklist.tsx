import React from "react";
import { Pressable, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { categories, checklist } from "../../data/demo";
import { useApp } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";
import { Button, Card, Icon, Progress, Screen } from "../../components/UI";
export default function Checklist() {
  const { category } = useLocalSearchParams<{ category?: string }>();
  const index = Math.max(
    0,
    categories.findIndex((c) => c.id === category),
  );
  const selected = categories[index];
  const { state, dispatch } = useApp();
  const { styles, theme } = useTheme();
  const change = (i: number) =>
    router.setParams({ category: categories[i].id });
  return (
    <Screen title="Your Go Bag" subtitle="Small steps toward being ready.">
      <Progress />
      <View style={{ flexDirection: "row", gap: 7 }}>
        {categories.map((cat, i) => (
          <Pressable
            key={cat.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: i === index }}
            aria-selected={i === index}
            accessibilityLabel={cat.title}
            onPress={() => change(i)}
            style={{
              flex: 1,
              minHeight: 72,
              borderRadius: 14,
              padding: 9,
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              backgroundColor: index === i ? theme.accent : theme.surfaceMuted,
            }}
          >
            <Icon
              name={cat.icon}
              color={index === i ? theme.textOnAccent : theme.accent}
              size={21}
            />
            <Text
              style={{
                fontSize: 11,
                color: index === i ? theme.textOnAccent : theme.accent,
                fontWeight: "600",
              }}
            >
              {["Documents", "Essentials", "Pets"][i]}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={{ gap: 7 }}>
        <Text style={styles.eyebrow}>Step {index + 1} of 3</Text>
        <Text style={styles.heading}>{selected.title}</Text>
        <Text style={styles.body}>{selected.description}</Text>
      </View>
      <Card style={{ padding: 0, overflow: "hidden", gap: 0 }}>
        {checklist
          .filter((i) => i.category === selected.id)
          .map((item, i) => {
            const checked = state.completed.includes(item.id);
            return (
              <Pressable
                key={item.id}
                accessibilityRole="checkbox"
                accessibilityLabel={item.title}
                accessibilityState={{ checked }}
                aria-checked={checked}
                onPress={() => dispatch({ type: "toggle", id: item.id })}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 17,
                  gap: 12,
                  minHeight: 82,
                  backgroundColor: checked
                    ? theme.checklistCompletedBackground
                    : pressed
                      ? theme.background
                      : theme.surface,
                  borderTopWidth: i ? 1 : 0,
                  borderTopColor: theme.border,
                })}
              >
                <View
                  style={{
                    width: 25,
                    height: 25,
                    borderWidth: checked ? 0 : 1.5,
                    borderColor: theme.borderStrong,
                    borderRadius: 7,
                    backgroundColor: checked ? theme.accent : theme.surface,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {checked && (
                    <Icon
                      name="checkmark"
                      color={theme.textOnAccent}
                      size={18}
                    />
                  )}
                </View>
                <View style={{ flex: 1, gap: 5 }}>
                  <Text
                    style={[
                      styles.subheading,
                      {
                        fontSize: 14,
                        color: checked ? theme.accent : theme.text,
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text style={styles.small}>{item.hint}</Text>
                </View>
              </Pressable>
            );
          })}
      </Card>
      <Text style={styles.small}>
        Progress saves automatically on this device.
      </Text>
      <Button
        title={
          index === 2
            ? "Continue to Next Steps"
            : `Continue to ${index === 0 ? "Essential Items" : "Pets"}`
        }
        onPress={() =>
          index === 2 ? router.push("/prepare/next-steps") : change(index + 1)
        }
        icon="arrow-forward"
      />
      {index > 0 && (
        <Button
          title="Previous Category"
          onPress={() => change(index - 1)}
          secondary
        />
      )}
      <Button title="Review Plan" href="/prepare/next-steps" secondary />
    </Screen>
  );
}
