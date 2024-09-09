import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);

  const [selectedJob, setSelectedJob] = useState(null);
  const [editedJob, setEditedJob] = useState(null);
  const [newJob, setNewJob] = useState(null);

  const [jobName, setJobName] = useState('');
  const [jobAddress, setJobAddress] = useState('');
  const [jobPrice, setJobPrice] = useState(0);

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
        setJobs(data);
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

  const addJob = () => {
    console.log(newJob);
    if(newJob.name.length===0){
      Alert.alert('Error','Job name must not be empty');
      return;
    }

    if(newJob.address.length===0){
      Alert.alert('Error','Wheres this job at then? It must have an address...');
      return;
    }

    if (jobs.find((job) => job.jobName === newJob.jobName)) {
      Alert.alert('Error', 'Job name already exists');
      return;
    }

    if (newJob.price <= 0 || isNaN(newJob.jobPrice)) {
      Alert.alert('Error', 'No love jobs allowed! price must be greater than 0');
      return;
    }

    const updatedJobs = [...JSON.parse(JSON.stringify(jobs)), newJob];
    setJobs(updatedJobs);
    AsyncStorage.setItem('jobs', JSON.stringify(updatedJobs));
    setNewJob(null);
  };

  const editJob = () => {
    console.log(editedJob);
    if (editedJob.price <= 0 || isNaN(editedJob.price)) {
      Alert.alert('Error', 'Job cannot be free');
      return;
    }
    if (editedJob.name.length === 0) {
      Alert.alert('Error', 'Job name must not be empty');
      return;
    }

    Alert.alert(
      "Edit Job",
      `Are you sure you want to edit ${selectedJob.name}?`,
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel");
          },
        },
        {
          text: "YES!!",
          onPress: () => {
            const index = jobs.findIndex(
              (job) => job.name === selectedJob.name
            );
            const newJobs = JSON.parse(JSON.stringify(jobs));
            newJobs[index] = editedJob;
            setJobs(newJobs);
            AsyncStorage.setItem("jobs", JSON.stringify(newJobs)); // Update AsyncStorage

            setSelectedJob(null);
            setEditedJob({});
          },
        },
      ]
    );
  };

  const handleDelete = () => {
    if (selectedJob) {
      Alert.alert('Delete Job', `Are you sure you want to delete ${selectedJob.name}?`, [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel');
          },
        },
        {
          text: 'YES!!',
          onPress: () => {
            console.log('deleting job');

            setJobs((jobs) => {
              const newJobs = jobs.filter((job) => job.name !== selectedJob.name);
              return newJobs;
            });
            AsyncStorage.setItem('jobs', JSON.stringify(jobs)); // Update AsyncStorage

            setSelectedJob(null);
          },
        },
      ]);
    }
  };

  const changeSelectedJob = (job) => {
    console.log('changeSelectedJob', job);
    setSelectedJob(job);
  };

  return (
    <View style={styles.container}>
      {/* JOB LIST  */}
      {!selectedJob && !newJob && !selectCustomer &&(
        <View
          style={{
            ...styles.jobList,
            display: selectedJob || newJob ? 'none' : 'flex',
          }}
        >
          <ScrollView>
            <Text style={styles.header}>Jobs</Text>
            {jobs.length > 0 ? 
              jobs.map((job, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      changeSelectedJob(job);
                    }}
                  >
                    <Text style={styles.listItem}>{job.name}</Text>
                  
                
                  </Pressable>
            )}) : 
              <Text>No jobs to show</Text>
            }
          </ScrollView>
        </View>
      )}

      {/*  EDIT JOB  */}
      {selectedJob && (<>
        <ScrollView style={styles.jobDetails}>
          <Text style={styles.header}>Job Details</Text>
          <View style={styles.item}>
            <Text style={styles.itemDetails}>Job name: {selectedJob.name}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="New job name"
              onChange={(e) => {
                setEditedJob({
                  ...selectedJob,
                  name: e.nativeEvent.text,
                });
              }}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.itemDetails}>Quoted Price: £{selectedJob.price}</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="New rate"
              onChange={(e) => {
                setEditedJob({
                  ...selectedJob,
                  price: e.nativeEvent.text,
                });
              }}
            />
          </View>

            </ScrollView>
          <View style={{ ...styles.buttons}}>
            {editedJob && <Button title="Save" onPress={editJob} />}

            <Button
              title="Back"
              onPress={() => {
                setEditedJob(null);
                setSelectedJob(null);
              }}
            />
          </View>
          <View style={styles.bottom}>
            <Button color="red" title="Delete" onPress={handleDelete} />
          </View>
          </>
      )}

      {/*  ADD JOB  */}
      {newJob && !selectCustomer &&(
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
              onChange={(e) => {setNewJob({...newJob,price:e.nativeEvent.text})}}
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
      )}

      {/*  SELECT CUSTOMER  */}
      {selectCustomer &&(
        <>
          <Text style={styles.header}>Select Customer</Text>
         <ScrollView style={styles.jobList}>
            {customers.length > 0 && 
              customers.map((customer, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setNewJob({...newJob,customer:customer.name});
                      setSelectCustomer(false);
                    }}
                  >
                    <Text style={styles.listItem}>{customer.name}</Text>
                   
                  </Pressable>
            )})
            }
          </ScrollView>
        
          <View style={styles.bottom}>
            <Button
              title="Back"
              onPress={() => {
                setSelectCustomer(false);
              }}
            />
         
         </View>
         </>
      )}

      {/*  NAV BUTTONS  */}
      {!selectedJob && !newJob && !selectCustomer &&(
        <View style={styles.buttons}>
          <Button
            title="Add Job"
            onPress={() => {
              setNewJob({ jobName: '', jobPrice: 0 });
            }}
          />
          <Button
            title="Home"
            onPress={() => {
              navigation.navigate('index');
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
    borderColor: 'red',
    borderWidth: 5,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 24,
    color: 'blue',
  },
  jobList: {
    borderColor: 'red',
    borderWidth: 5,
    flex: 1,
    backgroundColor: 'lightblue',
    padding: 20,
    width: '100%',
  },
  listItem: {
    borderColor: 'orange',
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 18,
    height: 30,
    margin: 10,
    textAlign: 'center',
    color: 'black',
  },
  jobDetails: {
    borderColor: 'blue',
    borderWidth: 2,
    flex: 1,
    padding:10,
    width: '100%',
    backgroundColor: 'lightblue',
  },
  buttons: {
    borderColor: 'blue',
    borderWidth: 5,
    flex: 0.4,
    backgroundColor: 'lightgreen',
    padding: 10,
    justifyContent: 'space-around',
    width: '100%',
  },
  item: {
   justifyContent: 'space-between',
    flexDirection: 'column',
    marginBottom:10,
    width: '100%',
  },
  itemDetails: {
    margin: 0,
    fontSize: 18,
    color: 'black',
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
   paddingLeft:10,
    width: '100%',
    height: 30,
   
  },
  bottom: {
  margin:20
  },
});