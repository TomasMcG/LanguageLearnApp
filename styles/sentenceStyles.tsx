import { StyleSheet } from "react-native";

export const sentenceStyles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  sentence: {
    fontSize: 16,
    color: "#222",
    marginBottom: 6,
  },

  translation: {
    fontSize: 15,
    color: "#666",
    fontStyle: "italic",
  },
});