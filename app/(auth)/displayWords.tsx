import { styles } from "@/styles/inputStyles";
import { WordStyles } from "@/styles/wordStyles";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { getTopics, getWords } from "../../api/words-api";

export default function DisplayWordsScreen() {
  const [words, setWords] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);

  const getAllWords = async () => {
    const gottenWords = await getWords();
    setWords(gottenWords);
  };

  const getAllTopics = async () => {
    const gottenWords = await getTopics();
    setTopics(gottenWords);
  };

  useEffect(() => {
    getAllTopics();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.TextHeader}> Get Words Test Page</Text>

      <View style={WordStyles.Spacer}></View>

      <Text>Topics:</Text>
      {topics.map((topic) => (
        <View key={topic._id} style={WordStyles.TopicBox}>
          <Text style={WordStyles.TopicText}>
          {topic.topicName}{" "}
          </Text>
        </View>
      ))}

      <View style={WordStyles.Spacer}></View>

      <Button title="Get Words" onPress={getAllWords} />
      <View style={WordStyles.Spacer}></View>

      {words.slice(0, words.length).map((word) => (
        <View key={word.wordId}>
          <Text style={WordStyles.EnglishWord}>Word: {word.wordName}</Text>
          <Text style={WordStyles.TranslatedWord}>
            Translation: {word.wordTranslation}
          </Text>
        </View>
      ))}
    </View>
  );
}
