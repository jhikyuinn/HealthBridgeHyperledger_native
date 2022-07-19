import React, {useEffect,useState} from 'react';
import AuroraButton from '../../components/AuroraButton';
import axios from 'axios'
import { Text, View , StyleSheet,ScrollView} from 'react-native';

function SourcesRecords({user, record}) {

  
 
    return (
      <ScrollView >
       {record.map((item,index)=>(
        <View style={styles.input} key={item.resource.id}>
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
        <AuroraButton text="View"  width="20%" height="25%" bgcolor="rgb(134, 193, 217)" color={"black"} outline={false} />
      </View>
          
       ))}
      
      
    </ScrollView>
    );
  }
  
  export default SourcesRecords;

  const styles = StyleSheet.create({
    input: {
      marginTop:20,
      height: 160,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius:10,
      backgroundColor:"#fff",
    },
  });