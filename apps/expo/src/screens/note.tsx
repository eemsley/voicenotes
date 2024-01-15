import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { trpc } from "../utils/trpc";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

export const ViewNoteScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const params = route.params;
  const note = trpc.note.byId.useQuery(params.noteId, {
    onSettled: async (data) => {
      if (data && data !== undefined) {
        await setContent(data.content);
        await setTitle(data.title);
      }
    },
  });
  const [content, setContent] = React.useState(note.data?.content);

  const [title, setTitle] = React.useState(note.data?.title);

  return (
    <SafeAreaView className="bg-neutral-100">
      <View className="h-full w-full bg-neutral-100 p-4">
        <View className="h-10% flex w-full flex-row items-center justify-center rounded-lg bg-neutral-300 pb-1">
          <TouchableOpacity
            className="absolute left-0 top-3"
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Ionicons name="chevron-back" size={32} color="black" />
          </TouchableOpacity>
          <TextInput
            className="text-primary-500 truncate rounded-lg bg-transparent py-2 px-6 text-2xl font-bold"
            placeholder={"Title"}
            value={title}
            onTextInput={(e: any) => setTitle(e.target.value)}
          />
        </View>

        <TextInput
          className="mt-4 h-[80%] rounded-lg bg-neutral-100 p-2 text-xl"
          multiline={true}
          placeholder={"Content"}
          value={content}
          onTextInput={(e: any) => setContent(e.target.value)}
        />
      </View>
    </SafeAreaView>
  );
};
