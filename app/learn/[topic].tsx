import { WordStyles } from "@/styles/wordStyles";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { getWords } from "../../api/words-api";

export default function LearnScreen() {
  const { topic } = useLocalSearchParams<{ topic: string }>();

  const [words, setWords] = useState<any[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const allWords = await getWords();
        const filtered = allWords.filter((w: any) => w.topicName === topic);
        setWords(filtered);
        setCurrentIndex(0);
      } catch (error) {
        console.error("Failed to fetch words:", error);
      }
    };

    fetchWords();
  }, [topic]);

  //ToDo, change this to get words of topic, then check their review date.

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(true);
  };

  let currentWord = words[currentIndex];

  while (!currentWord) {
    currentWord = words[currentIndex];
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <View>
        <Text>Screens For Learning {topic}</Text>
      </View>
      {!isFlipped ? (
        /*Front*/ <View>
          <Text style={WordStyles.EnglishWord}>
            English:{currentWord.wordName}
          </Text>
          <View style={{ marginTop: 20, width: 150 }}>
            <Button title="Flip" onPress={handleFlip} />
          </View>
        </View>
      ) : (
        /*Back*/
        <View>
          <Text style={WordStyles.TranslatedWord}>
            German:{currentWord.wordTranslation}
          </Text>
          <View style={{ marginTop: 20, width: 150 }}>
            <Button title="Next" onPress={handleNext} />
          </View>
        </View>
      )}
    </View>
  );
}
