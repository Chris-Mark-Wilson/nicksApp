import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View,ScrollView,TextInput,SafeAreaView,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pressable} from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const navigation = useNavigation();
  const [workers,setWorkers] = useState([{name:'Bob',rate:75},{name:'Bill',rate:100},{name:'Dave',rate:150}]);

  const [selectedWorker, setSelectedWorker] = useState(null);
  const [editedWorker, setEditedWorker] = useState(false);

  useEffect(()=>{
    const getWorkers = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('workers');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
      } catch(e) {
        console.log('error reading value');
      }
    }

  if(workers.length===0){
    getWorkers()
    .then((data)=>{
      setWorkers(data);
    })
  }
  
  },[workers])

  const selectWorker = (worker) => {
    setSelectedWorker(worker);
    console.log('worker', worker);
  }

  const addWorker = () => {
    setNewWorker(true);
    console.log('add worker');
  }
  const handleNameChange = (e) => {
    console.log( e.nativeEvent.text);
    setEditedWorker({...selectedWorker, name: e.nativeEvent.text});
  }
  const handleRateChange = (e) => {
    console.log( e.nativeEvent.text);
    setEditedWorker({...selectedWorker, rate: e.nativeEvent.text});
  }
  const editWorker = () => {
    console.log('edit worker');
    Alert.alert('Edit Worker', `Are you sure you want to edit ${selectedWorker.name}?`, [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('Cancel');
        },
      },
      {
        text: 'YES!!',
        onPress: () => {
          console.log('editing worker');
          const oldworker=workers.find((worker)=>worker.name===selectedWorker.name);
          const index=workers.indexOf(oldworker);
          setWorkers((workers)=>{
            const oldworker=workers.find((worker)=>worker.name===selectedWorker.name);
            const index=workers.indexOf(oldworker);
            workers[index]=editedWorker;
            return workers;
          });
          setSelectedWorker(null);
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={{ ...styles.workerList, flex: selectedWorker ? 0.2 : 0.6 }}>
        <ScrollView>
          <Text style={styles.header}>Workers</Text>
          {workers.map((worker, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  selectWorker(worker);
                }}
              >
                <Text style={styles.listItem}>
                  {worker.name} - £{worker.rate}/day
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {selectedWorker && (
        <SafeAreaView style={styles.workerDetails}>
          <Text style={styles.header}>Worker Details</Text>
          <View style={styles.item}>
            <Text style={styles.itemDetails}>Name: {selectedWorker.name}</Text>
            <TextInput style={styles.textInput}   placeholder="New name" onChange={handleNameChange} />
          </View>
          <View style={styles.item}>
            <Text style={styles.itemDetails}>
              Rate: £{selectedWorker.rate}/day
            </Text>
            <TextInput style={styles.textInput}    keyboardType="numeric" placeholder="New rate" onChange={handleRateChange} />
          </View>
          <View style={styles.bottom}>
            <Button
              title="Ok"
              onPress={editWorker}
            />
          </View>
        </SafeAreaView>
      )}

      {!selectedWorker && (
        <View style={styles.buttons}>
          <Button
            title="Add worker"
            onPress={() => {
              addWorker;   keyboardType="numeric"
            }}
          />
          <Button
            title="Home"
            onPress={() => {
              navigation.navigate("index");
            }}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    borderWidth: 5,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",

  
  },
  header: {
    fontSize: 24,
    color: "blue",
  },
  workerList: {
    borderColor: "red",
    borderWidth: 5,
    flex: 0.4,
    backgroundColor: "lightblue",

    padding: 20,

    // overflow: 'scroll',
    width: "80%",
  },
  listItem: {
    borderColor: "orange",
    borderWidth: 2,
    borderRadius:15,
    fontSize: 18,
    height: 30,
    margin:10,
    textAlign:'center',
    color: "black",
    // textTransform: 'uppercase',
  },
  workerDetails:{
    borderColor: "blue",
    borderWidth: 2,
    flex:0.7,
    width:'80%',
    backgroundColor: "lightblue",
  },
  buttons: {
    borderColor: "blue",
    borderWidth: 5,
    flex: 0.4,
    backgroundColor: "lightgreen",
    padding: 10,
    justifyContent: "space-around",

    width: "80%",
  },
  item:{
    flexDirection:'row',
  },
  itemDetails:{
    margin:10,
    fontSize: 18,
    color: "black",
  
  },
  textInput:{
    borderColor:'black',
    borderWidth:1,
    borderRadius:5,
    paddingTop:0,
    paddingLeft:5,
    width:100,
    height:30,
    margin:10,
  },
  bottom:{
    position:'absolute',
    width:'100%',
    bottom:20,
  }
});