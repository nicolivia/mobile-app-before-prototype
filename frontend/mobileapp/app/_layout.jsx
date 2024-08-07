import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo"
import { Text, View } from "react-native";
import LoginScreen from "../components/LoginScreen";

export default function RootLayout() {
  useFonts({
    'outfit-black': require('./../../image-recognition-app/assets/fonts/Outfit-Black.ttf'),
    'outfit-bold': require('./../../image-recognition-app/assets/fonts/Outfit-Bold.ttf'),
    'outfit-medium': require('./../../image-recognition-app/assets/fonts/Outfit-Medium.ttf')
  })
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
          <Stack screenOptions={{headerShown:false}}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" options={{
                headerShown:false
              }} />
          </Stack> 
      </SignedIn>
      <SignedOut>
        <Stack screenOptions={{headerShown:false}}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" options={{
                headerShown:false
              }} />
        </Stack>
      </SignedOut>  
    </ClerkProvider>      
  );
}
