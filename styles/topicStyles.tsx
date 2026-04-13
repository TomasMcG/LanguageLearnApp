import { StyleSheet } from "react-native";

export const topicStyles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },

  progress: {
    fontSize: 14,
    marginBottom: 10,
    color: "#666",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  stat: {
    fontSize: 13,
    color: "#444",
  },

  review: {
    fontSize: 13,
    marginBottom: 12,
    color: "#888",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 5,
  },

  statsColumn: {
  marginBottom: 10,
},

buttonWrapper: {
  flex: 1,
  marginHorizontal: 4,
  marginTop: 10,
},
});