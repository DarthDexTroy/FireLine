<<<<<<< HEAD
import React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  Badge,
  Button,
  Card,
  Icon,
  IconButton,
  Progress,
  Section,
  type IconName,
} from "../components/UI";
import { ThemeToggle } from "../components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";
=======
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Share, Text, View } from "react-native";
import { router } from "expo-router";
import { Icon, IconButton } from "../components/UI";
import { colors as c, styles as s } from "../styles/theme";
>>>>>>> origin/main
import { useApp } from "../context/AppContext";
import { isCompactHomeHeader } from "../lib/layout";
import { visibleNotifications } from "../lib/state";

export default function Home() {
  const { state } = useApp();
<<<<<<< HEAD
  const { theme, styles } = useTheme();
  const { width } = useWindowDimensions();
  const compactHeader = isCompactHomeHeader(width);
  const unread = visibleNotifications(state).filter(
    (a) => !state.read.includes(a.id),
  ).length;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 22, paddingBottom: 30, gap: 23 }}
    >
      <View
        style={[styles.between, { flexWrap: "wrap", alignItems: "flex-start" }]}
      >
        <View style={[styles.row, { flexShrink: 1, minWidth: 0 }]}>
          <View
            style={{
              width: 42,
              height: 46,
              borderRadius: 14,
              backgroundColor: theme.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="flame" color={theme.textOnPrimary} size={27} />
          </View>
          <View>
            <Text style={[styles.title, { fontSize: 31 }]}>Fireline</Text>
            <Text
              style={{ fontSize: 11, color: theme.textSecondary, marginTop: 3 }}
            >
              Stay informed. Stay prepared.
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 6,
            marginLeft: compactHeader ? 0 : "auto",
            width: compactHeader ? "100%" : undefined,
            justifyContent: compactHeader ? "flex-end" : "flex-start",
            marginTop: compactHeader ? 8 : 0,
          }}
        >
          <ThemeToggle />
          <IconButton
            name="settings-outline"
            label="Open settings"
            onPress={() => router.push("/settings")}
          />
          <IconButton
            name="notifications-outline"
            label="Open notifications"
            onPress={() => router.push("/notifications")}
          />
          {unread > 0 && (
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                right: -2,
                top: -3,
                backgroundColor: theme.danger,
                borderRadius: 10,
                minWidth: 18,
                height: 18,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: theme.textOnDanger,
                  fontSize: 10,
                  fontWeight: "700",
                }}
              >
                {unread}
              </Text>
            </View>
          )}
=======
  const unread = visibleNotifications(state).filter((a) => !state.read.includes(a.id)).length;
  const [shareMessage, setShareMessage] = useState("");

  async function shareStatus() {
    const text = `Fireline status update\nArea status: Evacuation Warning — Zone B\nWildfire nearby: Oak Valley Wildfire, 4.8 miles away\nRecommended action: Prepare essential items and continue monitoring official updates.`;
    try {
      await Share.share({ message: text });
      setShareMessage("");
    } catch {
      setShareMessage("Sharing was not available on this device.");
    }
  }

  return <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding:17,paddingBottom:30,gap:15}}>
    <View style={[s.between,{marginTop:5}]}> 
      <View style={{gap:3,flex:1}}>
        <View style={[s.row,{gap:8}]}> 
          <View style={{width:36,height:36,borderRadius:11,backgroundColor:c.primary,alignItems:"center",justifyContent:"center"}}><Icon name="flame" color="white" size={25}/></View>
          <Text style={{fontSize:24,color:c.navy,fontWeight:"800",letterSpacing:-0.6}}>Fireline</Text>
>>>>>>> origin/main
        </View>
        <Text style={{color:c.muted,fontSize:12,marginTop:3}}>Wildfire awareness for your area</Text>
      </View>
