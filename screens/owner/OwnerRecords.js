import React, {useEffect,useState} from 'react';
import { Text, View , StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function Records({user, record}) {

  async function getRecordsview(){
    await axios.get(`http://203.247.240.226:8080/fhir/Patient/${item.resource.id}`).then((res) => {
       console.log(res)          

      })

    }
 
    return (
      <ScrollView>
       {record.map((item,index)=>(
        <View style={styles.input} >
        <Text>
          PID: {item.resource.id}
        </Text>
        <Text>
        Center: {item.resource.managingOrganization.reference[13]}{item.resource.managingOrganization.reference[14]}{item.resource.managingOrganization.reference[15]}{item.resource.managingOrganization.reference[16]}{item.resource.managingOrganization.reference[17]}{item.resource.managingOrganization.reference[18]}{item.resource.managingOrganization.reference[19]}{item.resource.managingOrganization.reference[20]}{item.resource.managingOrganization.reference[21]}{item.resource.managingOrganization.reference[22]}{item.resource.managingOrganization.reference[23]}
        </Text>
        <Text>
          Doctor: {item.resource.extension[2].valueString}
        </Text>
        <Text>
          Symptom: {item.resource.extension[index].valueString}
        </Text>
        <Text>
          Create Time: {item.resource.extension[5] ? item.resource.extension[5].valueString : <></>}
        </Text>
        <Text className='my_view' onClick={() => getRecordsview()} style={{marginLeft:"90%"}} variant="outline-success">
          View
        </Text>
      </View>
          
       ))}
      
      
      </ScrollView>
    );
  }
  
  export default Records;

  const styles = StyleSheet.create({
    input: {
      marginTop:20,
      height: 130,
      margin: 10,
      borderWidth: 1,
      padding: 10,
      borderRadius:10,
      backgroundColor:"#fff",
    },
  });