import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import 'react-native-reanimated';
import { auth } from "../firebase";






export default function RootLayout() {
  const colorScheme = useColorScheme();
const [user, setUser] = useState(); 

     useEffect(() => {
    const change = onAuthStateChanged(auth, (firebaseUser) => setUser(firebaseUser as any));
    return change;
  }, []);



 

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
            {user ? (
          // User is logged in
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          // User is not logged in
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
