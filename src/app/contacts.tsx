import React, { useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import { Button, Card, Icon, Screen, type IconName } from "../components/UI";
import { useTheme } from "../context/ThemeContext";

interface Contact {
  id: string;
  name: string;
  number: string;
  dial: string;
  description: string;
  icon: IconName;
}

// Demo contacts only. 911 is real; every other number is fictional and
// must be replaced with local numbers before this screen is relied on.
const contacts: Contact[] = [
  {
    id: "emergency",
    name: "Emergency Services",
    number: "911",
    dial: "911",
    description: "Fire, medical emergency, or immediate danger.",
    icon: "call",
  },
  {
    id: "cal-fire",
    name: "CAL FIRE Information",
    number: "(555) 010-2200",
    dial: "5550102200",
    description: "Fire status, containment, and evacuation information.",
    icon: "flame",
  },
  {
    id: "county",
    name: "County Emergency Services",
    number: "(555) 010-3300",
    dial: "5550103300",
    description: "Evacuation orders, road closures, and shelter updates.",
    icon: "shield-checkmark",
  },
  {
    id: "shelter",
    name: "Shelter Information",
    number: "(555) 010-4400",
    dial: "5550104400",
    description: "Open shelters, space, and accessibility help.",
    icon: "business",
  },
  {
    id: "health",
    name: "Smoke and Health Line",
    number: "(555) 010-5500",
    dial: "5550105500",
    description: "Non-emergency health questions during smoke events.",
    icon: "medkit",
  },
];

export default function EmergencyContacts() {
  const { styles: s, theme } = useTheme();
  const [message, setMessage] = useState("");

  async function callContact(contact: Contact) {
    const url = `tel:${contact.dial}`;
    const supported = await Linking.canOpenURL(url);
    if (!supported) {
      setMessage(
        `Calling is not available on this device. Dial ${contact.number} from a phone.`,
      );
      return;
    }
    setMessage("");
    await Linking.openURL(url);
  }

  return (
    <Screen title="Emergency Contacts" subtitle="Tap Call to reach help fast.">
      <Card style={{ borderColor: theme.danger }}>
        <View style={s.row}>
          <Icon name="warning" color={theme.danger} size={24} />
          <Text style={[s.subheading, { color: theme.danger, flex: 1 }]}>
            In immediate danger? Call 911 first.
          </Text>
        </View>
        <Button
          title="Call 911"
          icon="call"
          onPress={() => callContact(contacts[0])}
        />
      </Card>

      {message ? (
        <View
          style={{
            backgroundColor: theme.surfaceMuted,
            borderRadius: 12,
            padding: 12,
          }}
        >
          <Text
            style={{ color: theme.accent, fontSize: 12, fontWeight: "700" }}
          >
            {message}
          </Text>
        </View>
      ) : null}

      {contacts.slice(1).map((contact) => (
        <Card key={contact.id}>
          <View style={s.row}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: theme.surfaceMuted,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name={contact.icon} color={theme.accent} size={24} />
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={s.subheading}>{contact.name}</Text>
              <Text style={s.small}>{contact.description}</Text>
            </View>
          </View>
          <View style={[s.between, { marginTop: 2 }]}>
            <Text
              style={{ fontSize: 18, fontWeight: "800", color: theme.text }}
            >
              {contact.number}
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Call ${contact.name}, ${contact.number}`}
              onPress={() => callContact(contact)}
              style={({ pressed }) => ({
                minHeight: 44,
                paddingHorizontal: 18,
                borderRadius: 12,
                backgroundColor: theme.primary,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 6,
                opacity: pressed ? 0.75 : 1,
              })}
            >
              <Icon name="call" color={theme.textOnPrimary} size={17} />
              <Text
                style={{
                  color: theme.textOnPrimary,
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >
                Call
              </Text>
            </Pressable>
          </View>
        </Card>
      ))}

  
    </Screen>
  );
}
