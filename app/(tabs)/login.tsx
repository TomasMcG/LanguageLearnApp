import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from "../../firebase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Please Login")


 

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setMessage(`Logged in: ${userCredential.user.email}`);
      })
      .catch((error) => {
        setMessage(`Login error: ${error.message}`);
      });
  };

  

  return (
    <View style={styles.container}>
      <Text> Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        
      />

      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
       
      />
       <Button title="Login" onPress={login} />
       <Text>{message}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
});
