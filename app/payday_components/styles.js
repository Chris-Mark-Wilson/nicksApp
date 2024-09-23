import { StyleSheet } from "react-native";

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
    workerList: {
      borderColor: "red",
      borderWidth: 5,
      flex: 1,
      backgroundColor: "lightblue",
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
      backgroundColor: "lightblue",
    },
    buttons: {
      borderColor: "blue",
      borderWidth: 5,
      flex: 0.3,
      backgroundColor: "lightgreen",
      padding: 10,
      justifyContent: "space-around",
      width: "100%",
    },
    button:{
      alignItems: 'center',
      borderWidth: 2,
      borderRadius: 5,
      borderColor:'red',
      paddingLeft:5,
      paddingRight:5,
      width: "fit-content",
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
    },
    viewItem:{
        flexDirection:'row',
        margin: 5,
        fontSize: 18,
        color: 'black',
        justifyContent: "space-between",
        width: "100%",
        borderBottomColor: "red",
        borderBottomWidth: 1,
      },
      linear:{
        flexDirection:'row',
      }
  });