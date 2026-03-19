import { styles } from "@/styles/inputStyles";
import { sentenceStyles } from "@/styles/sentenceStyles";
import { useState } from "react";
import { ActivityIndicator, Button, ScrollView, Text, View } from "react-native";
import { auth } from "../../firebase";
import { generateSentences ,getUsersWords, getWords} from "../../api/words-api";
import { useQuery } from "@tanstack/react-query";


export default function GenerateSentencesScreen() {
  const [sentences, setSentences] = useState<{ sentence: string; translation: string }[]>([]);

  const user = auth.currentUser;

  const { data: usersWords, isPending, isError, error } = useQuery<any[]>({
    queryKey: ["userWords", user?.uid],
    queryFn: () => getUsersWords(user!.uid),
  });

  const { data: allWords } = useQuery<any[]>({
  queryKey: ["words"],
  queryFn: () => getWords(),
});



    const knownWordNames: string[] = usersWords && allWords
  ? usersWords
      .filter((uw: any) => uw.isKnown)
      .map((uw: any) => allWords.find((w: any) => w._id === uw.wordId)?.wordName)
      .filter(Boolean)
  : [];

 const makeSentences = async () => {
  const result = await generateSentences(knownWordNames);
  setSentences(JSON.parse(result.sentences));
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
          <Text style={sentenceStyles.sentence}>
      {item.sentence}
    </Text>

    <Text style={sentenceStyles.translation}>
      {item.translation}
    </Text>
        </View>
      ))}
    </ScrollView>
  );
}
