import {useState} from 'react';
import {View,Text,TextInput,Button,ScrollView,Pressable,Alert} from 'react-native';
import {styles} from './styles';


export const AddMaterial=({materials,setMaterials,setAddMaterial,setIsUpdated,date})=>{

        console.log('materials in add material',JSON.stringify(materials,null,2));
        const [enteredMaterial,setEnteredMaterial]=useState({description:'',cost:0});
        const [isEntered,setIsEntered]=useState(false); 
        
        const updateMaterials=()=>{
            const updatedMaterials=[...materials,{date:date.toDateString(),cost:enteredMaterial.cost,description:enteredMaterial.description}];
            setMaterials(updatedMaterials);
            setEnteredMaterial({});
        }
        const deleteEntry=(index)=>{
            Alert.alert('Delete','Are you sure you want to delete this entry?',[{text:'Yes',onPress:()=>{deleteEntryConfirmed(index)}},{text:'No'}]);
        }
        const deleteEntryConfirmed=(index)=>{
            const updatedMaterials=[...materials];
            updatedMaterials.splice(index,1);
            setMaterials(updatedMaterials);
            setIsUpdated(true);
        }
            return (
                <View style={styles.jobList}>
                    <ScrollView >
                    <Text style={styles.header}>Add Material</Text>
                    {materials && materials.length>0 &&
                    <>
                    <Text style={{fontSize:20,color:'blue'}}>Click entry to delete</Text>
        
                    {materials.map((material,index)=>{
                        return (
                            <Pressable key={index} onPress={()=>{deleteEntry(index)}}>
                            <View  style={styles.item}>
                                <Text style={styles.itemDetails}>{material.date} </Text>
                                <Text style={styles.itemDetails}>{material.description}  £{material.cost}</Text>
                            </View>
                            </Pressable>
                        )
                    })
                    }
                    </>
                }
        
                    <Text style={styles.header}>Enter description and cost </Text>
                    <Text style={styles.header}>{enteredMaterial.description}  £{enteredMaterial.cost}</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Material description'
                        onChange={(e)=>{setEnteredMaterial((prev)=>{
                            const updatedMaterial={...prev}
                            console.log(updatedMaterial);
                            updatedMaterial.description=e.nativeEvent.text;
                            return updatedMaterial;
                        });                    
                        setIsEntered(true);
                        }
                    }
                    />
                    <TextInput
                        style={styles.textInput}
                        keyboardType="numeric"
                        placeholder='Material cost'
                        onChange={(e)=>{setEnteredMaterial((prev)=>{
                            const updatedMaterial={...prev}
                            console.log(updatedMaterial);
                            updatedMaterial.cost=+e.nativeEvent.text;
                            return updatedMaterial;
                        });                    
                        setIsEntered(true);
                        }
                    }
                    />
                    {isEntered&&
                    <View style={styles.button}>
                    <Button title='Done' onPress={()=>{updateMaterials();setAddMaterial(false);setIsUpdated(true)}}/>
                    </View>
                    }
                    <View style={styles.button}>
                        <Button title='Back' onPress={()=>{setAddMaterial(false)}}/>
                    </View>
                    </ScrollView>
                </View>
            )
        
}