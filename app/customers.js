import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View,ScrollView,TextInput,SafeAreaView,KeyboardAvoidingView ,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Pressable} from 'react-native';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const navigation = useNavigation();
  const [customers,setCustomers] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editedCustomer, setEditedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState(null);
  const keyboardOffset=200;

  useEffect(()=>{
  console.log('fired effect');
    const getCustomers = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('customers');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
      } catch(e) {
        console.log('error reading value');
      }
    }

  if(customers.length===0){
    getCustomers()
    .then((data)=>{
      setCustomers(data);
    })
  }
  
  },[]);

  useEffect(()=>{
    console.log('selected effect',selectedCustomer);
  },[selectedCustomer])



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



  const editCustomer = () => {
    console.log('editedCustomer',editedCustomer);
  if(editedCustomer.name===''){
  Alert.alert('Error','Customer must have a name');
  return;
  }
  
     if(editedCustomer.email==='' && editedCustomer.tel===''){
       Alert.alert('Error','Customer must have contact details, either email or telephone');
       return;
     }
 
     //validate email
     if(editedCustomer.email!==selectedCustomer.email){
      console.log('found email validating');
       const email=editedCustomer.email;
       const emailPattern=/\S+@\S+\.\S+/;
       if(!emailPattern.test(email)){
         Alert.alert('Error','Invalid email address');
         return;
       }
     }
    Alert.alert('Edit Customer', `Are you sure you want to edit ${selectedCustomer.name}?`, [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('Cancel');
        },
      },
      {
        text: 'YES!!',
        onPress: () => {
        
          setCustomers((customers)=>{
            const oldcustomer=customers.find((customer)=>customer.name===selectedCustomer.name);
            const index=customers.indexOf(oldcustomer);
            customers[index]=editedCustomer;
            return customers;
          });
          AsyncStorage.setItem('customers',JSON.stringify(customers));
          setSelectedCustomer(null);
          setEditedCustomer({});
        },
      },
    ]);
  }

  const handleDelete=()=>{
    if(selectedCustomer){
      Alert.alert('Delete Customer', `Are you sure you want to delete ${selectedCustomer.name}?`, [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel');
          },
        },
        {
          text: 'YES!!',
          onPress: () => {
            console.log('deleting customer');
            const oldcustomer=customers.find((customer)=>customer.name===selectedCustomer.name);
            const index=customers.indexOf(oldcustomer);
            customers.splice(index,1);
            setCustomers([...customers]);
            AsyncStorage.setItem('customers',JSON.stringify([...customers]));
            setSelectedCustomer(null);
          },
        },
      ]);
    }
  }
  const changeSelectedCustomer = (customer) => {
    console.log('changeSelectedCustomer',customer);
    setSelectedCustomer(customer);
  }

  return (
    <View style={styles.container}>
      {/* CUSTOMER LIST  */}
      {!selectedCustomer && !newCustomer && (
        <View
          style={{
            ...styles.customerList, 
            display: selectedCustomer || newCustomer ? "none" : "flex",
          }}
        >
        
          <ScrollView>
            
            <Text style={styles.header}>Customers</Text>
            {customers.length > 0 ? (
              customers.map((customer, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      changeSelectedCustomer(customer);
                    }}
                  >
                    <Text style={styles.listItem}>
                      {customer.name} 
                    </Text>
                  </Pressable>
                );
              })
            ) : (
              <Text>No customers</Text>
            )}
          </ScrollView>
        </View>
      )}

      {/*  EDIT CUSTOMER  */}
      {selectedCustomer && (
      <ScrollView style={styles.customerDetails}>
     
     
      <Text style={styles.header}>Edit Customer</Text>
      <View style={styles.item}>
        <Text style={styles.itemDetails}>Name: {selectedCustomer.name}</Text>
        <TextInput
          style={styles.textInput}
          placeholder="New customer name"
          onChange={(e) => {
            setEditedCustomer({ ...selectedCustomer, name: e.nativeEvent.text });
          }}
        />
      </View>

      <View style={styles.item}>
        <Text style={styles.itemDetails}>Address: {selectedCustomer.address??'none given'}</Text>
        <TextInput
          style={styles.textInput}
        
          placeholder="New customer address"
          onChange={(e) => {
            setEditedCustomer({ ...selectedCustomer, address: e.nativeEvent.text });
          }}
        />
      </View>

      <View style={styles.item}>
        <Text style={styles.itemDetails}>Email: {selectedCustomer.email??'none given'}</Text>
        <TextInput
          style={styles.textInput}
         
          placeholder="New customer email"
          onChange={(e) => {
            console.log('email',e.nativeEvent.text);
            setEditedCustomer({ ...selectedCustomer, email: e.nativeEvent.text.toLowerCase() });
          }}
        />
      </View>

       <View style={styles.item}>
        <Text style={styles.itemDetails}>Telephone: {selectedCustomer.tel??'none given'}</Text>
        <TextInput
          style={styles.textInput}
          keyboardType='numeric'
          placeholder="New customer telephone"
          onChange={(e) => {
            setEditedCustomer({ ...selectedCustomer, tel: e.nativeEvent.text });
          }}
        />
      </View>

          <View style={styles.buttons}>
            {editedCustomer && 
            <View style={styles.button}>
            <Button title="Save" onPress={editCustomer} />
            
            </View>
            }
              <View style={styles.button}>
                <Button
                  title="Back"
                  onPress={() => {
                    setEditedCustomer(null);
                    setSelectedCustomer(null);
                  }}
                />
              </View>
            </View>

          <View style={styles.bottom}>
            <Button color="red" title="Delete Customer" onPress={handleDelete} />
          </View>

        </ScrollView >
      )}

      {/*  ADD CUSTOMER  */}
      {newCustomer && (
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
      )}

      {/*  NAV BUTTONS  */}
      {!selectedCustomer && !newCustomer && (
        <View style={styles.buttons}>
          <Button
            title="Add customer"
            onPress={() => {
              setNewCustomer({ name: "", rate: 0 });
            }}
          />
          <Button
            title="Home"
            onPress={() => {
              navigation.navigate("index");
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
    borderColor: "red",
    borderWidth: 5,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",

  
  },
  header: {
    fontSize: 24,
    color: "blue",
  },
  customerList: {
    borderColor: "red",
    borderWidth: 5,
    flex: 1,
    backgroundColor: "lightblue",

    padding: 20,

    // overflow: 'scroll',
    width: "100%",
  },
  listItem: {
    borderColor: "orange",
    borderWidth: 2,
    borderRadius:15,
    fontSize: 18,
    height: 30,
    margin:10,
    textAlign:'center',
    color: "black",
    // textTransform: 'uppercase',
  },
  customerDetails:{
    borderColor: "blue",
    borderWidth: 2,
    flex:1,
  padding:10,
    width:'100%',
    // alignItems:'center',
    backgroundColor: "lightblue",
  },
  buttons: {
    borderColor: "blue",
    borderWidth: 5,
    flex: 0.4,
    backgroundColor: "lightgreen",
    padding: 10,
    justifyContent: "space-around",

    width: "100%",
  },
  button: {
    margin:10,
  },
  item:{
     justifyContent: 'space-between',
    flexDirection: 'column',
    width: '100%',
    marginTop:10,
    marginBottom:10,
  },
  itemDetails:{
    fontSize: 18,
    color: "black",
  
  },
  textInput:{
    borderColor:'black',
    borderWidth:1,
    borderRadius:5,
    paddingLeft:5,
    width:'100%',
    height:30,

  },
  bottom:{
margin:20
  }
});