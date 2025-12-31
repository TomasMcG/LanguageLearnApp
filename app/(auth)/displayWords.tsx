

import { styles } from '@/styles/inputStyles';
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
  


   {words.slice(0, words.length).map((word) => (
    <View key={word.wordId} >
      <Text >{word.wordName}</Text>
      <Text >{word.wordTranslation}</Text>
    </View>))}
        </View>

     
    );

  }
  
 
