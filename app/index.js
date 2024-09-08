
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Pressable,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BigButton } from '../components/BigButton.js';

export default function Index() {
  
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>INDEX</Text>
        <BigButton  color = 'green'  title='Summary' nav='summary'/>
   
  
      <BigButton color='blue' title="Workers"  nav='workers'/>
      <StatusBar style="auto" />
    </View>
  )
}const styles = StyleSheet.create({
    container: {
        border: '1px solid red',
        
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-around',
    
      alignContent:'center',
    },
    header: {
      fontSize: 24,
      color: 'blue',
    },
    paragraph: {
      fontSize: 18,
      color: 'white',
      textTransform: 'uppercase',
    },
  

  });

