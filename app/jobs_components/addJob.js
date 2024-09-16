import { styles } from "./styles"
import { ScrollView, Text, View, TextInput, Button,Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";


export const AddJob = ({newJob,setNewJob,setSelectCustomer,setJobs,jobs}) => {  

    const addJob = () => {
      if(newJob.name.length===0){
        Alert.alert('Error','Job name must not be empty');
        return;
      }
      
      if(newJob.address.length===0){
        Alert.alert('Error','Wheres this job at then? It must have an address...');
          return;
        }
    
        if (jobs.find((job) => job.name === newJob.name)) {
          Alert.alert('Error', 'Job name already exists');
          return;
        }
        
        if (newJob.price <= 0 || isNaN(newJob.price)) {
          Alert.alert('Error', 'No love jobs allowed! price must be greater than 0');
          return;
        }
        newJob.fuel=[];
        newJob.materials=[];
        newJob.dates_worked=[];
        newJob.extras=[];
        newJob.completed=false;
        console.log('new job',newJob);
        const updatedJobs = [...JSON.parse(JSON.stringify(jobs)), newJob];
        setJobs(updatedJobs);
        AsyncStorage.setItem('jobs', JSON.stringify(updatedJobs));
        setNewJob(null);
      };
    
    

return (

<ScrollView style={styles.jobDetails}>
<Text style={styles.header}>Add Job</Text>
  {newJob.customer?
  <View style={styles.item}>
    <Text style={styles.itemDetails}>
    Customer: {newJob.customer}
    </Text>
    </View>
  :
  <View style={styles.item}>
  <Button color='green' title="Add Customer" onPress={()=>{setSelectCustomer(true)}}/>
  </View>
  }
{newJob.customer &&
<>

<View style={styles.item}>
  <Text style={styles.itemDetails}>Job name: </Text>
  <TextInput
    style={styles.textInput}
    placeholder="Job name"
    onChange={(e) => {setNewJob({...newJob,name:e.nativeEvent.text})}}
  />
</View>

 <View style={styles.item}>
  <Text style={styles.itemDetails}>Job address: </Text>
  <TextInput
    style={styles.textInput}
    placeholder="Job address"
    onChange={(e) => {setNewJob({...newJob,address:e.nativeEvent.text})}}
  />
</View>


<View style={styles.item}>
  <Text style={styles.itemDetails}>Quoted Price: </Text>
  <TextInput
    style={styles.textInput}
    keyboardType="numeric"
    placeholder="Quoted price"
    onChange={(e) => {setNewJob({...newJob,price:+e.nativeEvent.text})}}
  />
</View>
<Button title="Save" onPress={addJob} />
</>
}
<View style={styles.bottom}>
  <Button
    title="Back"
    onPress={() => {
      setNewJob(null);
    }}
  />
</View>
</ScrollView>

)
}