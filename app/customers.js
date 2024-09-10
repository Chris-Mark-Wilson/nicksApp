import { StatusBar } from 'expo-status-bar';
import { Button,  Text, View,ScrollView,TextInput,SafeAreaView,KeyboardAvoidingView ,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomerList } from './customers_components/customerList';
import { styles } from './customers_components/styles';
import { EditCustomer } from './customers_components/editCustomer';
import { AddCustomer } from './customers_components/addCustomer';
import { NavButtons } from './customers_components/navButtons';


export default function Index() {
  const navigation = useNavigation();
  const [customers,setCustomers] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editedCustomer, setEditedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState(null);


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


  return (
    <View style={styles.container}>
     
      {!selectedCustomer && !newCustomer &&
    <CustomerList
    customers={customers}
   setSelectedCustomer={setSelectedCustomer}
    />
      }

      
      {selectedCustomer && 
      <EditCustomer
      selectedCustomer={selectedCustomer}
      setSelectedCustomer={setSelectedCustomer}
      editedCustomer={editedCustomer}
      setEditedCustomer={setEditedCustomer}
      customers={customers}
      setCustomers={setCustomers}         
      />
      }

    
      {newCustomer && 
      <AddCustomer
      newCustomer={newCustomer}
      setNewCustomer={setNewCustomer}
      customers={customers}
      setCustomers={setCustomers}
      />
      }

      {/*  NAV BUTTONS  */}
      {!selectedCustomer && !newCustomer && 
      <NavButtons
      setNewCustomer={setNewCustomer}
      navigation={navigation}
      />
    }

      <StatusBar style="auto" />
    </View>
  );
}

