import { styles } from "@/styles/inputStyles";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { auth } from "../../firebase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Please Login");

  const router = useRouter();


  const quickEmail = process.env.EXPO_PUBLIC_QUICK_LOGIN_EMAIL ?? "0";
    const quickPass = process.env.EXPO_PUBLIC_QUICK_LOGIN_PASSWORD ?? "0";

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setMessage(`Logged in: ${userCredential.user.email}`);
        router.replace("/(tabs)/explore");
      })
      .catch((error) => {
        setMessage(`Login error: ${error.message}`);
      });
  };

  const quickLogin = () => {
    signInWithEmailAndPassword(auth, quickEmail, quickPass)
      .then((userCredential) => {
        setMessage(`Logged in: ${userCredential.user.email}`);
        router.replace("/(tabs)/explore");
      })
      .catch((error) => {
        setMessage(`Login error: ${error.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.TextHeader}> Email:</Text>
      <TextInput
        style={styles.TextInput}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.TextHeader}>Password:</Text>
      <TextInput
        style={styles.TextInput}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={login} />
      <Text style={styles.TextHeader}>{message}</Text>

      <View>
        <Button title="Qucik Login" onPress={quickLogin} />
        <Text>
          {quickEmail},{quickPass}
        </Text>
      </View>
    </View>
  );
}
