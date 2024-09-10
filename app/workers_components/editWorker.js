import { Alert, Button, ScrollView, Text, TextInput, View,Keyboard } from "react-native";
import { useEffect,useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";

export const EditWorker = ({
  selectedWorker,
  setSelectedWorker,
  editedWorker,
  setEditedWorker,
  workers,
  setWorkers,
}) => {

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

  const [isEdited, setIsEdited] = useState(false);
  const [isKeyboard, setIsKeyboard] = useState(false);

  const editWorker = () => {
    console.log(editedWorker);
    if (editedWorker.rate <= 0 || isNaN(editedWorker.rate)) {
      Alert.alert("Error", "Rate must be greater than 0");
      return;
    }
    if (editedWorker.name.length === 0) {
      Alert.alert("Error", "Name must not be empty");
      return;
    }

    Alert.alert(
      "Edit Worker",
      `Are you sure you want to edit ${selectedWorker.name}?`,
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
            setWorkers((workers) => {
              const oldworker = workers.find(
                (worker) => worker.name === selectedWorker.name
              );
              const index = workers.indexOf(oldworker);
              workers[index] = editedWorker;
              return workers;
            });
            AsyncStorage.setItem("workers", JSON.stringify(workers));
            setSelectedWorker(null);
            setEditedWorker({});
          },
        },
      ]
    );
  };

  const handleDelete = () => {
    if (selectedWorker) {
      Alert.alert(
        "Delete Worker",
        `Are you sure you want to delete ${selectedWorker.name}?`,
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
              console.log("deleting worker");
              const oldworker = workers.find(
                (worker) => worker.name === selectedWorker.name
              );
              const index = workers.indexOf(oldworker);
              workers.splice(index, 1);
              setWorkers([...workers]);
              AsyncStorage.setItem("workers", JSON.stringify([...workers]));
              setSelectedWorker(null);
            },
          },
        ]
      );
    }
  };
  return (
    <>
      <ScrollView style={styles.workerDetails}>
        <Text style={styles.header}>Worker Details</Text>

        <View style={styles.item}>
          <Text style={styles.itemDetails}>Name: {selectedWorker.name}</Text>
          {editedWorker &&
          <TextInput
            style={styles.textInput}
            placeholder="New name"
            onChange={(e) => {
              setEditedWorker({
                ...selectedWorker,
                name: e.nativeEvent.text,
              });
              setIsEdited(true);
            }}
          />
          }
        </View>

        <View style={styles.item}>
          <Text style={styles.itemDetails}>
            Rate: £{selectedWorker.rate}/day
          </Text>
          {editedWorker &&
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            placeholder="New rate"
            onChange={(e) => {
              setEditedWorker({
                ...selectedWorker,
                rate: e.nativeEvent.text,
              });
              setIsEdited(true);
            }}
          />
}
        </View>
       
      </ScrollView>

      {!isKeyboard && (
        <View style={styles.buttons}>
          {isEdited && <Button title="Save" onPress={editWorker} />}

          {!editedWorker && (
          <Button
            title="Update"
            onPress={() => {
              setEditedWorker(JSON.parse(JSON.stringify(selectedWorker)));
             
            }}
          />
        )}

          <Button
            title="Back"
            onPress={() => {
              editedWorker?setEditedWorker(null):setSelectedWorker(null);
              setEditedWorker(null);
            }}
          />
        </View>
      )}
      {editedWorker && !isKeyboard &&
      <View style={styles.bottom}>
        <Button color="red" title="Delete" onPress={handleDelete} />
      </View>
        }
    </>
  );
};
