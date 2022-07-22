import React, {useEffect,useState} from 'react';
import AuroraButton from '../../components/AuroraButton';
import axios from 'axios'
import { Text, View , StyleSheet,ScrollView} from 'react-native';

function SourcesRecords({user,record,center,navigation}) {
  console.log(user)
  console.log(center)

 

  
 
    return (
      <>
      <View style={styles.info}>
          {center ? <Text style={{fontSize:20}}>{center.name}</Text>: <></>}
          {center ? <Text style={{fontSize:20}}>{center.address[0].line[0]}</Text> : <></>}
          {center ? <Text style={{fontSize:20}}>{center.telecom[0].value}</Text> : <></>}

      </View>
      <ScrollView >
       {record.map((item,index)=>(
        <View style={styles.input} key={item.resource.id}>
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
        <AuroraButton text="View"  width="20%" height="25%" bgcolor="rgb(134, 193, 217)" color={"black"} outline={false} />
      </View>
          
       ))}
      
      
    </ScrollView>
    </>
    );
  }
  
  export default SourcesRecords;

  const styles = StyleSheet.create({
    info: {
      marginTop:20,
      height: 130,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius:10,
      backgroundColor:"#fff",
    },
    input: {
      marginBottom:20,
      height: 160,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius:10,
      backgroundColor:"#fff",
    },
  });