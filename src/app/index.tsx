import React, { useState } from "react";
import { Image, Pressable, ScrollView, Share, Text, View } from "react-native";
import { router } from "expo-router";
import { Icon, IconButton } from "../components/UI";
import { colors as c, styles as s } from "../styles/theme";
import { useApp } from "../context/AppContext";
import { visibleNotifications } from "../lib/state";

export default function Home() {
  const { state } = useApp();
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
        </View>
        <Text style={{color:c.muted,fontSize:12,marginTop:3}}>Wildfire awareness for your area</Text>
      </View>
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
}
