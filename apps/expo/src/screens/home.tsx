/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import SignOutWithOauth from "../components/SignOutWithOAuth";
import { trpc } from "../utils/trpc";
import NoteCard from "../components/NoteCard";
import { useAuth } from "@clerk/clerk-expo";

export const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { userId } = useAuth();
  const utils = trpc.useContext();

  const noteQuery = trpc.note.byUserId.useQuery(userId as string);

  const { mutate: createNote, isLoading: isCreating } =
    trpc.note.create.useMutation({
      async onSettled(data) {
        await utils.note.all.invalidate();
        noteQuery.refetch();
        navigation.navigate("Note", { note: data });
      },
    });

  return (
    <SafeAreaView className="bg-neutral-100">
      <View className="h-full w-full p-4">
        <FlashList
          data={noteQuery.data as any[]}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          ListFooterComponent={() => <View className="h-4" />}
          renderItem={(n) => <NoteCard navigation={navigation} note={n.item} />}
          onRefresh={() => noteQuery.refetch()}
          refreshing={noteQuery.isFetching}
        />
        <TouchableOpacity
          className="bg-primary-500 mb-4 rounded-lg border border-neutral-100 p-4"
          onPress={async () => {
            createNote({
              authorId: userId || "",
              title: "New Note",
              content: "",
            });
          }}
          disabled={isCreating}
        >
          <Text className="text-center text-neutral-100">Create Note</Text>
        </TouchableOpacity>
        <SignOutWithOauth />
      </View>
    </SafeAreaView>
  );
};
