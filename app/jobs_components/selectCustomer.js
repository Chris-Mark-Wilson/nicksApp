import { Text, View, Button, Pressable, ScrollView } from "react-native";
import { styles } from "./styles";

export const SelectCustomer=({setNewJob,setSelectCustomer,newJob,customers})=>{
    return (
        <>
        <Text style={styles.header}>Select Customer</Text>
       <ScrollView style={styles.jobList}>
          {customers.length > 0 && 
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