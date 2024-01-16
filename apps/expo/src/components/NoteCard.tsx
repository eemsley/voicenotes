/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import { trpc } from "../utils/trpc";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import TimeAgo from "react-native-timeago";

const NoteCard: React.FC<{
  note: any;
  navigation: any;
}> = ({ note, navigation }) => {
  const utils = trpc.useContext();
  const { userId } = useAuth();
  const { mutate: deleteNote } = trpc.note.delete.useMutation({
    async onSettled() {
      await utils.note.byUserId.invalidate(userId as string);
      setDisabled(false);
    },
  });
  const [disabled, setDisabled] = React.useState(false);
  const handleDelete = () => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => {
          setDisabled(false);
        },
      },
      {
        text: "Delete",
        onPress: async () => {
          setDisabled(true);
          deleteNote(note.id);
        },
      },
    ]);
  };
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Note", { note: note });
      }}
      disabled={disabled}
      className="border-primary-400 flex h-16 w-full flex-row rounded-lg border bg-neutral-100 px-2 pt-2 pb-1"
    >
      {disabled ? (
        <View className="h-full w-full items-center justify-center">
          <ActivityIndicator size="small" color="black" />
        </View>
      ) : (
        <View className="flex h-full w-full">
          <View className="flex h-1/2 w-full flex-row ">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="text-primary-500 w-[90%] text-xl font-bold"
            >
              {note.title}
            </Text>
            <Pressable className="absolute right-0">
              <Ionicons
                name="close"
                size={16}
                color="black"
                onPress={handleDelete}
              />
            </Pressable>
          </View>

          <View className="flex h-1/2 w-full flex-row items-center ">
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="w-1/2 text-xs text-neutral-800"
            >
              {note.content}
            </Text>
            <Text
              className="absolute right-0 bottom-0 text-neutral-800"
              style={{ fontSize: 10 }}
            >
              <TimeAgo time={note.updatedAt} hideAgo={false} />
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};
export default NoteCard;
