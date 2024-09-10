import { Button, View } from "react-native";

import { styles } from "./styles"

export const NavButtons=({setNewWorker,navigation})=>{
    return (
        <View style={styles.buttons}>
          <Button
            title="Add worker"
            onPress={() => {
              setNewWorker({ name: "", rate: 0 });
            }}
          />
          <Button
            title="Home"
            onPress={() => {
              navigation.navigate("index");
            }}
          />
        </View>
      )
}