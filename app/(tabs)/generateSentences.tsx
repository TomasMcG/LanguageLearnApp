import { styles } from "@/styles/inputStyles";
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

      <Button title="Generate Sentences" onPress={makeSentences} />

      {sentences.map((item, index) => (
        <View key={index}>
          <Text>{item.sentence}</Text>
          <Text>{item.translation}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
