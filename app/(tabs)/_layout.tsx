import { Tabs } from 'expo-router';
import React, { useEffect, useState } from "react";

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Text, View } from 'react-native';
//import { auth } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";


import 'react-native-reanimated';



const auth = getAuth();
const user = auth.currentUser


function CustomHeader() {

  
  return (
    <View style = {{backgroundColor: "#6998ffff",
      paddingTop: 50,
      paddingBottom: 10,
      alignItems: "center",
    }}>
      <Text >My Language App</Text>
      <Text>User: {user?.email}</Text>
    </View>
  );
}





export default function TabLayout() {
  const colorScheme = useColorScheme();
const [user, setUser] = useState(); 

     useEffect(() => {
    const change = onAuthStateChanged(auth, (firebaseUser) => setUser(firebaseUser as any));
    return change;
  }, []);

    return (
    <>
    <CustomHeader/>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
     
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
    </>
  );
 ;

  
}
