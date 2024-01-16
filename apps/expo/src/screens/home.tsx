/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { TouchableOpacity, View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import SignOutWithOauth from "../components/SignOutWithOAuth";
import { trpc } from "../utils/trpc";
import NoteCard from "../components/NoteCard";
import { useAuth } from "@clerk/clerk-expo";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { userId } = useAuth();
  const utils = trpc.useContext();
  const [refetching, setRefetching] = React.useState(false);

  const noteQuery = trpc.note.byUserId.useQuery(userId as string, {
    onSettled: () => {
      setRefetching(false);
    },
  });

  const { mutate: createNote, isLoading: isCreating } =
    trpc.note.create.useMutation({
      async onSettled(data) {
        noteQuery.refetch();
        navigation.navigate("Note", { note: data });
      },
    });

  return (
    <SafeAreaView className="bg-neutral-100">
      <View className="h-full w-full p-4">
        <View className="mb-6 h-8 w-full flex-row">
          <View className="bg-primary-100 h-full w-[90%] rounded-full px-8">
            <Ionicons
              name="search"
              size={16}
              color="black"
              style={{
                position: "absolute",
                left: 8,
                top: 8,
              }}
            />
            <TextInput placeholder="Search" className="h-full  w-full" />
          </View>
          <TouchableOpacity
            className="h-full w-[10%] items-center justify-center pl-3"
            onPress={async () => {
              createNote({
                authorId: userId || "",
                title: "New Note",
                content: "",
              });
            }}
            disabled={isCreating}
          >
            {isCreating ? (
              <ActivityIndicator size={"small"} color={"black"} />
            ) : (
              <AntDesign name="pluscircleo" size={20} color="black" />
            )}
          </TouchableOpacity>
        </View>
        <FlashList
          data={noteQuery.data as any[]}
          estimatedItemSize={20}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-2" />}
          ListFooterComponent={() => <View className="h-4" />}
          renderItem={(n) => <NoteCard navigation={navigation} note={n.item} />}
          onRefresh={() => {
            setRefetching(true);
            noteQuery.refetch();
          }}
          refreshing={refetching}
        />
      </View>
    </SafeAreaView>
  );
};
