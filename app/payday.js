import { Text, View,StyleSheet,Button } from "react-native";

import { useNavigation } from "expo-router";

export default Invoices = () => {
const navigation = useNavigation();
  return (
    <View style={styles.container}>
  <Text style={styles.header}>Invoices</Text>
  <Button color='blue' title="Home" onPress={() => navigation.navigate("index")}  />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
      border: '1px solid red',
      
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  
    alignContent:'center',
  },
  header: {
    fontSize: 24,
    color: 'blue',
  },
  paragraph: {
    fontSize: 18,
    color: 'white',
    textTransform: 'uppercase',
  },


});