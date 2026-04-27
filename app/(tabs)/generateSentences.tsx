import { styles } from "@/styles/inputStyles";
import { sentenceStyles } from "@/styles/sentenceStyles";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  generateSentences,
  getSentences,
  getUsersWords,
  getWords,
  saveSentences,
} from "../../api/words-api";
import { auth } from "../../firebase";

export default function GenerateSentencesScreen() {
  const [sentences, setSentences] = useState<
    { sentence: string; translation: string }[]
  >([]);
  const [savedSentences, setSavedSentences] = useState<any[]>([]);

  const user = auth.currentUser;

  const {
    data: usersWords,
    isPending,
    isError,
    error,
  } = useQuery<any[]>({
    queryKey: ["userWords", user?.uid],
    queryFn: () => getUsersWords(user!.uid),
  });

  const { data: allWords } = useQuery<any[]>({
    queryKey: ["words"],
    queryFn: () => getWords(),
  });

  const knownWordNames: string[] =
    usersWords && allWords
      ? usersWords
          .filter((uw: any) => uw.isKnown)
          .map(
            (uw: any) =>
              allWords.find((w: any) => w._id === uw.wordId)?.wordTranslation,
          )
          .filter(Boolean)
      : [];

  const makeSentences = async () => {
    const result = await generateSentences(knownWordNames);
    const parsed = JSON.parse(result.sentences);
    setSentences(parsed);
    await saveSentences(parsed, user!.uid);
  };

  const loadSavedSentences = async () => {
    const result = await getSentences(user!.uid);
    setSavedSentences(result);
  };

  if (isPending) return <ActivityIndicator />;
  if (isError) return <Text>{error.message}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.TextHeader}>Generate Sentences</Text>
      <View style={{ marginVertical: 15 }}>
        <Button title="Generate Sentences" onPress={makeSentences} />
      </View>

      {sentences.map((item, index) => (
        <View key={index} style={sentenceStyles.card}>
          <Text style={sentenceStyles.sentence}>{item.sentence}</Text>

          <Text style={sentenceStyles.translation}>{item.translation}</Text>
        </View>
      ))}

      <View style={{ marginVertical: 15 }}>
        <Button title="Show Saved Sentences" onPress={loadSavedSentences} />
      </View>

      {savedSentences.map((item, index) => (
        <View key={index} style={sentenceStyles.card}>
          <Text style={sentenceStyles.sentence}>{item.sentenceText}</Text>
          <Text style={sentenceStyles.translation}>
            {item.englishTranslation}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
