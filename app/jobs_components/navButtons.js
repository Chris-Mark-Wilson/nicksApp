import { Button, View } from "react-native";
import { styles } from "./styles"


export const NavButtons = ({setNewJob,navigation}) => {
    return (
    <View style={styles.buttons}>
        <Button
          title="Add Job"
          onPress={() => {
            setNewJob({ name: '', price: 0 });
          }}
        />
        <Button
          title="Home"
          onPress={() => {
            navigation.navigate('index');
          }}
        />
      </View>
      )

}