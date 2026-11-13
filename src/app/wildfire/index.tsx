import React from "react";
import { Image, Text, View } from "react-native";
import { Badge, Button, Card, Detail, Icon, Screen } from "../../components/UI";
import { useTheme } from "../../context/ThemeContext";
export default function Nearby() {
<<<<<<< HEAD
  const { styles, theme } = useTheme();
  return (
    <Screen
      title="Wildfire Nearby"
      subtitle="A clearer view of your surroundings."
    >
      <Card>
        <View style={styles.between}>
          <Badge severity="warning" />
          <Text
            style={{ color: theme.danger, fontSize: 12, fontWeight: "600" }}
          >
            ● Active · Simulated
          </Text>
        </View>
        <Icon name="flame-outline" color={theme.warning} size={50} />
        <Text style={styles.title}>Oak Valley Wildfire</Text>
        <Text style={styles.heading}>4.8 miles away</Text>
        <View style={styles.divider} />
        <Detail label="Fire location" value="Eastern Ridge, Oak Valley" />
        <Detail label="Evacuation status" value="Prepare to Evacuate" />
        <Detail label="Scenario update" value="5 minutes ago · 35% contained" />
        <Detail
          label="Nearby affected areas"
          value="Oak Valley · Pine Hollow"
        />
      </Card>
      <Button title="View Map" href="/wildfire/map" icon="map-outline" />
      <Button title="View Live Updates" href="/updates" secondary />
      <Button title="Prepare" href="/prepare/checklist" secondary />
      <Text style={styles.small}>
        All locations, distances, and boundaries are fictional demonstration
        data.
      </Text>
    </Screen>
  );
=======
  return <Screen title="Wildfire Nearby" subtitle="Oak Valley Wildfire · Updated 5 min ago">
    <Image source={require("../../../assets/images/wildfire-hero.png")} resizeMode="cover" style={{height:145,width:"100%",borderRadius:16}}/>
    <Card style={{backgroundColor:"#FFF0E9",borderColor:"#F6DFD3"}}>
      <View style={s.between}><Text style={[s.subheading,{color:c.primary}]}>Oak Valley Wildfire</Text><Icon name="flame" size={27} color={c.primary}/></View>
      <Badge severity="warning"/>
      <Text style={{fontSize:25,fontWeight:"800",color:c.navy}}>4.8 miles from home</Text>
      <Text style={s.body}>Wildfire reported near the eastern ridge. The affected area is under an evacuation warning, not an evacuation order.</Text>
    </Card>
    <Card>
      <Text style={s.heading}>Incident overview</Text>
      <Detail label="Affected area" value="Oak Valley · Pine Hollow"/>
      <Detail label="Evacuation status" value="Zone B — Evacuation Warning"/>
      <Detail label="Containment" value="35%"/>
      <Detail label="Last updated" value="5 minutes ago"/>
    </Card>
    <Button title="View Wildfire Map" href="/wildfire/map" icon="map-outline"/>

  </Screen>;
>>>>>>> origin/main
}
