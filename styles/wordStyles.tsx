import { StyleSheet } from 'react-native';

export const WordStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
   TextHeader: { fontSize:24},
  Spacer:{
    marginTop: 20,
    marginBottom: 20
  },
  EnglishWord: {width: "100%",
    borderWidth: 1,
    borderColor: "#0066ffff",   
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 5},
    TranslatedWord: {width: "100%",
    borderWidth: 1,
    borderColor: "#0066ffff",   
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#5996f1ff",
    marginBottom: 15},
  
});