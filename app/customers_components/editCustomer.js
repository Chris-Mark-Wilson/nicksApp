import {
  Button,
  Text,
  TextInput,
  View,
  Alert,
  ScrollView,
  Keyboard,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";

export const EditCustomer = ({
  selectedCustomer,
  setSelectedCustomer,
  editedCustomer,
  setEditedCustomer,
  customers,
  setCustomers,
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

    const [isKeyboard, setIsKeyboard] = useState(false);
    const [isEdited, setIsEdited] = useState(false);

    const editCustomer = () => {
    console.log("editedCustomer", editedCustomer);
    if (editedCustomer.name === "") {
      Alert.alert("Error", "Customer must have a name");
      return;
    }

    if (editedCustomer.email === "" && editedCustomer.tel === "") {
      Alert.alert(
        "Error",
        "Customer must have contact details, either email or telephone"
      );
      return;
    }

    //validate email
    if (editedCustomer.email !== selectedCustomer.email) {
      console.log("found email validating");
      const email = editedCustomer.email;
      const emailPattern = /\S+@\S+\.\S+/;
      if (!emailPattern.test(email)) {
        Alert.alert("Error", "Invalid email address");
        return;
      }
    }
    Alert.alert(
      "Edit Customer",
      `Are you sure you want to edit ${selectedCustomer.name}?`,
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
            setCustomers((customers) => {
              const oldcustomer = customers.find(
                (customer) => customer.name === selectedCustomer.name
              );
              const index = customers.indexOf(oldcustomer);
              customers[index] = editedCustomer;
              return customers;
            });
            AsyncStorage.setItem("customers", JSON.stringify(customers));
            setSelectedCustomer(null);
            setEditedCustomer({});
          },
        },
      ]
    );
  };

  const handleDelete = () => {
    if (selectedCustomer) {
      Alert.alert(
        "Delete Customer",
        `Are you sure you want to delete ${selectedCustomer.name}?`,
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
              console.log("deleting customer");
              const oldcustomer = customers.find(
                (customer) => customer.name === selectedCustomer.name
              );
              const index = customers.indexOf(oldcustomer);
              customers.splice(index, 1);
              setCustomers([...customers]);
              AsyncStorage.setItem("customers", JSON.stringify([...customers]));
              setSelectedCustomer(null);
            },
          },
        ]
      );
    }
  };

  return (
    <>
      <ScrollView style={styles.customerDetails}>
        <Text style={styles.header}>Edit Customer</Text>
        <View style={styles.item}>
          <Text style={styles.itemDetails}>Name: {selectedCustomer.name}</Text>

          {editedCustomer && (
            <TextInput
              style={styles.textInput}
              placeholder="New customer name"
              onChange={(e) => {
                setEditedCustomer({
                  ...editedCustomer,
                  name: e.nativeEvent.text,
                });
                setIsEdited(true);
              }}
            />
          )}
        </View>

        <View style={styles.item}>
          <Text style={styles.itemDetails}>
            Address: {selectedCustomer.address ?? "none given"}
          </Text>
          {editedCustomer && (
            <TextInput
              style={styles.textInput}
              placeholder="New customer address"
              onChange={(e) => {
                setEditedCustomer({
                  ...editedCustomer,
                  address: e.nativeEvent.text,
                });
                setIsEdited(true);
              }}
            />
          )}
        </View>

        <View style={styles.item}>
          <Text style={styles.itemDetails}>
            Email: {selectedCustomer.email ?? "none given"}
          </Text>
          {editedCustomer && (
            <TextInput
              style={styles.textInput}
              placeholder="New customer email"
              onChange={(e) => {
                console.log("email", e.nativeEvent.text);
                setEditedCustomer({
                  ...editedCustomer,
                  email: e.nativeEvent.text.toLowerCase(),
                });
                setIsEdited(true);
              }}
            />
          )}
        </View>

        <View style={styles.item}>
          <Text style={styles.itemDetails}>
            Telephone: {selectedCustomer.tel ?? "none given"}
          </Text>
          {editedCustomer && (
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="New customer telephone"
              onChange={(e) => {
                setEditedCustomer({
                  ...editedCustomer,
                  tel: e.nativeEvent.text,
                });
                setIsEdited(true);
              }}
            />
          )}
        </View>
      </ScrollView>
      {!isKeyboard && (
      <View style={styles.buttons}>

        {isEdited &&         
            <Button title="Save" onPress={editCustomer} />
     
        }

         {!editedCustomer && (
          <Button
            title="Update"
            onPress={() => {
              setEditedCustomer(JSON.parse(JSON.stringify(selectedCustomer)));
            }}
          />
        )}
      
          <Button
            title="Back"
            onPress={() => {
              if (editedCustomer) {
                setEditedCustomer(null);
              } else {
                setSelectedCustomer(null);
                setEditedCustomer(null);
              } 
            }}
          />
      
      </View>
)}
      <View style={styles.bottom}>
        <Button color="red" title="Delete Customer" onPress={handleDelete} />
      </View>
    </>
  );
};
