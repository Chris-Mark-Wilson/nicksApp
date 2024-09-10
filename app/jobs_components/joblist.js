import {ScrollView,View, Text,Pressable,SafeAreaView,TextInput} from 'react-native';
import { styles } from './styles';

export const Joblist=({jobs,selectedJob,setSelectedJob,newJob})=>{

 

    return (
        <View
          style={{
            ...styles.jobList,
            display: selectedJob || newJob ? 'none' : 'flex',
          }}
        >
          <ScrollView>
            <Text style={styles.header}>Jobs</Text>
            {jobs.length > 0 ? 
              jobs.map((job, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setSelectedJob(job);
                    }}
                  >
                    <Text style={styles.listItem}>{job.name}</Text>
                  
                
                  </Pressable>
            )}) : 
              <Text>No jobs to show</Text>
            }
          </ScrollView>
        </View>
    )
}