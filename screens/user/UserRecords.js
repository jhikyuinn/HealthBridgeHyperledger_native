import React, {useEffect,useState} from 'react';
import { Text, View , StyleSheet,ScrollView} from 'react-native';

function UserRecords({user, record}) {
 
    return (
      <ScrollView >
       {record.map((item,index)=>(
        <View style={styles.input}>
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
  
  export default UserRecords;

  const styles = StyleSheet.create({
    input: {
      marginTop:20,
      height: 120,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });