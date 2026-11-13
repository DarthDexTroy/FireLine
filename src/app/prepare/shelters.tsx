<<<<<<< HEAD
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Button, Card, Icon, Screen } from "../../components/UI";
import { filterShelters } from "../../lib/state";
import { useTheme } from "../../context/ThemeContext";
export default function Shelters() {
  const [pet, setPet] = useState(false);
  const [available, setAvailable] = useState(false);
  const [closest, setClosest] = useState(false);
  const { styles, theme } = useTheme();
  const results = filterShelters(pet, available, closest);
  const clear = () => {
    setPet(false);
    setAvailable(false);
    setClosest(false);
  };
  return (
    <Screen
      title="Nearby Shelters"
      subtitle="Find a place that fits your household."
    >
      <Text style={styles.small}>
        Fictional shelters · Distances from the scenario home
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {[
          {
            label: "All Shelters",
            active: !pet && !available && !closest,
            action: clear,
          },
          { label: "Pet Friendly", active: pet, action: () => setPet(!pet) },
          {
            label: "Closest",
            active: closest,
            action: () => setClosest(!closest),
          },
          {
            label: "Available",
            active: available,
            action: () => setAvailable(!available),
          },
        ].map((f) => (
          <Pressable
            key={f.label}
            accessibilityRole="button"
            accessibilityState={{ selected: f.active }}
            aria-pressed={f.active}
            onPress={f.action}
            style={{
              borderRadius: 30,
              minHeight: 44,
              paddingHorizontal: 16,
              justifyContent: "center",
              backgroundColor: f.active ? theme.accent : theme.surface,
              borderWidth: 1,
              borderColor: f.active ? theme.accent : theme.border,
            }}
          >
            <Text
              style={{
                color: f.active ? theme.textOnAccent : theme.accent,
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              {f.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text accessibilityLiveRegion="polite" style={styles.small}>
        {results.length} shelters {pet ? "· Pet friendly" : ""}
        {available ? " · Available or limited space" : ""}
        {closest ? " · Nearest first" : ""}
      </Text>
      {results.length === 0 && (
        <Card>
          <Text style={styles.heading}>
            No shelters match your selected filters.
          </Text>
          <Button title="Clear Filters" onPress={clear} />
        </Card>
      )}
      {results.map((shelter) => (
        <Card key={shelter.id}>
          <View style={styles.between}>
            <View
              style={{
                backgroundColor: theme.surfaceMuted,
                padding: 12,
                borderRadius: 14,
              }}
            >
              <Icon name="business-outline" size={26} />
            </View>
            <Text
              style={{
                fontSize: 12,
                color:
                  shelter.availability === "Available"
                    ? theme.accent
                    : theme.routeNoticeText,
                fontWeight: "600",
              }}
            >
              ● {shelter.availability}
            </Text>
          </View>
          <Text style={styles.heading}>{shelter.name}</Text>
          <View style={styles.row}>
            <Icon name="location-outline" size={16} />
            <Text style={styles.body}>
              {shelter.distanceMiles} miles away · {shelter.minutes} min
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="paw-outline" size={16} />
            <Text style={styles.small}>
              {shelter.petFriendly ? "Pet friendly" : "No pet accommodations"}
            </Text>
          </View>
          <Button
            title="View Details"
            href={{
              pathname: "/prepare/shelter-details",
              params: { id: shelter.id },
            }}
            secondary
          />
        </Card>
      ))}
    </Screen>
  );
=======
import React, {useMemo, useState} from "react";
import {Image, Pressable, Text, TextInput, View} from "react-native";
import {router} from "expo-router";
import {shelters} from "../../data/demo";
import {Card, Icon, Screen} from "../../components/UI";
import {styles as s, colors as c} from "../../styles/theme";

type Distance = "near" | "mid" | "far" | null;
function Chip({label,active,onPress}:{label:string;active:boolean;onPress:()=>void}) {
 return <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{selected:active}} onPress={onPress} style={{borderWidth:1.3,borderColor:active?c.primary:"#BCCAD2",backgroundColor:active?"#FFF0E9":"white",borderRadius:22,paddingHorizontal:13,minHeight:39,justifyContent:"center",alignItems:"center"}}><Text style={{color:active?"#9D351C":c.navy,fontWeight:active?"800":"600",fontSize:12}}>{active?"✓  ":""}{label}</Text></Pressable>;
}

const shelterImages = {
  school: require("../../../assets/images/shelter-school.png"),
  community: require("../../../assets/images/shelter-community.png"),
  recreation: require("../../../assets/images/shelter-recreation.png"),
  library: require("../../../assets/images/shelter-library.png"),
} as const;

export default function Shelters() {
 const [available,setAvailable]=useState(false);
 const [overnight,setOvernight]=useState(false);
 const [pets,setPets]=useState(false);
 const [distance,setDistance]=useState<Distance>(null);
 const [query,setQuery]=useState("");
 const clear=()=>{setAvailable(false);setOvernight(false);setPets(false);setDistance(null);setQuery("");};
 const hasFilters=available||overnight||pets||distance!==null||query.trim()!=="";
 const result=useMemo(()=>shelters.filter(sh=>(!available||sh.available)&&(!overnight||sh.overnight)&&(!pets||sh.petFriendly)&&(
 distance===null||(distance==="near"&&sh.distanceMiles<5)||(distance==="mid"&&sh.distanceMiles>=5&&sh.distanceMiles<=20)||(distance==="far"&&sh.distanceMiles>20))&&(
 query.trim()===""||`${sh.name} ${sh.address}`.toLowerCase().includes(query.trim().toLowerCase()))).sort((a,b)=>a.distanceMiles-b.distanceMiles),[available,overnight,pets,distance,query]);
 return <Screen title="Find Shelters" subtitle="Compare nearby options for your household.">
  <View style={{backgroundColor:"#F5F7F9",borderRadius:12,flexDirection:"row",alignItems:"center",paddingHorizontal:12,gap:8,borderWidth:1,borderColor:c.border}}><Icon name="search-outline" color={c.muted} size={19}/><TextInput accessibilityLabel="Search shelters" value={query} onChangeText={setQuery} placeholder="Search by shelter name" placeholderTextColor="#6D7C89" style={{flex:1,minHeight:46,color:c.navy,fontSize:14}}/>{query!==""&&<Pressable accessibilityLabel="Clear search" onPress={()=>setQuery("")}><Icon name="close-circle" color={c.muted}/></Pressable>}</View>
  <View style={{gap:11}}>
   <View style={s.between}><Text style={[s.heading,{fontSize:16}]}>Shelter needs</Text>{hasFilters&&<Pressable accessibilityRole="button" accessibilityLabel="Clear all filters" onPress={clear} style={{padding:7}}><Text style={{color:c.primary,fontWeight:"800",fontSize:12}}>Clear filters</Text></Pressable>}</View>
   <View style={{flexDirection:"row",gap:7,flexWrap:"wrap"}}><Chip label="Available" active={available} onPress={()=>setAvailable(!available)}/><Chip label="Overnight" active={overnight} onPress={()=>setOvernight(!overnight)}/><Chip label="Pet-friendly" active={pets} onPress={()=>setPets(!pets)}/></View>
   <Text style={{fontSize:13,color:c.navy,fontWeight:"800",marginTop:3}}>Distance from home</Text>
   <View style={{backgroundColor:"#EFF2F5",borderRadius:11,padding:4,flexDirection:"row",gap:4}}>
    {([{v:"near",label:"< 5 mi"},{v:"mid",label:"5–20 mi"},{v:"far",label:"20+ mi"}] as const).map(({v,label})=><Pressable key={v} accessibilityRole="button" accessibilityLabel={`Filter distance ${label}`} accessibilityState={{selected:distance===v}} onPress={()=>setDistance(distance===v?null:v)} style={{flex:1,minHeight:40,alignItems:"center",justifyContent:"center",borderRadius:8,backgroundColor:distance===v?"white":"transparent",borderWidth:distance===v?1:0,borderColor:"#C5D0D9"}}><Text style={{color:distance===v?c.primary:c.navy,fontSize:12,fontWeight:distance===v?"800":"600"}}>{label}</Text></Pressable>)}
   </View>
   <Text style={{fontSize:11,color:c.muted}}>Tap a selected distance again to show every distance.</Text>
  </View>
  <Text accessibilityLiveRegion="polite" style={[s.heading,{fontSize:16}]}>{result.length} shelter{result.length===1?"":"s"}</Text>
  {result.length===0&&<Card><Text style={s.heading}>No shelters match</Text><Text style={s.body}>Try removing a filter or searching a different name.</Text><Pressable accessibilityRole="button" onPress={clear} style={{paddingVertical:10}}><Text style={{color:c.primary,fontWeight:"800"}}>Clear filters</Text></Pressable></Card>}
  {result.map(sh=><Pressable key={sh.id} accessibilityRole="button" accessibilityLabel={`View ${sh.name}`} onPress={()=>router.push({pathname:"/prepare/shelter-details",params:{id:sh.id}})} style={({pressed})=>[s.card,{padding:0,overflow:"hidden",opacity:pressed?.8:1,gap:0}]}> 
    <Image source={shelterImages[sh.id as keyof typeof shelterImages]} resizeMode="cover" style={{height:112,width:"100%"}}/>
    <View style={{padding:13,gap:7}}><View style={s.between}><Text style={[s.subheading,{flex:1,fontSize:15}]}>{sh.name}</Text><Icon name="chevron-forward" color={c.muted} size={18}/></View><Text style={{color:sh.available?"#296949":"#A83B35",fontSize:12,fontWeight:"800"}}>{sh.availability} · {sh.distanceMiles} mi · {sh.minutes} min</Text><View style={{flexDirection:"row",gap:9,flexWrap:"wrap"}}>{sh.overnight&&<Text style={s.small}>Overnight</Text>}{sh.petFriendly&&<Text style={s.small}>Pets welcome</Text>}{!sh.available&&<Text style={s.small}>Not accepting arrivals</Text>}</View></View>
  </Pressable>)}
 </Screen>;
>>>>>>> origin/main
}
