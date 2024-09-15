import { Button, Alert,SafeAreaView, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";


export const AddWorker=({newWorker,setNewWorker,workers,setWorkers})=>{

  const addWorker = () => {
    if(workers.find((worker)=>worker.name===newWorker.name)){
      Alert.alert('Error','Worker already exists');
      return;
     }
     if(newWorker.rate<=0){
       Alert.alert('Error','Rate must be greater than 0');
       return;
     }
 
     setWorkers([...workers,newWorker]);
     AsyncStorage.setItem('workers',JSON.stringify([...workers,newWorker]));
     setNewWorker(null);
   }

    return (
        <SafeAreaView style={styles.workerDetails}>
        <Text style={styles.header}>Add Worker</Text>
        <View style={styles.item}>
          <Text style={styles.itemDetails}>Name: </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            onChange={(e) => {
              setNewWorker({ ...newWorker, name: e.nativeEvent.text });
            }}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemDetails}>Rate: </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            placeholder="Rate"
            onChange={(e) => {
              setNewWorker({ ...newWorker, rate: Number(e.nativeEvent.text) });
            }}
          />
        </View>

        {newWorker&&
        <Button title="Save" onPress={addWorker} />
        }

        <View style={styles.bottom}>
          <Button
            title="Back"
            onPress={() => {
              setNewWorker(null);
            }}
          />
        </View>
      </SafeAreaView>
    )
}