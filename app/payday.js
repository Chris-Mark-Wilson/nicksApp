import { Text, View,Button, ScrollView, TextInput,Pressable, Alert,Keyboard } from "react-native";
import { styles } from "./payday_components/styles";
import { WorkerList } from "./workers_components/workerList";

import { useNavigation } from "expo-router";
import { useState,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Invoices = () => {
const navigation = useNavigation();

useEffect(() => {
  const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
    setIsKeyboard(true);
  });
  const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
    setIsKeyboard(false);
  });

  return () => {
    keyboardShowListener.remove();
    keyboardHideListener.remove();
  };
}, []);

const [date,setDate]=useState(new Date());
const [workers,setWorkers]=useState([]);
const [selectedWorker,setSelectedWorker]=useState({});  
const [jobs,setJobs]=useState([]);
const [paydays,setPaydays]=useState([]);
const [paid,setPaid]=useState(0); 
const [owed,setOwed]=useState(0);
const [amount,setAmount]=useState(0);
const [isKeyboard,setIsKeyboard]=useState(false);

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
  
  },[paydays]);

  useEffect(()=>{
    // work out the total paid and total owed for the selected worker
    if(selectedWorker && jobs.length>0){
      console.log('calculating wages',selectedWorker,jobs);
    const wageArray=calculateWages(selectedWorker,jobs);
    const totalPaid=wageArray[0];
    const totalOwed=wageArray[1];
    setPaid(totalPaid);
    setOwed(totalOwed-totalPaid);
    if(selectedWorker.paydays){
      setPaydays(selectedWorker.paydays.sort((a,b)=>{
        //sort paydays by date descending
        if(a.date>b.date){
          return -1;
        }
      }) || []);
    }
    }


  },[selectedWorker,jobs,paydays]);

  const calculateWages = (worker,jobs) => {
    const totalWorked=getTotalWorked(worker,jobs);//total of cash amount worker has worked based on his rate FOR THAT JOB!
    const totalPaid=getTotalPaid(worker);//total of cash amount worker has been paid from all payments ever made to them
    console.log('worker',worker);
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
     
          total+=payday.amount;
       
      });
    }
    return total;
  }

  const payWorker= async (worker,amount)=>{
    if(amount <=0){
      Alert.alert('Amount must be greater than 0');
      return;
    }
    console.log(worker,amount);
    const newPayday={date: date.toDateString(), amount: +amount};
    if(worker.paydays){
      worker.paydays.push(newPayday);
  } else {
    worker.paydays=[newPayday];
  }
   // replace worker in workers with new worker
    const newWorkers=workers.map((w)=>{
      if(w.name===worker.name){
        return worker;
      }
      return w;
    });
    await AsyncStorage.setItem('workers',JSON.stringify(newWorkers));
    setWorkers(newWorkers);
    Alert.alert(`Payment made - £${amount}`);
    setPaid((prev)=>prev+ +amount);
    setOwed((prev)=>prev- +amount);
   
  }

  const deleteEntry= (worker,index,paydaysArray)=>{
    //remove payday from worker.paydays in storage
    Alert.alert("Are you sure you want to delete this entry?", null, [
      {
        text: "Cancel",
        onPress: () => {
          return;
        },
        style: "cancel",
      },
      {
        text: "Delete Entry",
        onPress: () => {
          deletePayday(worker, index, paydaysArray);
        },
      },
    ]);
  }

const deletePayday= async (worker,index,paydaysArray)=>{
    const newPaydays=worker.paydays.filter((payday,i)=>{
      return i!==index;
    });
    worker.paydays=newPaydays;
    //replace worker in workers with new worker
    const newWorkers=workers.map((w)=>{
      if(w.name===worker.name){
        return worker;
      }
      return w;
    });
    setPaid(getTotalPaid(worker));
    await AsyncStorage.setItem('workers',JSON.stringify(newWorkers));
    setPaydays(newPaydays);
    Alert.alert('Entry Deleted');
  }



  return (
    <View style={styles.container}>
      <ScrollView style={styles.workerList}>

        <Text style={styles.header}>Select worker</Text>

        <WorkerList
          setSelectedWorker={setSelectedWorker}
          workers={workers}
          title="Workers"
        />


</ScrollView>
<View style={styles.workerList}>
  {selectedWorker.name && (
    <>    
    <View style={styles.viewItem}>
      <Text style={styles.header}>{selectedWorker.name}</Text>
      <Text style={styles.itemDetails}>Rate: £{selectedWorker.rate}/day</Text>
    </View>

    <View style={{...styles.viewItem,borderBottomWidth:0,width:'50%',justifyContent:'flex-start'}}>

      <Text style={styles.header}>Make Payment </Text>

        <View style={styles.linear}>
          <Text style={{fontSize:20}}>£</Text>
          <TextInput
          style={{...styles.textInput,width:'60%'}}
          placeholder="Amount"
          onChangeText={(text) => setAmount(text)}
          keyboardType="numeric"
          />
        </View>

        <Pressable style={styles.button} onPress={() => {
          payWorker(selectedWorker,amount);
        }}>
          <Text style={{width:'100%',fontSize:18,color:'red'}}>Pay</Text>
        </Pressable>
    </View>
    <View style={styles.viewItem}>
      <Text style={styles.itemDetails}>
        Total Paid:{paid}
      </Text>
      <Text style={styles.itemDetails}>
        Owed:{owed}
      </Text>
    </View>
    <ScrollView>
      <Text style={styles.header}>Payment History</Text>
      {paydays.length>0 
      ? paydays.map((payday,index,array)=>{
        return(
          <Pressable style={styles.viewItem} key={index} onPress={()=>{
         deleteEntry(selectedWorker,index,array);
          }}>
            <Text style={styles.itemDetails} >
            {payday.date} 
            </Text>
            <Text style={styles.itemDetails}>
              £{payday.amount}
            </Text>
          </Pressable>
        )
      })
    :
    <>
    <Text style={styles.item}>
      No Payment History
      </Text>
      </>
}
    </ScrollView>
    </>

  )}
</View>
        {!isKeyboard && <Pressable style={{...styles.button,width:'60%'}}
        
          onPress={() => navigation.navigate("index")}
        >
        <Text style={{width:'100%',fontSize:18,color:'red',textAlign:'center'}}>Back</Text>
        </Pressable>
      }
    </View>
       
  );
}

