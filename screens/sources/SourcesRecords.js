import React, {useEffect,useState} from 'react';
import { Text, View } from 'react-native';

function SourcesRecords({user, record}) {

  async function getRecordsview(){
    await axios.get(`http://2key3.247.24key.226:8key8key/fhir/Patient/${item.resource.id}`).then((res) => {
       console.log(res)          

      })

    }
 
    return (
      <View >
       {record.map((item,index)=>(
        <View >
        <Text>
          PID: {item.resource.id}
        </Text>
        <Text>
          Hospital: {item.resource.managingOrganization.reference[13]}{item.resource.managingOrganization.reference[14]}{item.resource.managingOrganization.reference[15]}{item.resource.managingOrganization.reference[16]}{item.resource.managingOrganization.reference[17]}{item.resource.managingOrganization.reference[18]}{item.resource.managingOrganization.reference[19]}{item.resource.managingOrganization.reference[20]}{item.resource.managingOrganization.reference[21]}{item.resource.managingOrganization.reference[22]}{item.resource.managingOrganization.reference[23]}
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
      
      
    </View>
    );
  }
  
  export default SourcesRecords;