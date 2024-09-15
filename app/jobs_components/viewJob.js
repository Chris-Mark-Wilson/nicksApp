import { Keyboard,Button, Text, TextInput, View, Alert,ScrollView } from "react-native";
import { useState,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import { SelectWorkers } from "./selectWorkers";  
import DateTimePicker from '@react-native-community/datetimepicker';
import { UpdateCosts } from "./updateCosts";

export const ViewJob = ({editedJob,setEditedJob,selectedJob,setSelectedJob,editWorkers,setEditWorkers,jobs,setJobs}) => {

    useEffect(()=>{
    const keyboardShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setIsKeyboard(true);
        }
    );
    const keyboardHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setIsKeyboard(false);
        }
    );

    return () => {
        keyboardShowListener.remove();
        keyboardHideListener.remove();
    };
},[]);

    const [isEdited, setIsEdited] = useState(false);
    const [isKeyboard, setIsKeyboard] = useState(false);

    const [update,setUpdate]=useState(false);
    const todaysDate = new Date().toDateString();  

    const [materialsCost, setMaterialsCost] = useState(0);
    const [wages, setWages] = useState(0);
    const [totalExtras, setTotalExtras] = useState(0);
    const [totalCosts, setTotalCosts] = useState(0);

    useEffect(()=>{
      setMaterialsCost(selectedJob.materials.length>0 ?
      selectedJob.materials.reduce((acc, material) => acc + material.cost, 0)
      :0);

      setWages(selectedJob.dates_worked.length>0 ?
      selectedJob.dates_worked.reduce((acc, day) => acc + day.workers.reduce((acc,worker)=>acc + worker.rate,0), 0)
      :0);

      setTotalExtras(selectedJob.extras.length>0 ?
      selectedJob.extras.reduce((acc, extra) => acc + extra.cost, 0)
      :0);

      setTotalCosts(materialsCost + wages + selectedJob.fuel);

    

    },[selectedJob])


    const editJob = () => {
        console.log(editedJob);
        if (editedJob.price && (editedJob.price <= 0 || isNaN(editedJob.price))) {
          Alert.alert('Error', 'Job cannot be free');
          return;
        }
        if (editedJob.name && editedJob.name.length === 0) {
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
    
              
                setSelectedJob(editedJob);
                setEditedJob(null);
                setIsEdited(false);
       
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
                AsyncStorage.setItem('jobs', JSON.stringify(jobs)); 
                setEditedJob(null);
                setSelectedJob(null);
            },
            },
          ]);
        }
      };
    


  return (
    <>
    { !update &&
      <ScrollView style={styles.jobDetails}>
        <Text style={styles.header}>{editedJob?'Edit Job':'Job Summary'}</Text>
        <Text style={styles.header}>{todaysDate}</Text>
        <View style={styles.item}>
          <Text style={styles.itemDetails}>
            Customer: {selectedJob.customer}
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemDetails}>Job name: {selectedJob.name}</Text>
          {editedJob && (
            <TextInput
              style={styles.textInput}
              placeholder="New job name"
              onChange={(e) => {
                setEditedJob({
                  ...editedJob,
                  name: e.nativeEvent.text,
                });
                setIsEdited(true);
            }}
            />
          )}
        </View>

        <View style={styles.item}>
          <Text style={styles.itemDetails}>
            Job address: {selectedJob.address}
          </Text>
          {editedJob && (
            <TextInput
              style={styles.textInput}
              placeholder="New job address"
              onChange={(e) => {
                setEditedJob({
                  ...editedJob,
                  address: e.nativeEvent.text,
                });
                setIsEdited(true);
              }}
            />
          )}
        </View>

 


        <View style={styles.item}>
          <Text style={styles.itemDetails}>
            Start date:{" "}
            {selectedJob.startDate
              ? selectedJob.startDate
              : "Job not started"}
          </Text>
      
      
        </View>

        <View style={styles.item}>
          <Text style={styles.itemDetails}>
            Quoted Price: £{selectedJob.price}
          </Text>
          {editedJob && (
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="Update price"
              onChange={(e) => {
                setEditedJob({
                  ...editedJob,
                  price: e.nativeEvent.text,
                });
                setIsEdited(true);
              }}
            />
          )}
        </View>

        <View style={styles.item}>
          <Text style={styles.itemDetails}>
            Extras: £{totalExtras}   Total Price: £{Number(selectedJob.price)+Number(totalExtras)}
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemDetails}>
            Current balance: £{(Number(selectedJob.price) + (Number(totalExtras) - Number(totalCosts)))}
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemDetails}>
            Materials: £{materialsCost}   Fuel: £{selectedJob.fuel}
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemDetails}>
            Wages: £{wages}
          </Text>
        </View>

        {!editedJob && <Button
          title="Edit Job Details"
          onPress={() => {
            setEditedJob(JSON.parse(JSON.stringify(selectedJob)));
          }}
        />
        }
      </ScrollView>
      }

      {update && (
  <UpdateCosts
  selectedJob={selectedJob}
  setSelectedJob={setSelectedJob}
  setUpdate={setUpdate}
  isKeyboard={isKeyboard}
 

  />
      )}



      {!isKeyboard && !update &&
      <View style={styles.buttons}>
        {isEdited && <Button title="Save" onPress={editJob} />}

        {!editedJob && (
          <>

          <Button
          title="Update costs"
          onPress={() => {
            setUpdate(true);
          }}
          />

        </>
        )}

        <Button
          title="Back"
          onPress={() => {
            if(editedJob){
              setEditedJob(null);
              setEditWorkers(null)
            }else{
              setSelectedJob(null);
         setEditedJob(null);setEditWorkers(false);}
          }}
        />
      </View>
    }

      {editedJob && !isKeyboard && !editWorkers &&
      <View style={styles.bottom}>
        <Button color="red" title="Delete" onPress={handleDelete} />
      </View>
        }
    </>
  );
};
