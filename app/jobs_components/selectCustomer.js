import { Text, View, Button, Pressable, ScrollView } from "react-native";
import { styles } from "./styles";

export const SelectCustomer=({setNewJob,setSelectCustomer,newJob,customers})=>{
   
  
  
  return (
        <>
       <ScrollView style={styles.jobList}>
        <Text style={styles.header}>Select Customer</Text>
          {customers && customers.length > 0 && 
            customers.map((customer, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    setNewJob({...newJob,customer:customer.name});
                    setSelectCustomer(false);
                  }}
                >
                  <Text style={styles.listItem}>{customer.name}</Text>
                 
                </Pressable>
          )})
          }
          {!customers && <Text style={{fontSize:20}}>No customers to show, please add a customer to the database before selecting a customer</Text>}
        </ScrollView>
      
        <View style={styles.bottom}>
          <Button
            title="Back"
            onPress={() => {
              setSelectCustomer(false);
            }}
          />
       
       </View>
       </>
    )
}