import { View, Text, ScrollView,TextInput,Button,Pressable } from 'react-native';
import { useState } from 'react';
import { styles } from './styles';


export const AddFuel=({fuel,setFuel,setAddFuel,setIsUpdated,date})=>{

console.log('fuel in add fuel',JSON.stringify(fuel,null,2));
const [enteredFuel,setEnteredFuel]=useState(0);
const [isEntered,setIsEntered]=useState(false); 

const updateFuel=()=>{
    const updatedFuel=[...fuel,{date:date.toDateString(),cost:enteredFuel}];
    setFuel(updatedFuel);
    setEnteredFuel(0);
}
const deleteEntry=(index)=>{
    const updatedFuel=[...fuel];
    updatedFuel.splice(index,1);
    setFuel(updatedFuel);
    setIsUpdated(true);
}
    return (
        <View style={styles.jobList}>
            <ScrollView >
            <Text style={styles.header}>Add Fuel</Text>
            {fuel && fuel.length>0 &&
            <>
            <Text style={{fontSize:20,color:'blue'}}>Click entry to delete</Text>

            {fuel.map((fuel,index)=>{
                return (
                    <Pressable key={index} onPress={()=>{deleteEntry(index)}}>
                    <View  style={styles.item}>
                        <Text style={styles.itemDetails}>{fuel.date}  £{fuel.cost}</Text>
                    </View>
                    </Pressable>
                )
            })
            }
            </>
        }

            <Text style={styles.header}>Enter Fuel cost £{enteredFuel}</Text>
            <TextInput
                style={styles.textInput}
                keyboardType="numeric"
                placeholder='Fuel cost'
                onChange={(e)=>{setEnteredFuel(+e.nativeEvent.text);
                setIsEntered(true);
                }
            }
            />
            {isEntered&&
            <View style={styles.button}>
            <Button title='Done' onPress={()=>{updateFuel();setAddFuel(false);setIsUpdated(true)}}/>
            </View>
            }
            <View style={styles.button}>
                <Button title='Back' onPress={()=>{setAddFuel(false)}}/>
            </View>
            </ScrollView>
        </View>
    )



}