import { styles } from "@/styles/inputStyles";
import { sentenceStyles } from "@/styles/sentenceStyles";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  generateSentences,
  getSentences,
  getTopics,
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
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const { data: topics } = useQuery<any[]>({
    queryKey: ["topics"],
    queryFn: () => getTopics(),
  });
  const [isGenerating, setIsGenerating] = useState(false);

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

  const toggleTopic = (topicName: string) => {
    const topicWords = knownWords
      .filter((w: any) => w.topicName === topicName)
      .map((w: any) => w.wordTranslation);

    const allSelected = topicWords.every((t: string) => selectedWords.has(t));

    //for selecting or deselcting all the words that i have in the topics.
    setSelectedWords((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        topicWords.forEach((t: string) => next.delete(t));
      } else {
        topicWords.forEach((t: string) => next.add(t));
      }
      return next;
    });
  };

  const knownWords =
    usersWords && allWords
      ? usersWords
          .filter((uw: any) => uw.isKnown)
          .map((uw: any) => allWords.find((w: any) => w._id === uw.wordId))
          .filter(Boolean)
      : [];
  //toggling words on and off to set for generating sentences
  const toggleWord = (wordTranslation: string) => {
    setSelectedWords((prev) => {
      const next = new Set(prev);
      next.has(wordTranslation)
        ? next.delete(wordTranslation)
        : next.add(wordTranslation);
      return next;
    });
  };

  //checks if all words for a topic are selected.
  const isTopicSelected = (topicName: string) => {
    const topicWords = knownWords
      .filter((w: any) => w.topicName === topicName)
      .map((w: any) => w.wordTranslation);
    return (
      topicWords.length > 0 &&
      topicWords.every((t: string) => selectedWords.has(t))
    );
  };

  const makeSentences = async () => {
    const wordsToUse =
      selectedWords.size > 0
        ? Array.from(selectedWords)
        : knownWords.map((w: any) => w.wordTranslation);

    try {
      setIsGenerating(true);
      const result = await generateSentences(wordsToUse);
      const parsed = JSON.parse(result.sentences);
      setSentences(parsed);
      await saveSentences(parsed, user!.uid);
    } finally {
      setIsGenerating(false);
    }
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
      <Text style={styles.TextHeader}>Select Words</Text>

      {topics?.map((topic: any) => {
        const wordsForTopic = knownWords.filter(
          (w: any) => w.topicName === topic.topicName,
        );
        if (wordsForTopic.length === 0) return null;

        return (
          <View key={topic._id} style={{ marginBottom: 16 }}>
            <TouchableOpacity
              onPress={() => toggleTopic(topic.topicName)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
                padding: 8,
                backgroundColor: isTopicSelected(topic.topicName)
                  ? "blue"
                  : "#eee",
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: isTopicSelected(topic.topicName) ? "white" : "black",
                }}
              >
                {topic.topicName}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: isTopicSelected(topic.topicName) ? "white" : "grey",
                }}
              >
                (tap to select all)
              </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {wordsForTopic.map((word: any) => (
                <TouchableOpacity
                  key={word._id}
                  onPress={() => toggleWord(word.wordTranslation)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: "blue",
                    backgroundColor: selectedWords.has(word.wordTranslation)
                      ? "blue"
                      : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color: selectedWords.has(word.wordTranslation)
                        ? "white"
                        : "blue",
                    }}
                  >
                    {word.wordTranslation}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      })}

      <View style={{ marginVertical: 15 }}>
        {isGenerating ? (
          <ActivityIndicator />
        ) : (
          <Button title="Generate Sentences" onPress={makeSentences} />
        )}
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
