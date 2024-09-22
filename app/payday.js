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
const [jobs,setJobs]=useState([]);
const [paydays,setPaydays]=useState([]);
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
    const getJobs = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('jobs');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
      } catch(e) {
        console.log('error reading value');
      }
    }
    if(!jobs.length){
      getJobs()
      .then((data)=>{
        setJobs(data);
      }
    )}

  if(workers.length===0){
    getWorkers()
    .then((data)=>{
      setWorkers(data);
    })
  }
  
  },[]);

  useEffect(()=>{
    // work out the total paid and total owed for the selected worker
    if(selectedWorker && jobs.length>0){
      console.log('calculating wages',selectedWorker,jobs);
    const [totalPaid,totalOwed]=calculateWages(selectedWorker,jobs);
    setPaid(totalPaid);
    setOwed(totalOwed);
    }
  },[selectedWorker,jobs]);

  const calculateWages = (worker,jobs) => {
    const totalWorked=getTotalWorked(worker,jobs);//total of cash amount worker has worked based on his rate FOR THAT JOB!
    const totalPaid=getTotalPaid(worker);//total of cash amount worker has been paid from all payments ever made to them
    console.log('paid',totalPaid);
    console.log('worked',totalWorked);  
    return [totalPaid,totalWorked];
 
  }
  
  const getTotalWorked=(worker,jobs)=>{
    let total=0;
    //iterate through all jobs,iterate through days worked
    //find the selected worker if exists in each day
    //if exists, add worker.rate to total
    //return total
jobs.forEach((job)=>{
  if(!job.dates_worked){
    return;
  }
  console.log('Dates_worked',job.dates_worked);
  job.dates_worked.forEach((day)=>{
    console.log('Day',day);
    console.log('Worker',worker);
    day.workers.forEach((w)=>{
    if(w.name===worker.name){
      total+=worker.rate;
    }
  });
});
});
  return total;
  }

  const getTotalPaid=(worker)=>{
    let total=0;
    //need a new paydays object in workers.worker.paydays, array of paydays, payday = {date: date, amount: amount}
    //if paydays exists
    //iterate through all paydays
    //if payday.date is before or equal to today
    //add worker.paid to total
    //return total
    if(worker.paydays){
      worker.paydays.forEach((payday)=>{
        if(payday.date<=date){
          total+=payday.amount;
        }
      });
    }
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

