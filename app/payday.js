import { Text, View,Button, ScrollView } from "react-native";
import { styles } from "./payday_components/styles";
import { WorkerList } from "./workers_components/workerList";

import { useNavigation } from "expo-router";
import { useState,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Invoices = () => {
const navigation = useNavigation();

const [date,setDate]=useState(new Date());
const [workers,setWorkers]=useState([]);
const [selectedWorker,setSelectedWorker]=useState(null);  
const [paid,setPaid]=useState(0); 
const [owed,setOwed]=useState(0);

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
  
  },[]);

  useEffect(()=>{
    // work out the total paid and total owed for the selected worker
    if(selectedWorker){
    const [totalPaid,totalOwed]=calculateWages(selectedWorker);
    setPaid(totalPaid);
    setOwed(totalOwed);
    }
  },[selectedWorker]);

  const calculateWages = (worker) => {
    const totalWorked=getTotalWorked(worker);//total of cash amount worker has worked based on his rate FOR THAT JOB!
    const totalPaid=getTotalPaid(worker);//total of cash amount worker has been paid from all payments ever made to them
    return [totalPaid,totalWorked];
 
  }
  
  const getTotalWorked=(worker)=>{
    const total=0;
    //iterate through all jobs,iterate through days worked
    //find the selected worker if exists in each day
    //if exists, add worker.rate to total
    //return total
  return total;
  }

  const getTotalPaid=(worker)=>{
    const total=0;
    //need a new paydays object in storage
    //if paydays exists
    //iterate through all paydays
    //find the selected worker IF EXISTS in each payday
    //add worker.paid to total
    return total;
  }



  return (
    <View style={styles.container}>
      <ScrollView style={styles.workerList}>

        <Text style={styles.header}>Payday</Text>

        <WorkerList
          setSelectedWorker={setSelectedWorker}
          workers={workers}
          title="Workers"
        />


</ScrollView>
<View style={styles.workerList}>
  {selectedWorker && (
    <>    
    <View style={styles.viewItem}>
      <Text style={styles.itemDetails}>{selectedWorker.name}</Text>
      <Text style={styles.itemDetails}>Rate: £{selectedWorker.rate}/day</Text>
    </View>
    <Text style={styles.header}>Pay the fucker</Text>
    <View style={styles.viewItem}>
      <Text style={styles.itemDetails}>
        Paid:{paid}
      </Text>
      <Text style={styles.itemDetails}>
        Owed:{owed}
      </Text>
    </View>
    </>

  )}
</View>
        <Button
          color="blue"
          title="Home"
          onPress={() => navigation.navigate("index")}
        />
    </View>
  );
}

