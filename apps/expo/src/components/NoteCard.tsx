import React from "react";
import { Text, View } from "react-native";

const NoteCard: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  note: any;
}> = ({ note }) => {
  return (
    <View className="border-primary-500 h-16 rounded-lg border bg-neutral-100 pt-2 pl-2">
      <Text className="text-primary-500 text-xl font-bold">{note.title}</Text>
      <Text className="line-clamp-1 pl-1 text-xs text-neutral-800">
        {note.content}
      </Text>
    </View>
  );
};
export default NoteCard;
