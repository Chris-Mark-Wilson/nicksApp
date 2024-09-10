import { Button, View } from "react-native";
import { styles } from "./styles";

export const NavButtons=({setNewCustomer,navigation})=>{
    return (
        <View style={styles.buttons}>
          <Button
            title="Add customer"
            onPress={() => {
              setNewCustomer(true);
            }}
          />
          <Button
            title="Home"
            onPress={() => {
              navigation.navigate("index");
            }}
          />
        </View>
      );
}