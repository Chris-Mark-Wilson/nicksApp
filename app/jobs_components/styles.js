import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {


      flex: 1,
      backgroundColor: "#d4d4d4",
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    header: {
      fontSize: 24,
      color: 'blue',
      textAlign: 'center',
      marginBottom:10,
    },
    jobList: {
   
      flex: 1,
      backgroundColor: "#d4d4d4",
      padding: 20,
      width: '100%',
    },
    listItem: {
      borderColor: 'orange',
      borderWidth: 2,
      borderRadius: 15,
      fontSize: 18,
      height: 30,
      margin: 10,
      textAlign: 'center',
      color: 'black',
    },
    jobDetails: {
      borderColor: 'blue',
      borderWidth: 2,
      flex: 1,
      padding:10,
      width: '100%',
      backgroundColor: "#d4d4d4",
    },
    buttons: {
      borderColor: 'blue',
      borderWidth: 2,
      flex: 0.3,
      backgroundColor: "#d4d4d4",
      padding: 10,
      justifyContent: 'space-around',
      width: '100%',
    },
    button:{
      margin:10,
    },
    item: {
     justifyContent: 'space-between',
      flexDirection: 'column',
      marginBottom:10,
      width: '100%',
    },
    itemDetails: {
   
      flexDirection:'row',
      margin: 0,
      fontSize: 18,
      color: 'black',
    },
    textInput: {
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
     paddingLeft:10,
      width: '100%',
      height: 30,
     
    },
    bottom: {
    margin:20
    },
    viewItem:{
      flexDirection:'row',
      margin: 0,
      fontSize: 18,
      color: 'black',
      justifyContent: "space-between",
      width: "100%",
      borderBottomColor: "red",
      borderBottomWidth: 1,
    }
  });