import { Text, View, Pressable, ScrollView } from 'react-native';

import { styles } from './styles';


export const CustomerList = ({customers,setSelectedCustomer}) => {
    return (
        <View
          style={styles.customerList} 
        >
          <ScrollView>
            <Text style={styles.header}>Customers</Text>
            {customers.length > 0 ? (
              customers.map((customer, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setSelectedCustomer(customer);
                    }}
                  >
                    <Text style={styles.listItem}>
                      {customer.name} 
                    </Text>
                  </Pressable>
                );
              })
            ) : (
              <Text>{'No customers :('}</Text>
            )}
          </ScrollView>
        </View>
      )
}