import { useAuth } from "@clerk/clerk-expo";
import React from "react";
import { Text, Pressable } from "react-native";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

const SignOutWIthOauth = () => {
  useWarmUpBrowser();

  const { signOut } = useAuth();

  return (
    <Pressable
      onPress={() => signOut()}
      className="bg-primary-500 rounded-lg border border-neutral-100 p-4"
    >
      <Text className="text-center text-neutral-100">Sign Out</Text>
    </Pressable>
  );
};

export default SignOutWIthOauth;
