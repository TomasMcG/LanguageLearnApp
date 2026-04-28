import { styles } from "@/styles/inputStyles";
import { WordStyles } from "@/styles/wordStyles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { addKnownUserWord, getUsersWords, getWords } from "../../api/words-api";

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
const [topicWords, setTopicWords] = useState<any[]>([]);
  const [words, setWords] = useState<any[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isFlipped, setIsFlipped] = useState(false);

  const [knownWords, setKnownWords] = useState<string[]>([]);

  const [introSeen, setIntroSeen] = useState(false);

  const router = useRouter();
 
  useEffect(() => {
    const fetchWords = async () => {
  try {
    const allWords = await getWords();

    // get all words for this topic, then the known word Ids for the users, then filter out the words that are known and slice it to 5
    let filtered = allWords.filter((w: any) => w.topicName === topic);

    
    const knownWordIds = usersWords
      ? usersWords.filter((uw: any) => uw.isKnown).map((uw: any) => uw.wordId)
      : [];

    
    filtered = filtered.filter((w: any) => !knownWordIds.includes(w._id));

    
    filtered = filtered.slice(0, 5);

    setTopicWords(allWords.filter((w: any) => w.topicName === topic));
    setWords(filtered);
    setCurrentIndex(0);
  } catch (error) {
    console.error("Failed to fetch words:", error);
  }
};

    fetchWords();
  }, [topic, usersWords]);

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.back();
    }
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(true);
  };

  const isFirstTime = usersWords
  ? !usersWords.some((uw: any) =>
      words.some((w: any) => w._id === uw.wordId && uw.isKnown)
    )
  : true;

  let currentWord = words[currentIndex];

  const addWordToKnown = () => {
    console.log("Current word:", currentWord);

    if (user != null) {
      addKnownUserWord(currentWord._id, user?.uid);
    }
    handleNext();
  };

  while (!currentWord) {
    currentWord = words[currentIndex];
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isFirstTime && !introSeen) {
  return (
    <View style={styles.container}>
      <Text style={styles.TextHeader}>Welcome to {topic}</Text>
      <Text style={{ marginVertical: 10 }}>
        In this topic you will learn {topicWords.length} words:
      </Text>

      {topicWords.map((word, index) => (
        <View key={index} style={WordStyles.card}>
          <Text style={WordStyles.mainWord}>{word.wordName}</Text>
          <Text style={WordStyles.label}>{word.wordTranslation}</Text>
        </View>
      ))}

      <View style={{ marginTop: 20 }}>
        <Button title="Start Learning" onPress={() => setIntroSeen(true)} />
      </View>
    </View>
  );
}
  
  
  if (isPending ) {
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
            <Button title="Next Word" onPress={addWordToKnown} color="green" />
          </View>
        </View>
      )}
    </View>
  );
}
