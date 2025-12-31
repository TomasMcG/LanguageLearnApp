

import { styles } from '@/styles/inputStyles';
import { WordStyles } from '@/styles/wordStyles';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { getWords } from '../../api/words-api';


export default function DisplayWordsScreen() {



 const [words,setWords] = useState<any[]>([])




  const getAllWords= async () => {
    const gottenWords = await getWords()
setWords(gottenWords);
  };


  return (


  <View style={styles.container}>
        <Text style={styles.TextHeader}> Get Words Test Page</Text>
   <Button title="Get Words" onPress={getAllWords} />
  <View style = {WordStyles.Spacer}></View>


   {words.slice(0, words.length).map((word) => (
    <View key={word.wordId} >
      <Text style = {WordStyles.EnglishWord} >Word: {word.wordName}</Text>
      <Text style = {WordStyles.TranslatedWord} >Translation: {word.wordTranslation}</Text>
    </View>))}
        </View>

     
    );

  }
  
 
