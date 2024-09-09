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
  const [customerDetails, setCustomerDetails] = useState({name:null,email:null,phone:null});
  const [workers,setworkers] = useState([]);


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

  // useEffect(() => {
  //   console.log('selected effect', selectedJob);
  // }, [selectedJob]);

  const addJob = () => {
    console.log(newJob);
    if (jobs.find((job) => job.jobName === newJob.jobName)) {
      Alert.alert('Error', 'Job name already exists');
      return;
    }
    if (newJob.jobPrice <= 0) {
      Alert.alert('Error', 'Rate must be greater than 0');
      return;
    }

    const updatedJobs = [JSON.parse(JSON.stringify(jobs)), newJob];
    setJobs(updatedJobs);
    AsyncStorage.setItem('jobs', JSON.stringify(updatedJobs));
    setNewJob(null);
  };

  const editJob = () => {
    console.log(editedJob);
    if (editedJob.jobPrice <= 0 || isNaN(editedJob.jobPrice)) {
      Alert.alert('Error', 'Job cannot be free');
      return;
    }
    if (editedJob.jobName.length === 0) {
      Alert.alert('Error', 'Job name must not be empty');
      return;
    }

    Alert.alert(
      "Edit Job",
      `Are you sure you want to edit ${selectedJob.jobName}?`,
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
              (job) => job.jobName === selectedJob.jobName
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
      Alert.alert('Delete Job', `Are you sure you want to delete ${selectedJob.jobName}?`, [
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
              const newJobs = jobs.filter((job) => job.jobName !== selectedJob.jobName);
              AsyncStorage.setItem('jobs', JSON.stringify(newJobs)); // Update AsyncStorage
              return newJobs;
            });

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
      {!selectedJob && !newJob && (
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
                    <Text style={styles.listItem}>{job.customerDetails.name}</Text>
                    <Text style={styles.listItem}>{job.jobName}</Text>
                
                  </Pressable>
            )}) : 
              <Text>No jobs to show</Text>
            }
          </ScrollView>
        </View>
      )}

      {/*  EDIT JOB  */}
      {selectedJob && (
        <ScrollView style={styles.jobDetails}>
          <Text style={styles.header}>Job Details</Text>
          <View style={styles.item}>
            <Text style={styles.itemDetails}>Job name: {selectedJob.jobName}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="New job name"
              onChange={(e) => {
                setEditedJob({
                  ...selectedJob,
                  jobName: e.nativeEvent.text,
                });
              }}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.itemDetails}>Price: £{selectedJob.jobPrice}</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="New rate"
              onChange={(e) => {
                setEditedJob({
                  ...selectedJob,
                  jobPrice: e.nativeEvent.text,
                });
              }}
            />
          </View>
          <View style={styles.bottom}>
            <Button color="red" title="Delete" onPress={handleDelete} />
          </View>

          <View style={{ ...styles.buttons, flex: 0.8 }}>
            {editedJob && <Button title="Save" onPress={editJob} />}

            <Button
              title="Back"
              onPress={() => {
                setEditedJob(null);
                setSelectedJob(null);
              }}
            />
          </View>
        </ScrollView>
      )}

      {/*  ADD JOB  */}
      {newJob && (
        <ScrollView style={styles.jobDetails}>
          <Text style={styles.header}>Add Job</Text>

          <View style={styles.item}>
            <Text style={styles.itemDetails}>Job name: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Job name"
              onChange={(e) => {setJobName(e.nativeEvent.text)}}
            />
          </View>

           <View style={styles.item}>
            <Text style={styles.itemDetails}>Job address: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Job address"
              onChange={(e) => {setJobAddress(e.nativeEvent.text)}}
            />
          </View>

          <Text style={styles.itemDetails}>Customer Details</Text>
            <View style={styles.item}>
              <Text style={styles.itemDetails}>Name: </Text>
              <TextInput
                style={styles.textInput}
               
                placeholder="Customer name"
                onChange={(event) => {
                  event.persist();
                  setCustomerDetails((details)=>{
                  return {...details,name:event.nativeEvent.text}
                })}}
              />
            </View>

            <View style={styles.item}>
              <Text style={styles.itemDetails}>Address: </Text>
              <TextInput
                style={styles.textInput}
                placeholder="Customer address"
                onChange={(e) => {setJobPrice(e.nativeEvent.text)}}
              />
            </View>
          <View style={styles.item}>
            <Text style={styles.itemDetails}>Price: </Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="Price"
              onChange={(e) => {setJobPrice(e.nativeEvent.text)}}
            />
          </View>
          <Button title="Save" onPress={addJob} />
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

      {/*  NAV BUTTONS  */}
      {!selectedJob && !newJob && (
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
   
    width: '100%',
    height: 30,
   
  },
  bottom: {
  margin:20
  },
});