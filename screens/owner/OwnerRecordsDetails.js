import React, {useState} from 'react';
import {View, Text, StatusBar,StyleSheet, Image,TouchableOpacity, ScrollView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AuroraButton from '../../components/AuroraButton';

function OwnerRecordsDetails({route,navigation}) {
    const {user}=route.params
    const {data}=route.params
    console.log(user)
    console.log(data)

    function Closedetails(user){
        navigation.navigate("Records",{user:user})

    }
    return (
        <ScrollView>
        <View style={styles.input}>
            <Text style={styles.textsize}>PID: {data.id}</Text>
            <Text style={styles.textsize}>Name: {data.name[0].text}</Text>
            <Text style={styles.textsize}>Age: {data.extension[4].valueString}</Text>
            <Text style={styles.textsize}>Gender: {data.gender} </Text>
            <Text style={styles.textsize}>Mobile phone:{data.telecom[0].value}</Text>
            <Text style={styles.textsize}>Address: {data.address[0].text}</Text>
            <Text style={styles.textsize}>Relationship: {data.contact[0].relationship[0].text}</Text>
            <Text style={styles.textsize}>Next of Kin Name: {data.contact[0].name.text}</Text>
            <Text style={styles.textsize}>Next of Kin Mobile phone: {data.contact[0].telecom[0].value}</Text>
            <Text style={styles.textsize}>Next of Kin Address: {data.contact[0].address.text}</Text>
            <Text style={styles.textsize}>Symptom: {data.extension[0].valueString}</Text>
            <Text style={styles.textsize}>Adding comment: {data.extension[1].valueString}</Text>
            <Text style={styles.textsize}>Assigner: {data.extension[3].valueString}</Text>
            <Text style={styles.textsize}>Doctor name: {data.extension[2].valueString}</Text>

            <AuroraButton text="close" buttonFunction={() => Closedetails(user)} width="20%" height="10%" bgcolor="rgb(134, 193, 217)" color={"black"} outline={false} />

        </View>
        </ScrollView>
     
    )
}

export default OwnerRecordsDetails;

const styles = StyleSheet.create({
    input: {
      marginTop:20,
      height: 450,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius:10,
      backgroundColor:"#fff",
    },
    textinput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
    textsize:{
        fontSize: 20
    },
  });