import { useEffect,useState } from "react"
import { View,Text,Button,StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { WorkerList } from "../workers_components/workerList"
import {styles} from "./styles"



export const SelectWorkers = ({datesWorked, setDatesWorked,
 setAddWorkers, date, setIsUpdated}) => {

  const [availableWorkers, setAvailableWorkers] = useState(null);
  //selected workers = workers worked on the day given by date or an empty array
  const [selectedWorkers, setSelectedWorkers] = useState(
    datesWorked.find((day) => day.date === date.toDateString())
      ? [...datesWorked.find((day) => day.date === date.toDateString()).workers]
      : []
  );

  useEffect(() => {
    const getWorkers = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("workers");
        return jsonValue != null ? JSON.parse(jsonValue) : [];
      } catch (e) {
        console.log("error getting available workers", e);
      }
    };

    getWorkers().then((data) => {
      //remove workers already selected
      if (selectedWorkers.length === 0) {
        setAvailableWorkers(data);
      } else {
        const filteredWorkers = data.filter(
          (worker) =>
            !selectedWorkers.find(
              (selectedWorker) => selectedWorker.name === worker.name
            )
        );
        setAvailableWorkers(filteredWorkers);
      }
    });
  }, []);

  const addWorker = (worker) => {
    console.log("add worker", worker);
    if (!selectedWorkers) {
      setSelectedWorkers([...worker]);
      setAvailableWorkers(
        availableWorkers.filter((w) => w.name !== worker.name)
      );
    } else {
      setSelectedWorkers([...selectedWorkers, { ...worker }]);
      setAvailableWorkers(
        availableWorkers.filter((w) => w.name !== worker.name)
      );
    }
    setIsUpdated(true);
  };

  const removeWorker = (worker) => {
    console.log("remove worker", worker);
    setSelectedWorkers(selectedWorkers.filter((w) => w.name !== worker.name));
    setAvailableWorkers([...availableWorkers, worker]);
    setIsUpdated(true);
  };

  return (
    <>
      {availableWorkers && (
        <WorkerList
          title="Available Workers"
          workers={availableWorkers}
          setSelectedWorker={addWorker}
        />
      )}

      {selectedWorkers && (
        <WorkerList
          title="Selected Workers"
          workers={selectedWorkers}
          setSelectedWorker={removeWorker}
        />
      )}

      <View style={{ ...styles.buttons, flex: 0.6 }}>
        <View style={styles.button}>
          <Button
            title="Done"
            onPress={() => {
              console.log("done", selectedWorkers);
              setDatesWorked((prev) => {
                const newDaysWorked = [...prev];
                const index = newDaysWorked.findIndex(
                  (day) => day.date === date.toDateString()
                );
                if (index === -1) {
                  newDaysWorked.push({ date: date.toDateString(), workers: selectedWorkers });
                } else {
                  newDaysWorked[index].workers = selectedWorkers;
                }
                return newDaysWorked;
              });
              setAddWorkers(false);
            }}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Cancel"
            onPress={() => {
              setAddWorkers(false);
            }}
          />
        </View>
      </View>
    </>
  );
};

