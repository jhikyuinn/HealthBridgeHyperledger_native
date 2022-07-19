import React, {useState} from 'react';
import {View, Text, StatusBar,StyleSheet, Image,TouchableOpacity, TextInput, ScrollView} from 'react-native';
import AuroraButton from '../../components/AuroraButton';

function OwnerRecordsDetails({route,navigation}) {
    const {user}=route.params
    const {data}=route.params
    console.log(user)
    console.log(data)

    function Closedetails(user){
        navigation.navigate("Owner Records",{user:user})

    }
    return (
        <ScrollView>
        <View>
            <Text>PID: {data.id}</Text>
            <Text>Name: {data.name[0].text}</Text>
            <Text>Age: {data.extension[4].valueString}</Text>
            <Text>Gender: {data.gender} </Text>
            <Text>Mobile phone:{data.telecom[0].value}</Text>
            <Text>Address: {data.address[0].text}</Text>
            <Text>Relationship: {data.contact[0].relationship[0].text}</Text>
            <Text>Next of Kin Name: {data.contact[0].name.text}</Text>
            <Text>Next of Kin Mobile phone: {data.contact[0].telecom[0].value}</Text>
            <Text>Next of Kin Address: {data.contact[0].address.text}</Text>
            <Text>Symptom: {data.extension[0].valueString}</Text>
            <Text>Adding comment: {data.extension[1].valueString}</Text>
            <Text>Assigner: {data.extension[3].valueString}</Text>
            <Text>Doctor name: {data.extension[2].valueString}</Text>

            <AuroraButton text="close" buttonFunction={() => Closedetails(user)} width="20%" height="15%" bgcolor="rgb(134, 193, 217)" color={"black"} outline={false} />

        </View>
        </ScrollView>
     
    )
}

export default OwnerRecordsDetails;