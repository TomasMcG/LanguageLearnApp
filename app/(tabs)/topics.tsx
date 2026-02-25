import { styles } from "@/styles/inputStyles";
import { WordStyles } from "@/styles/wordStyles";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { getTopics, getUsersWords, getWords } from "../../api/words-api";
import { auth } from "../../firebase";

export default function DisplayWordsScreen() {
  const [words, setWords] = useState<any[]>([]);
  const [usersWords, setUsersWords] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);

  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;
    console.log("Logged in user UID:", uid);
  } else {
    console.log("No user is logged in yet");
  }

  const getAllUsersWords = async () => {
    const gottenWords = await getUsersWords(user!.uid);
    console.log("Gotten Words:", gottenWords);
    setUsersWords(gottenWords);
  };
  const getAllWords = async () => {
    const gottenWords = await getWords();
    setWords(gottenWords);
  };

  const getAllTopics = async () => {
    const gottenWords = await getTopics();
    setTopics(gottenWords);
  };

  const router = useRouter();

  const learnTopicButton = (topicName: any) => {
    router.push(`/learn/${topicName}`);
  };

  useEffect(() => {
    getAllTopics();
    getAllWords();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.TextHeader}> Get Words Test Page</Text>
      <Text>User id:</Text>
      <Button title="Get user words" onPress={() => getAllUsersWords()} />
      <View style={WordStyles.Spacer}></View>

      <Text>Topics:</Text>

      {topics.map((topic) => {
        const wordsForTopic = words.filter(
          (word) => word.topicName === topic.topicName,
        );
        return (
          <View key={topic._id} style={WordStyles.TopicBox}>
            <Text style={WordStyles.TopicText}>{topic.topicName}</Text>
            <Button
              title="Learn"
              onPress={() => learnTopicButton(topic.topicName)}
            />
            <View style={WordStyles.Spacer} />
            <Text>Number of words: {wordsForTopic.length}</Text>
          </View>
        );
      })}
    </View>
  );
}
