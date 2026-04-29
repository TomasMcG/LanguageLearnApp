import { styles } from "@/styles/inputStyles";
import { sentenceStyles } from "@/styles/sentenceStyles";
import { useAudioPlayer } from "expo-audio";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    ActivityIndicator,
    Button,
    ScrollView,
     TouchableOpacity,
    Text,
    View,
} from "react-native";
import { speakText,getSentences } from "../../api/words-api";
import { auth } from "../../firebase";



export default function TextToSpeechScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const player = useAudioPlayer();
  const user = auth.currentUser;
   const { data: sentences, isPending, isError } = useQuery<any[]>({
    queryKey: ["sentences", user?.uid],
    queryFn: () => getSentences(user!.uid),
  });



  const toggleSelection = (index: number) => {
  setSelectedIndices(prev => {
    const next = new Set(prev);
    next.has(index) ? next.delete(index) : next.add(index);
    return next;
  });
};
  

const handleSpeak = async () => {
  if (selectedIndices.size === 0 || !sentences) return;
  try {
    setIsLoading(true);
    setError("");

    const combined = Array.from(selectedIndices)
      .map(index => sentences[index].sentenceText)
      .join(" ");

    const audioUrl = await speakText(combined);
    await player.replace({ uri: audioUrl });
    player.play();
  } catch (err) {
    setError("Failed to generate audio");
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.TextHeader}>Text To Speech</Text>

      {sentences?.map((item, index) => (
        <TouchableOpacity
  key={index}
  onPress={() => toggleSelection(index)}
  style={[
    sentenceStyles.card,
    selectedIndices.has(index) && { borderColor: "blue", borderWidth: 2 },
  ]}
>
  <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
    <View style={{
      width: 20, height: 20, borderRadius: 4,  
      borderWidth: 2, borderColor: "blue",
      backgroundColor: selectedIndices.has(index) ? "blue" : "transparent",
    }} />
    <View style={{ flex: 1 }}>
      <Text style={sentenceStyles.sentence}>{item.sentenceText}</Text>
      <Text style={sentenceStyles.translation}>{item.englishTranslation}</Text>
    </View>
  </View>
</TouchableOpacity>
      ))}

      <View style={{ marginVertical: 15 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Button
            title="Listen"
            onPress={handleSpeak}
            disabled={selectedIndices.size === 0} 
          />
        )}
      </View>

      {error ? <Text>{error}</Text> : null}
    </ScrollView>
  );
}