import React, { useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { alerts, type DemoAlert } from "../../data/demo";
import { Badge, Icon, Screen } from "../../components/UI";
import { useTheme } from "../../context/ThemeContext";

const sources: Record<string, { label: string; url: string }> = {
  activity: {
    label: "CAL FIRE — Incident Information",
    url: "https://www.fire.ca.gov/incidents",
  },
  evacuation: {
    label: "CAL FIRE — Incident Information",
    url: "https://www.fire.ca.gov/incidents",
  },
  road: {
    label: "Caltrans — Road Conditions",
    url: "https://quickmap.dot.ca.gov/",
  },
  containment: {
    label: "CAL FIRE — Incident Information",
    url: "https://www.fire.ca.gov/incidents",
  },
};
export default function Updates() {
  const { open } = useLocalSearchParams<{ open?: string }>();
  const { styles, theme } = useTheme();
  const [manualSelection, setManualSelection] = useState<DemoAlert | null>(null);
const [dismissedOpen, setDismissedOpen] = useState<string | null>(null);

const selected =
  manualSelection ??
  (open && dismissedOpen !== open
    ? alerts.find((a) => a.id === open) ?? null
    : null);

const setSelected = (alert: DemoAlert | null) => {
  setManualSelection(alert);
  setDismissedOpen(alert === null ? open ?? null : null);
};
  const { width } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);
  const [lastChecked, setLastChecked] = useState("Not checked in this session");

  async function refresh() {
    if (refreshing) return;
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 450));
    setLastChecked(
      `Checked at ${new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })}`,
    );
    setRefreshing(false);
  }

  const modalWidth = Math.min(width - 24, 390);

  return (
    <>
      <Screen
        title="What's Changed"
        subtitle="Latest incident updates for Oak Valley"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={theme.primary}
          />
        }
      >
        <View
          style={{
            backgroundColor: theme.surfaceMuted,
            padding: 15,
            borderRadius: 16,
            gap: 8,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <View style={styles.between}>
            <View style={[styles.row, { flex: 1, gap: 9 }]}> 
              <Icon name="refresh-circle-outline" color={theme.primary} size={24} />
              <View style={{ flex: 1, gap: 3 }}>
                <Text style={[styles.subheading, { fontSize: 16 }]}>Since your last visit</Text>
                <Text style={styles.small}>4 verified-source updates · Newest first</Text>
              </View>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Check updates"
              disabled={refreshing}
              onPress={refresh}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 9,
                borderRadius: 10,
                backgroundColor: theme.surface,
                borderWidth: 1,
                borderColor: theme.border,
                minHeight: 42,
                justifyContent: "center",
              }}
            >
              {refreshing ? (
                <ActivityIndicator color={theme.primary} />
              ) : (
                <Text style={{ color: theme.primary, fontWeight: "700", fontSize: 12 }}>
                  Check
                </Text>
              )}
            </Pressable>
          </View>
          <Text style={styles.small}>{lastChecked}</Text>
        </View>

        <Text style={[styles.heading, { fontSize: 18, marginTop: 3 }]}>Latest changes</Text>

        <View
          style={{
            borderRadius: 16,
            backgroundColor: theme.surface,
            borderWidth: 1,
            borderColor: theme.border,
            overflow: "hidden",
          }}
        >
          {alerts.map((alert, index) => (
            <Pressable
              key={alert.id}
              onPress={() => setSelected(alert)}
              accessibilityRole="button"
              accessibilityLabel={`Read update: ${alert.title}`}
              style={({ pressed }) => ({
                paddingHorizontal: 15,
                paddingVertical: 16,
                backgroundColor: pressed ? theme.background : theme.surface,
                borderTopWidth: index ? 1 : 0,
                borderTopColor: theme.border,
                gap: 7,
              })}
            >
              <View style={styles.between}>
                <Badge severity={alert.severity} />
                <Text style={styles.small}>{alert.time}</Text>
              </View>
              <View style={[styles.row, { gap: 7 }]}> 
                <Text style={[styles.subheading, { fontSize: 16, flex: 1 }]}>{alert.title}</Text>
                <Icon name="chevron-forward" color={theme.iconMuted} size={16} />
              </View>
              <Text style={[styles.body, { fontSize: 13, lineHeight: 19 }]}>{alert.description}</Text>
              <View style={[styles.row, { gap: 5 }]}> 
                <Icon name="shield-checkmark-outline" color={theme.primary} size={13} />
                <Text style={{ fontSize: 11, color: theme.textMuted }}>
                  {sources[alert.id]?.label.split(" — ")[0] || "Official reference"} · Tap to read
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </Screen>

      <Modal
        visible={selected !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelected(null)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(12,27,38,0.50)",
            justifyContent: "center",
            alignItems: "center",
            padding: 12,
          }}
        >
          <Pressable
            style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
            accessibilityLabel="Close update"
            onPress={() => setSelected(null)}
          />
          <View
            style={{
              backgroundColor: theme.surface,
              width: modalWidth,
              borderRadius: 24,
              maxHeight: "82%",
              overflow: "hidden",
              padding: 18,
              gap: 12,
            }}
          >
            <View style={styles.between}>
              <Text style={{ color: theme.textMuted, fontSize: 12, fontWeight: "700" }}>
                INCIDENT UPDATE
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close update"
                onPress={() => setSelected(null)}
                style={{
                  height: 40,
                  width: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                  backgroundColor: theme.background,
                }}
              >
                <Icon name="close" color={theme.text} size={24} />
              </Pressable>
            </View>

            {selected && (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
                <Badge severity={selected.severity} />
                <Text style={[styles.title, { fontSize: 24, lineHeight: 28 }]}>{selected.title}</Text>
                <Text style={styles.small}>{selected.time} · Oak Valley area</Text>
                <Text style={[styles.body, { fontSize: 15, color: theme.text, lineHeight: 23 }]}>
                  {selected.description}
                </Text>
                <View style={{ height: 1, backgroundColor: theme.border }} />
                <Text style={styles.body}>{selected.detail}</Text>
                <View
                  style={{
                    backgroundColor: theme.warningCardBackground,
                    borderRadius: 12,
                    padding: 13,
                    gap: 4,
                    borderWidth: 1,
                    borderColor: theme.warningCardBorder,
                  }}
                >
                  <Text style={{ fontWeight: "700", color: theme.warningCardText, fontSize: 13 }}>
                    What this means
                  </Text>
                  <Text style={{ color: theme.warningCardText, fontSize: 13, lineHeight: 19 }}>
                    {selected.action}
                  </Text>
                </View>
                <Pressable
                  accessibilityRole="link"
                  accessibilityLabel={`Open official reference: ${sources[selected.id]?.label}`}
                  onPress={() => {
                    const src = sources[selected.id];
                    if (src) Linking.openURL(src.url);
                  }}
                  style={{ minHeight: 44, flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Icon name="open-outline" color={theme.primary} size={17} />
                  <Text
                    style={{
                      color: theme.primary,
                      fontWeight: "700",
                      fontSize: 13,
                      textDecorationLine: "underline",
                      flexShrink: 1,
                    }}
                  >
                    {sources[selected.id]?.label || "Official information"}
                  </Text>
                </Pressable>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}
