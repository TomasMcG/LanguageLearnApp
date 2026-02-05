import { styles } from "@/styles/inputStyles";
import { WordStyles } from "@/styles/wordStyles";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
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
    getAllWords();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.TextHeader}> Get Words Test Page</Text>

      <View style={WordStyles.Spacer}></View>

      <Text>Topics:</Text>
      {topics.map((topic) => (
        <View key={topic._id} style={WordStyles.TopicBox}>
          <Text style={WordStyles.TopicText}>{topic.topicName} </Text>

          <View style={WordStyles.Spacer} />

          {words
            .filter((word) => word.topicName === topic.topicName)
            .map((word) => (
              <View key={word._id}>
                <Text style={WordStyles.EnglishWord}>{word.wordName}</Text>
                <Text style={WordStyles.TranslatedWord}>
                  {word.wordTranslation}
                </Text>
              </View>
            ))}
        </View>
      ))}
    </View>
  );
}
