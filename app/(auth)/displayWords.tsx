

import { styles } from '@/styles/inputStyles';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { getWords } from '../../api/words-api';

export default function DisplayWordsScreen() {



 const [newWords,setWords] = useState<string>()




  const getAllWords= async () => {
    const gottenWords = await getWords()
    

    
        setWords(JSON.stringify(gottenWords));
        
   
  };


  return (


  <View style={styles.container}>
        <Text style={styles.TextHeader}> Get Words Test Page</Text>
   <Button title="Get Words" onPress={getAllWords} />
         <Text  style={[styles.TextHeader,styles.buttonSpace]}>{newWords}</Text>

        </View>
    );
  }
  
 
