import { StyleSheet } from "react-native";

export const WordStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },

  text: { fontSize: 24, fontWeight: "bold" },

  TextHeader: { fontSize: 24 },

  Spacer: {
    marginTop: 20,
    marginBottom: 20,
  },

  EnglishWord: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#0066ffff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 5,
  },
  TranslatedWord: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#0066ffff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#5996f1ff",
    marginBottom: 15,
  },

  TopicBox: {
    width: "100%",
    backgroundColor: "#E8F0FF",
    borderColor: "#0066ff",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  TopicText: {
    fontSize: 18,
    color: "#0066ff",
    fontWeight: "bold",
  },
});
