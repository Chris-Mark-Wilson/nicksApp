import {useState} from 'react';
import {View,Text,TextInput,Button,ScrollView,Pressable,Alert} from 'react-native';
import {styles} from './styles';


export const AddExtra=({extras,setExtras,setAddExtra,setIsUpdated,date})=>{

        console.log('extras in add extra',JSON.stringify(extras,null,2));
        const [enteredExtra,setEnteredExtra]=useState({description:'',cost:0});
        const [isEntered,setIsEntered]=useState(false); 
        
        const updateExtras=()=>{
            const updatedExtras=[...extras,{date:date.toDateString(),cost:enteredExtra.cost,description:enteredExtra.description}];
            setExtras(updatedExtras);
            setEnteredExtra({});
        }
        const deleteEntry=(index)=>{
            Alert.alert('Delete','Are you sure you want to delete this entry?',[{text:'Yes',onPress:()=>{deleteEntryConfirmed(index)}},{text:'No'}]);
        }
        const deleteEntryConfirmed=(index)=>{
            const updatedExtras=[...extras];
            updatedExtras.splice(index,1);
            setExtras(updatedExtras);
            setIsUpdated(true);
        }
            return (
                <View style={styles.jobList}>
                    <ScrollView >
                    <Text style={styles.header}>Add Extra</Text>
                    {extras && extras.length>0 &&
                    <>
                    <Text style={{fontSize:20,color:'blue'}}>Click entry to delete</Text>
        
                    {extras.map((extra,index)=>{
                        return (
                            <Pressable key={index} onPress={()=>{deleteEntry(index)}}>
                            <View  style={styles.item}>
                                <Text style={styles.itemDetails}>{extra.date} </Text>
                                <Text style={styles.itemDetails}>{extra.description}  £{extra.cost}</Text>
                            </View>
                            </Pressable>
                        )
                    })
                    }
                    </>
                }
        
                    <Text style={styles.header}>Enter description and cost </Text>
                    <Text style={styles.header}>{enteredExtra.description}  £{enteredExtra.cost}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Extra description'
                        onChange={(e)=>{setEnteredExtra((prev)=>{
                            const updatedExtra={...prev}
                            console.log(updatedExtra);
                            updatedExtra.description=e.nativeEvent.text;
                            return updatedExtra;
                        });                    
                        setIsEntered(true);
                        }
                    }
                    />
                    <TextInput
                        style={styles.textInput}
                        keyboardType="numeric"
                        placeholder='Extra cost'
                        onChange={(e)=>{setEnteredExtra((prev)=>{
                            const updatedExtra={...prev}
                            console.log(updatedExtra);
                            updatedExtra.cost=+e.nativeEvent.text;
                            return updatedExtra;
                        });                    
                        setIsEntered(true);
                        }
                    }
                    />
                    {isEntered&&
                    <View style={styles.button}>
                    <Button title='Done' onPress={()=>{updateExtras();setAddExtra(false);setIsUpdated(true)}}/>
                    </View>
                    }
                    <View style={styles.button}>
                        <Button title='Back' onPress={()=>{setAddExtra(false)}}/>
                    </View>
                    </ScrollView>
                </View>
            )
        
}