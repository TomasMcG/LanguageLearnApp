import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
       fetch('http://10.0.2.2:3000')
      .then(res => res.text())
      .then(text => setMessage(text))
      .catch(err => setMessage('Error fetching backend'));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
});
