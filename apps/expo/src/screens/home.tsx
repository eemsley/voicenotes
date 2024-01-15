import React from "react";

import { TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import SignOutWithOauth from "../components/SignOutWithOAuth";

import { trpc } from "../utils/trpc";
import NoteCard from "../components/NoteCard";
import { useAuth } from "@clerk/clerk-expo";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HomeScreen = ({ navigation }: { navigation: any }) => {
  const utils = trpc.useContext();
  const { userId } = useAuth();

  const noteQuery = trpc.note.all.useQuery();
  const { mutate: createNote } = trpc.note.create.useMutation({
    async onSuccess() {
      await utils.note.all.invalidate();
    },
    onSettled(data) {
      navigation.navigate("Note", { noteId: data?.id });
    },
  });

  return (
    <SafeAreaView className="bg-neutral-100">
      <View className="h-full w-full p-4">
        <TouchableOpacity
          className="bg-primary-500 mb-4 rounded-lg border border-neutral-100 p-4"
          onPress={async () => {
            createNote({
              authorId: userId || "",
              title: "",
              content: "",
            });
          }}
        >
          <Text className="text-center text-neutral-100">Create Note</Text>
        </TouchableOpacity>
        <FlashList
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data={noteQuery.data as any[]}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(n) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Note", { noteId: n.item.id });
              }}
            >
              <NoteCard note={n.item} />
            </TouchableOpacity>
          )}
        />

        <SignOutWithOauth />
      </View>
    </SafeAreaView>
  );
};
