import { ScrollView,Text,Button, View } from "react-native";
import { styles } from "./styles";
import { useEffect,useState } from "react";

export const ViewDetails = ({selectedJob,details,setDetails}) => {


    console.log(selectedJob);
    const [list,setList] = useState([]);
    
    useEffect(() => {
        if(details){
            switch(details){
                case 'Materials':
                    setList(selectedJob.materials);
                    break;
                case 'Fuel':
                    setList(selectedJob.fuel);
                    break;
                case 'Days worked':
                    setList(selectedJob.dates_worked);
                    break;
                case 'Extras':
                    setList(selectedJob.extras);
                    break;
                default:
                    break;
        }


    }
    }, [details])


    return (
        <ScrollView style={styles.jobList}>
            <Text style={styles.header}>{details}</Text>
            {list && list.length>0 && list.map((item,index) => {
                return (
                        <View key={index} style={styles.item}>
                            {!item.hasOwnProperty('workers') ?
                            <>
                            <Text  style={styles.itemDetails}>
                            {item.date}....{!item.description ? `£${item.cost}` : null}
                            </Text>
                            
                            <Text style={styles.itemDetails}>
                            {item.hasOwnProperty('description') ? `${item.description}....£${item.cost}`:null}
                            </Text>
                            </>
                            :
                        <>
                            <Text style={styles.itemDetails}>
                            {item.date}
                            </Text>
                            {item.workers.map((worker,i) => {
                                return (
                                    <View key={i} style={{...styles.itemDetails,justifyContent:'space-between',width:'100%',borderBottomColor:'red',borderBottomWidth:1}}>
                                    <Text style={styles.itemDetails}>
                                    {worker.name}
                                    </Text>
                                    <Text style={styles.itemDetails}>
                                    £{worker.rate}
                                    </Text>
                                    </View>
                                    
                                    
                                )
                            })
                            }
                            </>
                        }

                        </View>
                )
            })}
            <View style={styles.button}>
            <Button title="Back" onPress={() => {setDetails(null)}} />
                </View>
            </ScrollView>
    )
}