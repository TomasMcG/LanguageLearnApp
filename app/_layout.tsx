import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import 'react-native-reanimated';
import { auth } from "../firebase";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
const [user, setUser] = useState(); 

     useEffect(() => {
    const change = onAuthStateChanged(auth, (firebaseUser) => setUser(firebaseUser as any));
    return change;
  }, []);



 

  return (
     <QueryClientProvider client={queryClient}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      
    <Stack screenOptions={{ headerShown: false }}>
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
    </QueryClientProvider>
  );
}
