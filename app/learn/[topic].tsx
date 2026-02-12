import { WordStyles } from "@/styles/wordStyles";
import { useLocalSearchParams } from "expo-router";
import { useEffect,useState } from "react";
import { Text, View } from "react-native";
import { getTopics, getWords } from "../../api/words-api";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";

export default function LearnScreen() {
  const { topic } = useLocalSearchParams();
  let topicObject;

 const [words, setWords] = useState<any[]>([]);
  const [filteredWords, setFilteredWords] = useState<any[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      const allWords = await getWords();
      setWords(allWords);
    };
      fetchWords();
  }, []);

   useEffect(() => {
    if (topic && words.length > 0) {
      const filtered = words.filter(
        (word) => word.topicName === topic
      );
      setFilteredWords(filtered);
    }
  }, [topic, words]);

 
  //ToDo, change this to get words of topic.

 


  return (
     <View>
      <Text>Screens For Learning {topic}</Text>
 {words
          
            .map((word) => (
              <View key={word._id}>
                <Text style={WordStyles.EnglishWord}>{word.wordName}</Text>
                <Text style={WordStyles.TranslatedWord}>
                  {word.wordTranslation}
                </Text>
              </View>
            ))}
    </View>
  );
}
