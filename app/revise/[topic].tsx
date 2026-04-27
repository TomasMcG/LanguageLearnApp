import { styles } from "@/styles/inputStyles";
import { WordStyles } from "@/styles/wordStyles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { getSentences, getUsersWords, getWords,getS } from "../../api/words-api";

import { useQuery } from "@tanstack/react-query";
import { auth } from "../../firebase";

export default function LearnScreen() {
  let user = auth.currentUser;

  const {
    data: usersWords,
    error,
    isPending,
    isError,
  } = useQuery<any[]>({
    queryKey: ["userWords", user?.uid],
    queryFn: () => getUsersWords(user!.uid),
  });

  const { topic } = useLocalSearchParams<{ topic: string }>();

  const [words, setWords] = useState<any[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isFlipped, setIsFlipped] = useState(false);
  const [sentences, setSentences] = useState<any[]>([]);
  const [allSentences, setAllSentences] = useState<any[]>([]);

  const router = useRouter();
  useEffect(() => {
    getAllSentences();
    const fetchWords = async () => {
      try {
        const allWords = await getWords();

        let filtered = allWords.filter((w: any) => w.topicName === topic);

        const now = new Date();
        const reviewWords = usersWords
          ? usersWords.filter(
              (userWord: any) =>
                userWord.isKnown && new Date(userWord.nextReviewDate) <= now,
            )
          : [];

        const dueWords = reviewWords.map(
          (knownWords: any) => knownWords.wordId,
        );
        filtered = filtered.filter((w: any) => dueWords.includes(w._id));

        setWords(filtered);
        setCurrentIndex(0);
      } catch (error) {
        console.error("Failed to fetch words:", error);
      }
    };

    fetchWords();
  }, [topic, usersWords]);

  useEffect(() => {
    if (!words[currentIndex] || allSentences.length === 0) return;

    const matching = allSentences.filter((sentence: any) =>
      sentence.wordIds.includes(words[currentIndex]._id),
    );

    setSentences(matching);
  }, [currentIndex, allSentences, words]);

  //ToDo, change this to get words of topic, then check their review date.

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // router.push("/(auth)/displayWords");
      router.back();
    }
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(true);
  };

  const getAllSentences = async () => {
    const allSentences = await getSentences();
    setAllSentences(allSentences);
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

  if (isPending) {
    return;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <View>
      <View>
        <Text>User Id: </Text>
        <Text style={styles.TextHeader}>Screens For Learning {topic}</Text>
        <Text style={styles.TextHeader}>
          Total Words: {words.length}, Current Word: {currentIndex + 1}
        </Text>
      </View>
      {!isFlipped ? (
        /*Front*/ <View style={WordStyles.card}>
          <Text style={WordStyles.label}>English</Text>
          <Text style={WordStyles.mainWord}>{currentWord.wordName}</Text>
          <View style={WordStyles.buttonWrap}>
            <Button title="Flip" onPress={handleFlip} />
          </View>
        </View>
      ) : (
        /*Back*/
        <View style={WordStyles.card}>
          <Text style={WordStyles.label}>German</Text>
          <Text style={WordStyles.mainWord}>{currentWord.wordTranslation}</Text>
          <View style={WordStyles.divider} />
          <Text style={WordStyles.subHeader}>
            Sentence Examples:
            {sentences.map((sentence, index) => (
              <View key={index} style={WordStyles.sentenceBox}>
                <Text style={WordStyles.sentenceEn}>
                  {sentence.englishTranslation}
                </Text>
                <Text style={WordStyles.sentenceDe}>
                  {sentence.sentenceText}
                </Text>
              </View>
            ))}
          </Text>
          <View style={WordStyles.buttonRow}>
            <Button title="Incorrect" onPress={handleNext} color="red" />
          </View>
          <View style={{ marginTop: 20, width: 150 }}>
            <Button title="Correct" onPress={handleNext} color="green" />
          </View>
        </View>
      )}
    </View>
  );
}
