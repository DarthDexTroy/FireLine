import React, { useMemo, useState } from "react";
import { PanResponder, Pressable, Text, View } from "react-native";
import Svg, { Circle, Path, Rect, Text as SvgText } from "react-native-svg";
import { shelters, type Shelter } from "../data/demo";
import { Icon, IconButton, Button, Badge } from "./UI";
import { useTheme } from "../context/ThemeContext";
export type Marker = "fire" | "home" | "road" | string;
function createMapResponder(
  setOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
) {
  let last = { x: 0, y: 0 };
  return PanResponder.create({
    onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) + Math.abs(g.dy) > 6,
    onPanResponderGrant: () => {
      last = { x: 0, y: 0 };
    },
    onPanResponderMove: (_, g) => {
      const dx = g.dx - last.x;
      const dy = g.dy - last.y;
      last = { x: g.dx, y: g.dy };
      setOffset((o) => ({
        x: Math.max(-240, Math.min(240, o.x + dx)),
        y: Math.max(-240, Math.min(240, o.y + dy)),
      }));
    },
  });
}
export function WildfireMap({
  destination,
  preview = false,
}: {
  destination?: Shelter;
  preview?: boolean;
}) {
  const { styles, theme } = useTheme();
  const [zoom, setZoom] = useState(0.8);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selected, setSelected] = useState<Marker | null>(null);
  const [width, setWidth] = useState(342);
  const pan = useMemo(() => createMapResponder(setOffset), []);
  const shelter = shelters.find((s) => s.id === selected);
  const markers = [
    {
      id: "home",
      x: 270,
      y: 315,
      icon: "home" as const,
      color: "#3C7995",
      label: "Saved home",
    },
    {
      id: "fire",
      x: 430,
      y: 210,
      icon: "flame" as const,
      color: theme.danger,
      label: "Oak Valley Wildfire",
    },
    {
      id: "road",
      x: 388,
      y: 315,
      icon: "warning" as const,
      color: "#BA7728",
      label: "Oak Valley Road closure",
    },
    ...shelters.map((s) => ({
      id: s.id,
      x: s.x,
      y: s.y,
      icon: "business" as const,
      color: s.available ? theme.accent : "#78847F",
      label: s.name,
    })),
  ];
  const height = preview ? 285 : 380;
  return (
    <View style={{ gap: 12 }}>
      <View
        testID="interactive-map"
        accessibilityLabel="Simulated interactive map. Drag to pan or use the arrow controls."
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        style={{
          height,
          borderRadius: 20,
          overflow: "hidden",
          backgroundColor: theme.mode === "dark" ? "#2A3B40" : "#E8EDE2",
          borderWidth: 1,
          borderColor: theme.border,
        }}
      >
        <View {...pan.panHandlers} style={{ position: "absolute", inset: 0 }}>
          <View
            style={{
              position: "absolute",
              left: width / 2 - 300 + offset.x,
              top: height / 2 - 300 + offset.y,
              width: 600,
              height: 600,
              transform: [{ scale: zoom }],
            }}
          >
            <Svg width={600} height={600} viewBox="0 0 600 600">
              <Rect width="600" height="600" fill="#E8EDE2" />
              <Path d="M0 0H600V100Q430 70 330 160T50 170Z" fill="#D0DEC8" />
              <Path d="M440 0Q380 140 490 260T600 580V0Z" fill="#CDDDC5" />
              <Path d="M0 440Q180 380 220 600H0Z" fill="#D4E2CB" />
              {[50, 90, 130, 175, 225, 275, 325, 375, 425, 475, 525].map(
                (n, i) => (
                  <Path
                    key={n}
                    d={`M${n} 0 Q${n - 80} 180 ${n + 20} 260 T${n + 30} 600`}
                    stroke="#C5D6BD"
                    strokeWidth="1"
                    fill="none"
                  />
                ),
              )}
              <Path
                d="M-30 500Q180 490 210 420T370 390T620 410"
                stroke="#B7D3D9"
                strokeWidth="22"
                fill="none"
              />
              <Path
                d="M0 325H600M270 0V600M100 0V600M0 165H600M0 440H600M385 0V600"
                stroke="#D2D8CB"
                strokeWidth="18"
                fill="none"
              />
              <Path
                d="M0 325H600M270 0V600M100 0V600M0 165H600M0 440H600M385 0V600"
                stroke="#FCFCF5"
                strokeWidth="13"
                fill="none"
              />
              <Path
                d="M300 50L560 70L580 350L390 390L305 270Z"
                fill="#F4C95D"
                fillOpacity="0.22"
                stroke="#CAB04B"
                strokeDasharray="5 5"
                strokeWidth="2"
              />
              <Path
                d="M365 100L530 110L550 305L395 335L350 220Z"
                fill="#F29F38"
                fillOpacity="0.23"
                stroke="#D99139"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              <Path
                d="M410 145L490 150L515 245L440 280L395 230Z"
                fill="#D64545"
                fillOpacity="0.28"
                stroke="#D64545"
                strokeWidth="2"
              />
              <SvgText
                x="140"
                y="280"
                fill="#82947B"
                fontSize="11"
                letterSpacing="2"
              >
                OAK VALLEY
              </SvgText>
              <SvgText
                x="350"
                y="75"
                fill="#82947B"
                fontSize="10"
                letterSpacing="2"
              >
                EASTERN RIDGE
              </SvgText>
              <SvgText x="130" y="150" fill="#929A89" fontSize="9">
                Meadow Avenue
              </SvgText>
              <SvgText x="300" y="345" fill="#929A89" fontSize="9">
                Oak Valley Road
              </SvgText>
              <SvgText x="335" y="465" fill="#81A4AE" fontSize="10">
                Valley Creek
              </SvgText>
              {destination && (
                <>
                  <Path
                    d={`M270 315 L270 375 L${destination.x} 375 L${destination.x} ${destination.y}`}
                    stroke="white"
                    strokeWidth="11"
                    fill="none"
                  />
                  <Path
                    d={`M270 315 L270 375 L${destination.x} 375 L${destination.x} ${destination.y}`}
                    stroke={theme.accent}
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="9 5"
                  />
                  <Circle
                    cx="270"
                    cy="315"
                    r="7"
                    fill="white"
                    stroke={theme.accent}
                    strokeWidth="3"
                  />
                </>
              )}
            </Svg>
            {markers.map((m) => (
              <Pressable
                key={m.id}
                accessibilityRole="button"
                accessibilityLabel={`Map marker: ${m.label}`}
                onPress={() => setSelected(m.id)}
                style={({ pressed }) => ({
                  position: "absolute",
                  left: m.x - 22,
                  top: m.y - 22,
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  borderWidth: selected === m.id ? 4 : 3,
                  borderColor: "white",
                  backgroundColor: m.color,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: pressed ? 0.7 : 1,
                  boxShadow: "0 3px 8px #142B3B26",
                })}
              >
                <Icon name={m.icon} color="white" size={22} />
              </Pressable>
            ))}
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            left: 12,
            top: 12,
            backgroundColor: theme.surfaceElevated,
            borderRadius: 8,
            padding: 8,
          }}
        >
          <Text
            style={{
              color: theme.accent,
              fontSize: 10,
              fontWeight: "700",
              letterSpacing: 1,
            }}
          >
            FICTIONAL MAP
          </Text>
        </View>
        <View style={{ position: "absolute", right: 10, top: 10, gap: 6 }}>
          <IconButton
            name="add"
            label="Zoom in"
            onPress={() => setZoom((z) => Math.min(1.6, z + 0.2))}
          />
          <IconButton
            name="remove"
            label="Zoom out"
            onPress={() => setZoom((z) => Math.max(0.6, z - 0.2))}
          />
          <IconButton
            name="locate-outline"
            label="Recenter map"
            onPress={() => {
              setOffset({ x: 0, y: 0 });
              setZoom(0.8);
            }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            flexDirection: "row",
            gap: 4,
          }}
        >
          <IconButton
            name="arrow-back"
            label="Pan west"
            onPress={() =>
              setOffset((o) => ({ ...o, x: Math.min(240, o.x + 50) }))
            }
          />
          <IconButton
            name="arrow-up"
            label="Pan north"
            onPress={() =>
              setOffset((o) => ({ ...o, y: Math.min(240, o.y + 50) }))
            }
          />
          <IconButton
            name="arrow-down"
            label="Pan south"
            onPress={() =>
              setOffset((o) => ({ ...o, y: Math.max(-240, o.y - 50) }))
            }
          />
          <IconButton
            name="arrow-forward"
            label="Pan east"
            onPress={() =>
              setOffset((o) => ({ ...o, x: Math.max(-240, o.x - 50) }))
            }
          />
        </View>
        <Text
          style={{
            position: "absolute",
            bottom: 20,
            right: 14,
            color: theme.accent,
            fontSize: 11,
          }}
        >
          {Math.round(zoom * 100)}%
        </Text>
      </View>
      {!preview && (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
          {[
            ["#D64545", "Order"],
            ["#F29F38", "Warning"],
            ["#F4C95D", "Advisory"],
          ].map(([color, text]) => (
            <View key={text} style={[styles.row, { gap: 5 }]}>
              <View
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 2,
                  backgroundColor: color,
                }}
              />
              <Text style={styles.small}>{text} zone</Text>
            </View>
          ))}
        </View>
      )}
      {selected && (
        <View style={[styles.card, { borderColor: theme.selectedBorder }]}>
          <View style={styles.between}>
            <Text style={[styles.heading, { flex: 1 }]}>
              {selected === "fire"
                ? "Oak Valley Wildfire"
                : selected === "home"
                  ? "Your saved home"
                  : selected === "road"
                    ? "Road closure"
                    : shelter?.name}
            </Text>
            <IconButton
              name="close"
              label="Close marker details"
              onPress={() => setSelected(null)}
            />
          </View>
          {selected === "fire" ? (
            <>
              <Badge severity="warning" />
              <Text style={styles.body}>
                4.8 miles away · Active{"\n"}Evacuation level: Warning{"\n"}
                Updated 5 minutes ago.
              </Text>
              <Button title="View Alert" href="/updates/evacuation" />
              <Button title="Prepare" href="/prepare/checklist" secondary />
            </>
          ) : shelter ? (
            <>
              <Text style={styles.body}>
                {shelter.distanceMiles} miles · {shelter.availability} ·{" "}
                {shelter.petFriendly ? "Pets welcome" : "No pet facilities"}
              </Text>
              <Button
                title="View Shelter Details"
                href={{
                  pathname: "/prepare/shelter-details",
                  params: { id: shelter.id },
                }}
              />
            </>
          ) : selected === "home" ? (
            <>
              <Text style={styles.body}>
                Your home is in Zone B · Evacuation Warning. Prepare essential items and monitor official instructions.
              </Text>
              <Button
                title="View Area Status"
                href="/prepare/status"
                secondary
              />
            </>
          ) : (
            <>
              <Text style={styles.body}>
                Oak Valley Road is closed in this scenario. Do not use this map
                for real travel.
              </Text>
              <Button
                title="View Closure Alert"
                href="/updates/road"
                secondary
              />
            </>
          )}
        </View>
      )}
    </View>
  );
}
