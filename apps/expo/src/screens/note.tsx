/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { trpc } from "../utils/trpc";
import { Ionicons } from "@expo/vector-icons";

export const ViewNoteScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const params = route.params;
  const utils = trpc.useContext();

  const [content, setContent] = React.useState(params.note.content);
  const [title, setTitle] = React.useState(params.note.title);

  const { mutate: updateNote } = trpc.note.update.useMutation({
    async onSuccess() {
      await utils.note.all.invalidate();
    },
  });

  const saveNote = () => {
    if (title != params.note.title && content != params.note.content) {
      updateNote({
        id: params.note.id,
        title: title || "",
        content: content || "",
      });
    }
    if (title != params.note.title && content == params.note.content) {
      updateNote({
        id: params.note.id,
        title: title || "",
        content: params.note.content || "",
      });
    }
    if (title == params.note.title && content != params.note.content) {
      updateNote({
        id: params.note.id,
        title: params.note.title || "",
        content: content || "",
      });
    }
  };

  return (
    <SafeAreaView className="bg-neutral-100">
      <View className="h-full w-full bg-neutral-100 p-4">
        <View className="h-10% flex w-full flex-row items-center justify-center rounded-lg bg-neutral-300 pb-1">
          <TouchableOpacity
            className="absolute left-0 top-3"
            onPress={() => {
              saveNote();
              navigation.navigate("Home");
            }}
          >
            <Ionicons name="chevron-back" size={32} color="black" />
          </TouchableOpacity>
          <TextInput
            multiline={true}
            className="text-primary-500 truncate rounded-lg bg-transparent py-2 px-6 text-2xl font-bold"
            placeholder={"Title"}
            value={title}
            defaultValue={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
          />
        </View>

        <TextInput
          className="mt-4 h-[70%] rounded-lg bg-neutral-300 p-2 text-xl"
          multiline={true}
          placeholder={"Content"}
          value={content}
          defaultValue={content}
          onChangeText={(text) => {
            setContent(text);
          }}
        />
      </View>
    </SafeAreaView>
  );
};
