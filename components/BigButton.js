import { Pressable,Text,StyleSheet } from "react-native"
import { Link } from "expo-router"
export const BigButton = ({color,title,nav}) => {

    return (
        <Link href={nav} style={{...styles.button,backgroundColor:color}} >
       <Text style={styles.buttonText} >{title}</Text>
       
        </Link>  
    )
}
const styles = StyleSheet.create({
    button: {
        
        padding: 15,
        borderRadius: 30,
        width: '80%',
        height: 60,
      
        textAlign:'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 24,
      },
})