import { Button, View } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';
export const DatePicker = ({date,setDate,dateSelected,setDateSelected}) => {
    const [show, setShow] = useState(false);

  
   
  
    const onChange = (event, selectedDate) => {
     
  
      setDate(selectedDate);
     setShow(false)
     setDateSelected(true);
    };
  
    return (
      <View>
        <View style={styles.button}> 
          <Button onPress={()=>{setShow(true)}} title={dateSelected?"change date":"Select date"} />
        </View>
        {show && (
          <DateTimePicker
            // testID="dateTimePicker"
            value={date}
            onChange={onChange}
          />
        )}
      </View>
    );
  }