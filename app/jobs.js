import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Jobs() {
  const navigation = useNavigation();
  return (
    // <View style={styles.container}>
    <>
    <Text style={styles.header}>Summary</Text>
      <Text>pararaph 1 sits up here like this</Text>
      <Text>pararaph 2 sits up here like this</Text>
<Button title="Go to Index" onPress={() => navigation.navigate('index')} />
      </>
    //   <StatusBar style="auto" />
    // </View>
  );
}
const styles = StyleSheet.create({
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

