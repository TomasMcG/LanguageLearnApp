

import { styles } from '@/styles/inputStyles';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { auth } from "../../firebase";

export default function TabTwoScreen() {


 const [userInfo, setUserInfo] = useState<string>("No user");


 const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUserInfo("No user logged in");
    } catch (error: any) {
      console.log("Sign out error:", error.message);
    }
  };

  const getCurrentUser = () => {
    const user = auth.currentUser
     if (user) {
      setUserInfo(`Logged in as: ${user.email}`);
    } else {
      setUserInfo("No user logged in");
    }
  };

  return (


  <View style={styles.container}>
        <Text style={styles.TextHeader}> User Test Page</Text>
   <Button title="Get User" onPress={getCurrentUser} />
         <Text  style={[styles.TextHeader,styles.buttonSpace]}>{userInfo}</Text>
         <Text  style={styles.TextHeader}>Sign out Button Below</Text>
         <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
  }
  
 
