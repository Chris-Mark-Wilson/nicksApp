import { StatusBar } from 'expo-status-bar';
import {  View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Joblist} from './jobs_components/joblist';
import { AddJob } from './jobs_components/addJob';
import { SelectCustomer } from './jobs_components/selectCustomer';
import { NavButtons } from './jobs_components/navButtons';
import { ViewJob } from './jobs_components/viewJob';
import { styles } from './jobs_components/styles';

export default function Index() {

  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editedJob, setEditedJob] = useState(null);
  const [newJob, setNewJob] = useState(null);
  const [editWorkers,setEditWorkers] = useState(false);
  const [customers,setCustomers] = useState([]);
  const [selectCustomer,setSelectCustomer] = useState(false);


  useEffect(() => {
    console.log('fired effect');
    const getJobs = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('jobs');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
      } catch (e) {
        console.log('error reading value',e);
      }
    };

    if (jobs.length === 0) {
      getJobs().then((data) => {
        console.log('data',data);
        setJobs([...data]);
      });
    }
  }, []);

  useEffect(() => {
   if(selectCustomer){
    console.log('selectCustomer',selectCustomer);
    AsyncStorage.getItem('customers')
    .then((data)=>{
      setCustomers(JSON.parse(data));
    })
   }
  }, [selectCustomer]);

    
  
 

  return (
    <View style={styles.container}>

     
      {!selectedJob && !newJob && !selectCustomer &&(
        <Joblist 
        jobs={jobs}
        selectedJob={selectedJob} 
        setSelectedJob={setSelectedJob} 
        newJob={newJob}/>
      )}

   
      {selectedJob && (
        <ViewJob
          editedJob={editedJob}
          setEditedJob={setEditedJob}
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
          editWorkers={editWorkers}
          setEditWorkers={setEditWorkers}
          jobs={jobs}
          setJobs={setJobs}
        />
        
      )}

      {newJob && !selectCustomer &&(
      <AddJob
        newJob={newJob}
        setNewJob={setNewJob}
        setSelectCustomer={setSelectCustomer}
        setJobs={setJobs}
        jobs={jobs}
        
      />
      )}

  
      {selectCustomer &&(
       <SelectCustomer
        setNewJob={setNewJob}
        setSelectCustomer={setSelectCustomer}
        newJob={newJob}
        customers={customers}
        />
      )}

     
      {!selectedJob && !newJob && !selectCustomer &&
        <NavButtons
          setNewJob={setNewJob}
          navigation={navigation}
        />  
      }

      <StatusBar style="auto" />
    </View>
  );
}

