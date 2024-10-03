import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WorkerList } from './workers_components/workerList';
import { EditWorker } from './workers_components/editWorker';
import { AddWorker } from './workers_components/addWorker';
import { NavButtons } from './workers_components/navButtons';

export default function Index() {
  const navigation = useNavigation();
  const [workers,setWorkers] = useState([]);

  const [selectedWorker, setSelectedWorker] = useState(null);
  const [editedWorker, setEditedWorker] = useState(null);
  const [newWorker, setNewWorker] = useState(null);

  useEffect(()=>{
  console.log('fired effect');
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
  
  },[]);

  return (
    <View style={styles.container}>
      {/* WORKER LIST  */}
      {!selectedWorker && !newWorker && 
        <WorkerList
        workers={workers}
        setSelectedWorker={setSelectedWorker}
        />
      }

      {/*  ADD WORKER  */}
      {newWorker && 
      <AddWorker
        newWorker={newWorker}
        setNewWorker={setNewWorker}
        workers={workers}
        setWorkers={setWorkers}
      />
      }

      {/*  EDIT WORKER  */}
      {selectedWorker &&       
      <EditWorker
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
        editedWorker={editedWorker}
        setEditedWorker={setEditedWorker}
        workers={workers}
        setWorkers={setWorkers}
      />
      }


      {/*  NAV BUTTONS  */}
      {!selectedWorker && !newWorker && 
      <NavButtons
        setNewWorker={setNewWorker}
        navigation={navigation}
      />
      }

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
 
    flex: 1,
    backgroundColor: "#d4d4d4",
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
    flex: 1,
    backgroundColor: "lightblue",
    padding: 10,
    width: "100%",
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
    flex:1,
    width:'100%',
  
    backgroundColor: "lightblue",
  },
  buttons: {
    borderColor: "blue",
    borderWidth: 5,
    flex: 0.4,
    backgroundColor: "lightgreen",
    padding: 10,
    justifyContent: "space-around",

    width: "100%",
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