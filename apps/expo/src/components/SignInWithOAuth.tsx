import { useOAuth } from "@clerk/clerk-expo";
import React from "react";
import { Text, Pressable } from "react-native";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleSignInWithGooglePress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      } else {
        // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
        throw new Error(
          "There are unmet requirements, modifiy this else to handle them",
        );
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, []);

  return (
    <Pressable
      onPress={handleSignInWithGooglePress}
      className="bg-primary-400 w-full rounded-lg border border-neutral-100 p-4"
    >
      <Text className="text-center text-neutral-100">Sign In With Google</Text>
    </Pressable>
  );
};

export default SignInWithOAuth;
