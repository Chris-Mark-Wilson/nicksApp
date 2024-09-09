
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Pressable,Button,Alert, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BigButton } from '../components/BigButton.js';

export default function Index() {


  const handleReset = () => {
    console.log("resetting database");
    Alert.alert(
      "Reset Database",
      "Are you sure you want to reset the database?",
      [
        {
          text: "Yes!!",
          onPress: () => {
            AsyncStorage.clear();
            console.log("Database cleared");
          },
        },
        {
          text: "No!!",
          onPress: () => {
            console.log("Database not cleared");
          },
        },
      ]
    );
  };
  
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <Text style={styles.header} > INDEX </Text>
        <BigButton color="green" title="Jobs" nav="jobs" />

        <BigButton color="orange" title="Customers" nav="customers" />

        <BigButton color="blue" title="Workers" nav="workers" />

        <BigButton color="purple" title="Payday" nav="payday" />

        <Button color="red" title="RESET DATABASE" onPress={handleReset} />
        <StatusBar style="auto" />
      </View>
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

