import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { trpc } from "../utils/trpc";
import { Ionicons } from "@expo/vector-icons";

const NoteCard: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  note: any;
}> = ({ note }) => {
  const utils = trpc.useContext();
  const { mutate: deleteNote } = trpc.note.delete.useMutation({
    async onSuccess() {
      await utils.note.all.invalidate();
    },
  });
  const handleDelete = () => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => {
          return;
        },
      },
      {
        text: "Delete",
        onPress: () => {
          deleteNote(note.id);
        },
      },
    ]);
  };
  return (
    <View className="border-primary-400 flex h-16 w-full flex-row rounded-lg border bg-neutral-100 pt-2 pl-2">
      <View className="flex h-full w-[93%] flex-col">
        <Text className="text-primary-500 text-xl font-bold">{note.title}</Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className=" bg-red-100 pl-1 text-xs text-neutral-800"
        >
          {note.content}
        </Text>
      </View>
      <Pressable className="h-full w-[7%] justify-start">
        <Ionicons name="close" size={16} color="black" onPress={handleDelete} />
      </Pressable>
    </View>
  );
};
export default NoteCard;
