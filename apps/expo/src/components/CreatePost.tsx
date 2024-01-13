import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { trpc } from "../utils/trpc";

const CreatePost: React.FC = () => {
  const utils = trpc.useContext();
  const { mutate } = trpc.note.create.useMutation({
    async onSuccess() {
      await utils.note.all.invalidate();
    },
  });

  const [title, onChangeTitle] = React.useState("");
  const [content, onChangeContent] = React.useState("");

  return (
    <View className="flex flex-col border-t-2 border-gray-500 p-4">
      <TextInput
        className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
        onChangeText={onChangeTitle}
        placeholder="Title"
      />
      <TextInput
        className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
        onChangeText={onChangeContent}
        placeholder="Content"
      />
      <TouchableOpacity
        className="rounded bg-[#cc66ff] p-2"
        onPress={() => {
          mutate({
            title,
            content,
          });
        }}
      >
        <Text className="font-semibold text-white">Publish note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePost;
