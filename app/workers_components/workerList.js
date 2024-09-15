import { ScrollView, Text, View,Pressable } from "react-native";

import { styles } from "./styles"

export const WorkerList=({setSelectedWorker,workers,title='Workers'})=>{


    return (
        <View style={styles.workerList}>
            <ScrollView>
            <Text style={styles.header}>{title}</Text>
            {workers.length > 0 ? (
            workers.map((worker, index) => {
                return (
                <Pressable
                    key={index}
                    onPress={() => {
                    setSelectedWorker(worker);
                    }}
                >
                    <Text style={styles.listItem}>
                    {worker.name} - £{worker.rate}/day
                    </Text>
                </Pressable>
                );
            })
            ) : (
            <Text>We have no workers!</Text>
            )}
            </ScrollView>
      </View>
    )
}