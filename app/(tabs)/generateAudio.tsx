import { styles } from "@/styles/inputStyles";
import { useAudioPlayer } from "expo-audio";
import { useState } from "react";
import {
    ActivityIndicator,
    Button,
    ScrollView,
    Text,
    View,
} from "react-native";
import { speakText } from "../../api/words-api";



export default function TextToSpeechScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const player = useAudioPlayer();

const handleSpeak = async () => {
  try {
    setIsLoading(true);
    setError("");

    const audioUrl = await speakText("Listen to this sentence");

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

      <View style={{ marginVertical: 15 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Button title="Listen" onPress={handleSpeak} />
        )}
      </View>

      {error ? <Text>{error}</Text> : null}
    </ScrollView>
  );
}
