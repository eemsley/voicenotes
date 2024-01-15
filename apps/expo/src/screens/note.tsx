import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
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
  const utils = trpc.useContext();
  const note = trpc.note.byId.useQuery(params.noteId, {
    onSettled: () => {
      if (note && note.data) {
        setContent(note.data.content);
        setTitle(note.data.title);
      }
    },
  });
  const { mutate: updateNote } = trpc.note.update.useMutation({
    async onSuccess() {
      await utils.note.all.invalidate();
    },
  });

  const [content, setContent] = React.useState("");

  const [title, setTitle] = React.useState("");
  const [textcount, setTextCount] = React.useState(0);

  const handleContentChange = (text: string) => {
    setContent(text);
    setTextCount(textcount + 1);
    console.log(textcount);
    if (textcount % 10 == 0) {
      updateNote({
        id: params.noteId,
        title: title,
        content: content,
      });
    }
  };
  const handleTitleChange = (text: string) => {
    setTitle(text);
    setTextCount(textcount + 1);
    console.log(textcount);

    if (textcount % 10 == 0) {
      updateNote({
        id: params.noteId,
        title: title,
        content: content,
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
              navigation.navigate("Home");
            }}
          >
            <Ionicons name="chevron-back" size={32} color="black" />
          </TouchableOpacity>
          <TextInput
            className="text-primary-500 truncate rounded-lg bg-transparent py-2 px-6 text-2xl font-bold"
            placeholder={"Title"}
            value={title}
            defaultValue={title}
            onChangeText={(text) => handleTitleChange(text)}
          />
        </View>

        <TextInput
          className="mt-4 h-[70%] rounded-lg bg-neutral-300 p-2 text-xl"
          multiline={true}
          placeholder={"Content"}
          value={content}
          defaultValue={content}
          onChangeText={(text) => handleContentChange(text)}
        />
      </View>
    </SafeAreaView>
  );
};
