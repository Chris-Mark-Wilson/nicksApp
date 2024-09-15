import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
      borderColor: 'red',
      borderWidth: 5,
      flex: 1,
      backgroundColor: '#fff',
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
      borderColor: 'red',
      borderWidth: 5,
      flex: 1,
      backgroundColor: 'lightblue',
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
      backgroundColor: 'lightblue',
    },
    buttons: {
      borderColor: 'blue',
      borderWidth: 5,
      flex: 0.3,
      backgroundColor: 'lightgreen',
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
  });