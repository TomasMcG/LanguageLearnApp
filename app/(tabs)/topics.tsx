import { styles } from "@/styles/inputStyles";
import { WordStyles } from "@/styles/wordStyles";
import { topicStyles } from "@/styles/topicStyles";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View, ScrollView} from "react-native";
import { getTopics, getUsersWords, getWords } from "../../api/words-api";
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

  const getAllTopics = async () => {
    const gottenWords = await getTopics();
    setTopics(gottenWords);
  };

  const {
    data: usersWords,
    error,
    isPending,
    isError,
  } = useQuery<any[]>({
    queryKey: ["userWords", user?.uid],
  queryFn: () => getUsersWords(user!.uid)
  });

  const knownWords = usersWords
    ? usersWords
        .filter((word: any) => word.isKnown)
        .map((knownWords: any) => knownWords.wordId)
    : [];

  const router = useRouter();

  const reviseTopicButton = (topicName: any) => {
    router.push(`/revise/${topicName}`);
  };

  const learnTopicButton = (topicName: any) => {
    router.push(`/learn/${topicName}`);
  };


  useEffect(() => {
    getAllTopics();
    getAllWords();
  }, []);


  if (isPending) {
    return;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.TextHeader}> Get Words Test Page</Text>
      <Text>User id:</Text>

      <View style={WordStyles.Spacer}></View>

      <Text>Topics:</Text>

      {topics.map((topic) => {
        const wordsForTopic = words.filter(
          (word) => word.topicName === topic.topicName,
        );
        const knownWordsForTopic = wordsForTopic.filter((word) =>
          knownWords.includes(word._id),
        
        );

        const unknownWordsForTopic = wordsForTopic.filter(
          (word) => !knownWords.includes(word._id),
        );

           const now = new Date();
           const reviewWords = usersWords 
        ? usersWords.filter((userWord: any) => 
            userWord.isKnown && new Date(userWord.nextReviewDate) <= now
          )
        : [];
         
    

        let isTopicComplete;
        if (knownWordsForTopic.length === wordsForTopic.length) {
          isTopicComplete = "Complete";
        } else {
          isTopicComplete = "Incomplete";
        }

        return (
          <View key={topic._id}  style={topicStyles.card}>
            <Text style={topicStyles.title}>{topic.topicName}</Text>

          

        
              <View style={topicStyles.statsColumn}>
             <Text style={topicStyles.stat}>
      Total: {wordsForTopic.length}
    </Text>
            <Text style={topicStyles.stat}>
      Known: {knownWordsForTopic.length}
    </Text>
            <Text style={topicStyles.stat}>
      New: {unknownWordsForTopic.length}
    </Text>
    </View>

      <Text style={topicStyles.review}>
    For Review: {reviewWords.length}
  </Text>

  
     <View style={topicStyles.buttonWrapper}>
            <Button
              title="Learn"
              onPress={() => learnTopicButton(topic.topicName)}
            />
             </View>

             <View style={topicStyles.buttonWrapper}>
           
             <Button
              title="Revise"
              onPress={() => reviseTopicButton(topic.topicName)}
            />
            </View>
           
          </View>
        );
      })}
    </ScrollView>
  );
}
