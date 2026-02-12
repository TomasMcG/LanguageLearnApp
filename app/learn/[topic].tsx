import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function LearnScreen() {
  const { topic } = useLocalSearchParams();

  return (
    <View>
      <Text>Screens For Learning {topic}</Text>
    </View>
  );
}
