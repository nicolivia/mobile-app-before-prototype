import { FC, ReactNode } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

const RootLayout: FC = () => {
  const [fontsLoaded] = useFonts({
    'Manrope-Light': require('../assets/fonts/Manrope-Light.ttf'),
    'Manrope-Regular': require('../assets/fonts/Manrope-Regular.ttf'),
    'Manrope-Medium': require('../assets/fonts/Manrope-Medium.ttf'),
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
    'Manrope-ExtraBold': require('../assets/fonts/Manrope-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error("Clerk publishable key is not defined");
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SignedIn>
      <SignedOut>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SignedOut>
    </ClerkProvider>
  );
}

export default RootLayout