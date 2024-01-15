import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TRPCProvider } from "./utils/trpc";

import { HomeScreen } from "./screens/home";
import { SignInSignUpScreen } from "./screens/signin";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { tokenCache } from "./utils/cache";
import Constants from "expo-constants";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ViewNoteScreen } from "./screens/note";

export const App = () => {
  const Stack = createStackNavigator();

  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <NavigationContainer>
        <SignedIn>
          <TRPCProvider>
            <SafeAreaProvider>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Note" component={ViewNoteScreen} />
              </Stack.Navigator>
              <StatusBar />
            </SafeAreaProvider>
          </TRPCProvider>
        </SignedIn>
        <SignedOut>
          <SignInSignUpScreen />
        </SignedOut>
      </NavigationContainer>
    </ClerkProvider>
  );
};
