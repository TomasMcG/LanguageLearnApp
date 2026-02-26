import { styles } from "@/styles/inputStyles";
import { WordStyles } from "@/styles/wordStyles";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
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
  } = useQuery({
    queryKey: ["userWords"],
    queryFn: () => getUsersWords(user!.uid),
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
    <View style={styles.container}>
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
          <View key={topic._id} style={WordStyles.TopicBox}>
            <Text style={WordStyles.TopicText}>{topic.topicName}</Text>
            <View style={WordStyles.Spacer} />
              <Text>Progress: {isTopicComplete}</Text>
            <Text>Number of words: {wordsForTopic.length}</Text>
            <Text>Number of known words:{knownWordsForTopic.length}</Text>
            <Text>Unkown Words: {unknownWordsForTopic.length} </Text>
            <Button
              title="Learn"
              onPress={() => learnTopicButton(topic.topicName)}
            />
            <Text>Words for Review: {reviewWords.length}</Text>
             <Button
              title="Revise"
              onPress={() => reviseTopicButton(topic.topicName)}
            />
          </View>
        );
      })}
    </View>
  );
}
