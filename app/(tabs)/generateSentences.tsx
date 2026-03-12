import { styles } from "@/styles/inputStyles";
import { WordStyles } from "@/styles/wordStyles";
import { useState } from "react";
import { Button, Text, View } from "react-native";
import { getWords } from "../../api/words-api";
import { auth } from "../../firebase";

export default function DisplayWordsScreen() {
  const [words, setWords] = useState<any[]>([]);

  const [topics, setTopics] = useState<any[]>([]);

  let user = auth.currentUser;
  if (user) {
    const uid = user.uid;
    console.log("Logged in user UID:", uid);
  } else {
    console.log("No user is logged in yet");
  }

  const getAllWords = async () => {
    const gottenWords = await getWords();
    setWords(gottenWords);
  };

  const makeSentences = async () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.TextHeader}> Generate Sentences Test Page</Text>
      <Text>User id:</Text>

      <View style={WordStyles.Spacer}></View>

      <Text>Make Sentences:</Text>
      <Button title="MakeSentences" onPress={() => makeSentences()} />
    </View>
  );
}
