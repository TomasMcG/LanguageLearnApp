

import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { auth } from "../../firebase";

export default function TabTwoScreen() {


 const [userInfo, setUserInfo] = useState<string>("No user");


 

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
        <Text> Explore Page</Text>
   <Button title="Get User" onPress={getCurrentUser} />
         <Text>{userInfo}</Text>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 24, fontWeight: 'bold' },
  }
  );