<<<<<<< HEAD
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Change saved location"
        onPress={() => router.push("/settings/location")}
        style={[
          styles.row,
          {
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
            paddingBottom: 18,
          },
        ]}
      >
        <Icon name="location-outline" size={22} />
        <View style={{ flex: 1, gap: 3 }}>
          <Text style={styles.subheading}>{state.location}</Text>
          <Text style={styles.small}>Your saved demonstration location</Text>
        </View>
        <Icon name="chevron-down" size={17} />
      </Pressable>
      <LinearGradient
        colors={["#8C361F", "#B84725"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ padding: 22, borderRadius: 24, gap: 17, overflow: "hidden" }}
      >
        <View style={styles.between}>
          <Text
            style={{
              color: "#F7D5C3",
              fontSize: 10,
              fontWeight: "600",
              letterSpacing: 1.6,
            }}
          >
            NEAR YOUR SAVED LOCATION
          </Text>
          <Icon name="flame-outline" color="#F7D5C3" size={24} />
        </View>
        <View style={{ gap: 10 }}>
          <Badge severity="warning" />
          <Text
            style={{
              color: "white",
              fontSize: 28,
              fontWeight: "700",
              letterSpacing: -0.8,
            }}
          >
            Wildfire Warning
          </Text>
          <Text style={{ color: "#FBE4D8", fontSize: 14, lineHeight: 21 }}>
            Simulated wildfire activity near your area. Now is the time to
            prepare.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            borderTopWidth: 1,
            borderTopColor: "#C9785C",
            paddingTop: 15,
          }}
        >
          <View>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
              4.8 <Text style={{ fontSize: 12 }}>miles away</Text>
            </Text>
            <Text style={{ color: "#F7D5C3", fontSize: 11, marginTop: 4 }}>
              Oak Valley Wildfire
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#F8CF8B", fontSize: 13, fontWeight: "600" }}>
              Prepare to Evacuate
            </Text>
            <Text style={{ color: "#F7D5C3", fontSize: 11, marginTop: 7 }}>
              Scenario update · 5 min ago
            </Text>
          </View>
        </View>
        <Button
          title="View Alert Details"
          href="/updates/evacuation"
          secondary
          icon="arrow-forward"
        />
      </LinearGradient>
      <View style={{ gap: 12 }}>
        <Text style={styles.eyebrow}>
          A little preparation. More peace of mind.
        </Text>
        <Text style={styles.heading}>Your next steps</Text>
        {(
          [
            {
              title: "Live Updates",
              description: "The latest simulated wildfire updates.",
              action: "View Updates",
              icon: "radio-outline",
              href: "/updates",
            },
            {
              title: "Wildfire Nearby",
              description: "Explore activity and evacuation zones.",
              action: "View Map",
              icon: "map-outline",
              href: "/wildfire",
            },
            {
              title: "Prepare",
              description: "Build a plan for your household.",
              action: "Start Preparing",
              icon: "bag-handle-outline",
              href: "/prepare/checklist",
            },
          ] as const
        ).map((item) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${item.title}: ${item.action}`}
            key={item.title}
            onPress={() => router.push(item.href)}
            style={({ pressed }) => [
              styles.card,
              styles.row,
              { padding: 16, opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <View
              style={{
                width: 46,
                height: 48,
                borderRadius: 14,
                backgroundColor: theme.surfaceMuted,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name={item.icon as IconName} />
            </View>
            <View style={{ flex: 1, gap: 5 }}>
              <Text style={styles.subheading}>{item.title}</Text>
              <Text style={[styles.small, { fontSize: 11 }]}>
                {item.description}
              </Text>
              <Text
                style={{ fontSize: 11, color: theme.accent, fontWeight: "600" }}
              >
                {item.action} →
              </Text>
            </View>
            <Icon name="chevron-forward" color={theme.iconMuted} size={18} />
          </Pressable>
        ))}
      </View>
      <View style={{ gap: 10 }}>
        <Section
          title="Ready, one step at a time"
          label="My plan"
          href="/prepare/plan"
        />
        <Card>
          <Progress compact />
          <Button
            title="Continue Preparing"
            href="/prepare/checklist"
            secondary
          />
        </Card>
      </View>
      <Text style={[styles.small, { textAlign: "center", fontSize: 10 }]}>
        Educational demonstration. Not for emergency use.
      </Text>
    </ScrollView>
  );
=======
      <IconButton name="settings-outline" label="Settings" onPress={()=>router.push("/settings")}/>
      <View><IconButton name="notifications-outline" label="Notifications" onPress={()=>router.push("/notifications")}/>{unread>0&&<View pointerEvents="none" style={{position:"absolute",right:0,top:-2,backgroundColor:c.primary,borderRadius:10,paddingHorizontal:5,minWidth:17,height:17,alignItems:"center",justifyContent:"center"}}><Text style={{color:"white",fontSize:10,fontWeight:"700"}}>{unread}</Text></View>}</View>
    </View>

    <Pressable onPress={()=>router.push("/wildfire")} accessibilityRole="button" accessibilityLabel="Wildfire Nearby, view details" style={({pressed})=>({borderRadius:16,overflow:"hidden",borderWidth:1,borderColor:"#F3D8CE",backgroundColor:"#FFF3EE",opacity:pressed?.8:1})}>
      <Image source={require("../../assets/images/wildfire-hero.png")} resizeMode="cover" style={{width:"100%",height:104}}/>
      <View style={{padding:14,gap:5}}>
        <View style={[s.row,{gap:8}]}><Icon name="flame" size={24} color={c.primary}/><Text style={{color:c.primary,fontSize:18,fontWeight:"800",flex:1}}>Wildfire Nearby</Text><Icon name="chevron-forward" color={c.primary} size={19}/></View>
        <Text style={{fontSize:15,fontWeight:"700",color:c.navy}}>Oak Valley Wildfire</Text>
        <Text style={{color:c.muted,fontSize:12}}>4.8 miles away · Updated 5 minutes ago</Text>
      </View>
    </Pressable>

    <Pressable accessibilityRole="button" accessibilityLabel="Your Area Status, evacuation warning" onPress={()=>router.push("/prepare/status")} style={({pressed})=>({backgroundColor:"#FFF8EA",borderColor:"#F2E2B8",borderWidth:1,borderRadius:16,padding:14,gap:9,opacity:pressed?.8:1})}>
      <Text style={{fontWeight:"800",color:c.navy,fontSize:15}}>Your Area Status</Text>
      <View style={[s.row,{backgroundColor:"#FFE8B4",borderRadius:10,padding:11,gap:9}]}><Icon name="warning-outline" size={25} color="#9A6400"/><View style={{flex:1,gap:2}}><Text style={{fontSize:17,fontWeight:"800",color:"#9A6400"}}>Evacuation Warning</Text><Text style={{fontSize:12,color:"#855700",fontWeight:"600"}}>Zone B · Prepare</Text></View><Icon name="chevron-forward" color="#9A6400" size={18}/></View>
      <Text style={{color:"#6F6452",fontSize:12}}>Be ready to leave if officials issue an order.</Text>
    </Pressable>

    <View style={{flexDirection:"row",gap:10}}>
      <Pressable onPress={()=>router.push("/updates")} accessibilityRole="button" accessibilityLabel="Live Updates" style={({pressed})=>({flex:1,minHeight:94,backgroundColor:pressed?"#DFEFFF":"#EDF5FF",borderRadius:14,alignItems:"center",justifyContent:"center",gap:7,padding:10})}><Icon name="refresh-outline" color="#2469CB" size={26}/><Text style={{fontWeight:"800",color:"#24599D",fontSize:13}}>Live Updates</Text></Pressable>
      <Pressable onPress={shareStatus} accessibilityRole="button" accessibilityLabel="Share current status" style={({pressed})=>({flex:1,minHeight:94,backgroundColor:pressed?"#DFEFFF":"#EDF5FF",borderRadius:14,alignItems:"center",justifyContent:"center",gap:7,padding:10})}><Icon name="share-social-outline" color="#2469CB" size={26}/><Text style={{fontWeight:"800",color:"#24599D",fontSize:13}}>Share Status</Text></Pressable>
    </View>

    {shareMessage ? <View style={{backgroundColor:c.pale,borderRadius:12,padding:12}}><Text style={{color:c.green,fontSize:12,fontWeight:"700"}}>{shareMessage}</Text></View> : null}

    <View style={{backgroundColor:"#EDF5FF",borderRadius:12,padding:12,flexDirection:"row",alignItems:"flex-start",gap:8}}><Icon name="shield-checkmark-outline" color="#36689B" size={19}/><Text style={{flex:1,color:"#36516C",fontSize:12,lineHeight:18}}>Stay informed with official updates. Information from CAL FIRE and county emergency services.</Text></View>
  </ScrollView>;
>>>>>>> origin/main
}
