import { Button, Text, TextInput, View, ScrollView } from "react-native";

import { styles } from "./styles";


export const AddCustomer = ({newCustomer,setNewCustomer,customers,setCustomers}) => {

    const addCustomer = () => {
        if(newCustomer.name===''){
          Alert.alert('Error','Customer must have a name');
          return;
          }
        
           if(customers.find((customer)=>customer.name===newCustomer.name)){
             Alert.alert('Error','Customer already exists');
             return;
            }
            if(newCustomer.email==='' && newCustomer.tel===''){
              Alert.alert('Error','Customer must have contact details, either email or telephone');
              return;
            }
        
            //validate email
            if(newCustomer.email){
              const email=newCustomer.email;
              const emailPattern=/\S+@\S+\.\S+/;
              if(!emailPattern.test(email)){
                Alert.alert('Error','Invalid email address');
                return;
              }
            }
        
            setCustomers([...customers,newCustomer]);
            AsyncStorage.setItem('customers',JSON.stringify([...customers,newCustomer]));
            setNewCustomer(null);
          }
        

    return (
        <ScrollView style={styles.customerDetails}>
     
          <Text style={styles.header}>Add Customer</Text>
          <View style={styles.item}>
            <Text style={styles.itemDetails}>Name: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Customer name"
              onChange={(e) => {
                setNewCustomer({ ...newCustomer, name: e.nativeEvent.text });
              }}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.itemDetails}>Address: </Text>
            <TextInput
              style={styles.textInput}
            
              placeholder="Customer address"
              onChange={(e) => {
                setNewCustomer({ ...newCustomer, address: e.nativeEvent.text });
              }}
            />
          </View>

          <View style={styles.item}>
            <Text style={styles.itemDetails}>Email: </Text>
            <TextInput
              style={styles.textInput}
            
              placeholder="Customer email"
              onChange={(e) => {
                setNewCustomer({ ...newCustomer, email: e.nativeEvent.text.toLowerCase() });
              }}
            />
          </View>

           <View style={styles.item}>
            <Text style={styles.itemDetails}>Telephone: </Text>
            <TextInput
              style={styles.textInput}
              keyboardType='numeric'
              placeholder="Customer telephone"
              onChange={(e) => {
                setNewCustomer({ ...newCustomer, tel: e.nativeEvent.text });
              }}
            />
          </View>

          <Button title="Save" onPress={addCustomer} />
          <View style={styles.bottom}>
            <Button
              title="Back"
              onPress={() => {
                setNewCustomer(null);
              }}
            />
          </View>
          
        </ScrollView >
      );
    }