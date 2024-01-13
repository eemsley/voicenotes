import React from "react";

import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import SignOutWithOauth from "../components/SignOutWithOAuth";

import { trpc } from "../utils/trpc";
import NoteCard from "../components/NoteCard";
import CreatePost from "../components/CreatePost";

export const HomeScreen = () => {
  const postQuery = trpc.note.all.useQuery();

  return (
    <SafeAreaView className="bg-neutral-100">
      <View className="h-full w-full p-4">
        <FlashList
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data={postQuery.data as any[]}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(n) => (
            <TouchableOpacity
              onPress={() => {
                return;
              }}
            >
              <NoteCard note={n.item} />
            </TouchableOpacity>
          )}
        />

        <CreatePost />
        <SignOutWithOauth />
      </View>
    </SafeAreaView>
  );
};
