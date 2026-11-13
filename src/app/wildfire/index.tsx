import React from "react";
import { Image, Text, View } from "react-native";
import { Badge, Button, Card, Detail, Icon, Screen } from "../../components/UI";
import { useTheme } from "../../context/ThemeContext";
export default function Nearby() {
  const { styles, theme } = useTheme();
  return (
    <Screen title="Wildfire Nearby" subtitle="Oak Valley Wildfire · Updated 5 min ago">
      <Image
        source={require("../../../assets/images/wildfire-hero.png")}
        resizeMode="cover"
        style={{ height: 145, width: "100%", borderRadius: 16 }}
      />
      <Card
        style={{
          backgroundColor: theme.warningCardBackground,
          borderColor: theme.warningCardBorder,
        }}
      >
        <View style={styles.between}>
          <Text style={[styles.subheading, { color: theme.primary }]}>Oak Valley Wildfire</Text>
          <Icon name="flame" size={27} color={theme.primary} />
        </View>
        <Badge severity="warning" />
        <Text style={[styles.title, { fontSize: 25 }]}>4.8 miles from home</Text>
        <Text style={styles.body}>
          Wildfire reported near the eastern ridge. The affected area is under an
          evacuation warning, not an evacuation order.
        </Text>
      </Card>
      <Card>
        <Text style={styles.heading}>Incident overview</Text>
        <Detail label="Affected area" value="Oak Valley · Pine Hollow" />
        <Detail label="Evacuation status" value="Zone B — Evacuation Warning" />
        <Detail label="Containment" value="35%" />
        <Detail label="Last updated" value="5 minutes ago" />
      </Card>
      <Button title="View Wildfire Map" href="/wildfire/map" icon="map-outline" />
      <Button title="View Live Updates" href="/updates" secondary />
      <Button title="Prepare" href="/prepare/checklist" secondary />
    </Screen>
  );
}
