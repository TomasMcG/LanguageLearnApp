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


   card: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },

  mainWord: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },

  subHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 20,
  },

  sentenceBox: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
  },

  sentenceEn: {
    fontSize: 14,
    color: "#333",
  },

  sentenceDe: {
    fontSize: 14,
    color: "#666",
  },

  buttonWrap: {
    marginTop: 20,
    alignItems: "center",
  },

  buttonRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  }
});
