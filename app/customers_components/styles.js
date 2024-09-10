import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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