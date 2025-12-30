import {
  createUserWithEmailAndPassword
} from "firebase/auth";
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from "../../firebase";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Please sign up")


 

    const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setMessage(`User created: ${userCredential.user.uid}`);
      })
      .catch((error) => {
        setMessage(`Sign up error: ${error.message}`);
      });
  };

  

  return (
    <View style={styles.container}>
      <Text  style = {styles.TextHeader}> Email:</Text>
      <TextInput style = {styles.TextInput}
        value={email}
        onChangeText={setEmail}
        
      />

      <Text style = {styles.TextHeader}>Password:</Text>
      <TextInput style = {styles.TextInput}
        value={password}
        onChangeText={setPassword}
       
      />
       <Button title="Sign Up" onPress={signUp} />
       <Text>{message}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
  TextInput: {width: "50%",
    borderWidth: 1,
    borderColor: "#5996f1ff",   
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 16},
  TextHeader: { fontSize:24}
});
