import { ScrollView,Text,View,Button, TextInput } from 'react-native';
import { useState,useEffect } from 'react';
import { styles } from './styles';
import { SelectWorkers } from './selectWorkers';
import { DatePicker } from './datePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';




export const UpdateJob = ({selectedJob,setSelectedJob,setUpdate,isKeyboard}) => {

    console.log('job in updateCosts',selectedJob);

const [addWorkers,setAddWorkers]=useState(false); //flag to show selectWorkers component
const [addMaterial,setAddMaterial]=useState(false); //flag to show addMaterial component
const [addFuel,setAddFuel]=useState(false);//flag to show addFuel component
const [addExtra,setAddExtra]=useState(false);//flag to show addExtra component
const [materials,setMaterials]=useState(selectedJob.materials || []);//array of materials used
const [fuel,setFuel]=useState(selectedJob.fuel || []);//array of fuel entries
const [datesWorked,setDatesWorked]=useState([...selectedJob.dates_worked] || []);//array of days worked, each day has an array of workers {date: 'date', workers:[{name:'name',rate:rate}]}

const [date,setDate]=useState(new Date());//date to be selected 
const [dateSelected,setDateSelected]=useState(false);//flag to show date has been selected
const [isUpdated,setIsUpdated]=useState(false);//flag to show job has been updated

useEffect(()=>{

    setSelectedJob({...selectedJob,materials:[...materials],fuel:fuel,dates_worked:[...datesWorked]});

    console.log('job in updateCosts',JSON.stringify(selectedJob,null,1));
    console.log('selected job datesWorked',JSON.stringify(selectedJob.dates_worked,null,1));

console.log('datesWorked',JSON.stringify(datesWorked,null,1));
  

},[datesWorked,fuel,materials]);

const saveData = async () => {
    try{
    let jobs = JSON.parse(await AsyncStorage.getItem('jobs'));
console.log('jobs in saveData',JSON.stringify(jobs));
    const index = jobs.findIndex((job) => job.name === selectedJob.name);
    jobs[index] = JSON.parse(JSON.stringify(selectedJob));
    console.log('jobs after update',jobs);
    await AsyncStorage.setItem('jobs', JSON.stringify(jobs));
    }
    catch(e){
        console.log('error saving data',e);
    }
};


    return (
      <>
        {!addWorkers && 
          <ScrollView style={styles.jobDetails}>
            <Text style={styles.header}>Update Costs</Text>

            {!dateSelected && <Text style={styles.header}>Select a date</Text>}

            {dateSelected && 
              <>
                <Text style={styles.header}>{date.toDateString()}</Text>
                <View style={styles.item}>
                  <View style={styles.button}>
                    <Button
                      title="register workers"
                      onPress={() => {
                        setAddWorkers(true);
                      }}
                    />
                  </View>
                </View>

                <View style={styles.item}>
                  <View style={styles.button}>
                    <Button title="add fuel" onPress={() => {setAddFuel(true)}} />
                  </View>
                </View>

                {addFuel &&
                <TextInput style={styles.textInput} placeholder="Fuel cost" keyboardType="numeric" onChange={(e)=>{
                  setFuel([...fuel,{date:date,cost:+e.nativeEvent.text}]);
                setIsUpdated(true)}}/>
    }

                <View style={styles.item}>
                  <View style={styles.button}>
                    <Button title="add material" onPress={() => {}} />
                  </View>
                </View>

                <View style={styles.item}>
                  <View style={styles.button}>
                    <Button title="add job extra" onPress={() => {}} />
                  </View>
                </View>

                {selectedJob.workers && selectedJob.workers.length > 0 && (
                  <View style={styles.item}>
                    <Text style={styles.itemDetails}>Workers</Text>
                    <Text style={styles.itemDetails}>
                      {selectedJob.workers
                        .map((worker) => worker.name)
                        .join(", ")}
                    </Text>
                  </View>
                )}
              </>
            }
          </ScrollView>
        }

        {addWorkers && (
          <>
            <SelectWorkers
              datesWorked={datesWorked}
              setDatesWorked={setDatesWorked}
              setAddWorkers={setAddWorkers}
              date={date}
              setIsUpdated={setIsUpdated}
            />
          </>
        )}

        {!isKeyboard && !addWorkers && (
          <>
            <View style={styles.buttons}>
              <DatePicker
                date={date}
                setDate={setDate}
                dateSelected={dateSelected}
                setDateSelected={setDateSelected}
              />

              {isUpdated && <View style={styles.button}>
                <Button
                  title="Save"
                  onPress={() => {
                    console.log("Saving", selectedJob);
                    saveData().then(() => {
                      console.log("Data saved");
                      setIsUpdated(false);
                      setUpdate(false);
                    });
                  }}
                />
              </View>
            }

              <View style={styles.button}>
                <Button
                  title="Back"
                  onPress={() => {
                    setUpdate(false);
                  }}
                />
              </View>
            </View>
          </>
        )}
      </>
    );
}