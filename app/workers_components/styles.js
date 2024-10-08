import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
     
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "space-between",
  

    },
    header: {
      fontSize: 24,
      color: "blue",
    },
    workerList: {
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 5,
      flex: 1,
      backgroundColor: "#d4d4d4",
      padding: 10,
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
    workerDetails:{
      borderColor: "blue",
      borderWidth: 2,
      flex:1,
      width:'100%',
    padding:10,
    backgroundColor: "#d4d4d4",
    },
    buttons: {
      borderColor: "blue",
      borderWidth: 2,
      flex: 0.3,
      backgroundColor: "#d4d4d4",
      padding: 10,
      justifyContent: "space-around",
      width: "100%",
    },
    item:{
      justifyContent: 'space-between',
      flexDirection: 'column',
      marginBottom:20,
      width: '100%',
    },
    itemDetails:{
      margin:10,
      fontSize: 18,
      color: "black",
    
    },
    textInput:{
      borderColor:'black',
      borderWidth:1,
      borderRadius:5,
    
      paddingLeft:10,
      width:'100%',
      height:30,
     
    },
    bottom:{
      
      margin:20,
    }
  });