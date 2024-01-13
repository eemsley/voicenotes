import React from "react";

import { View, SafeAreaView, Text } from "react-native";

import SignInWithOAuth from "../components/SignInWithOAuth";

export const SignInSignUpScreen = () => {
  return (
    <SafeAreaView className="bg-neutral-100">
      <View className="h-full w-full items-center  p-4">
        <View className="bg-primary-400 my-24 h-1/2 w-full items-center justify-center rounded-lg shadow-2xl">
          <Text className="text-5xl text-neutral-100">Voice Notes</Text>
        </View>
        <SignInWithOAuth />
      </View>
    </SafeAreaView>
  );
};
