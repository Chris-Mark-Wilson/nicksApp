import { Keyboard,Button, Text, TextInput, View, Alert,ScrollView } from "react-native";
import { useState,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";

export const EditJob = ({editedJob,setEditedJob,selectedJob,setSelectedJob,setAddWorker,jobs,setJobs}) => {

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
    const[isKeyboard,setIsKeyboard] = useState(false);

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
    
                // setSelectedJob(null);
                setEditedJob(null);
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
                setEditedJob(null);
                setSelectedJob(null);
            },
            },
          ]);
        }
      };
    


  return (
    <>
      <ScrollView style={styles.jobDetails}>
        <Text style={styles.header}>{editedJob?'Edit Job':'Job Summary'}</Text>
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
            Quoted Timescale:{" "}
            {selectedJob.quotedDays
              ? selectedJob.quotedDays + "days"
              : "No timescale given"}{" "}
          </Text>
          {editedJob && (
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="Update timescale in days"
              onChange={(e) => {
                setEditedJob({...editedJob,
                  quotedDays: e.nativeEvent.text,
                });
                setIsEdited(true);
              }}
            />
          )}
        </View>

        <View style={styles.item}>
          <Text style={styles.itemDetails}>
            Days to Date:{" "}
            {selectedJob.daysWorked
              ? selectedJob.daysWorked
              : "Job not started"}
          </Text>
          {editedJob && (
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="Update days worked"
              onChange={(e) => {
                setEditedJob({
                  ...editedJob,
                  daysWorked: e.nativeEvent.text,
                });
                setIsEdited(true);
              }}
            />
          )}
        </View>

        <View style={styles.item}>
          <Text style={styles.itemDetails}>
            Number of Workers:{" "}
            {selectedJob.workers && selectedJob.workers.length
              ? selectedJob.workers.length
              : "No workers"}
          </Text>
          {editedJob && (
            <Button
              title="Add Worker"
              onPress={() => {
                setAddWorker(true);
              }}
            />
          )}
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
      </ScrollView>
      {!isKeyboard &&
      <View style={styles.buttons}>
        {isEdited && <Button title="Save" onPress={editJob} />}

        {!editedJob && (
          <Button
            title="Update"
            onPress={() => {
              setEditedJob(JSON.parse(JSON.stringify(selectedJob)));
            }}
          />
        )}

        <Button
          title="Back"
          onPress={() => {
            if(editedJob){setEditedJob(null)}else{setSelectedJob(null);
         setEditedJob(null);setAddWorker(false);}
          }}
        />
      </View>
    }

      {editedJob && !isKeyboard &&
      <View style={styles.bottom}>
        <Button color="red" title="Delete" onPress={handleDelete} />
      </View>
        }
    </>
  );
};
