
import {Text, View,StyleSheet} from 'react-native';
import AuroraButton from '../../components/AuroraButton';
import { useState, useRef } from 'react'
import axios from 'axios'
import Checkbox from 'expo-checkbox';
import { TextInput } from 'react-native-gesture-handler';


function UserRequestDetails({route,navigation}) {
   const {id}=route.params
   const {phone}=route.params
   const {doctor}=route.params

    const initialState = {
        PID: true,
        Name: true,
        Age: false,
        Gender: false,
        MobilePhone: false,
        Address: false,
        Symptoms: true,
        AddingComment: false,
        Assigner: true,
        DoctorName: true,
    };

    const [amount,setAmount]= useState({});

    const requestHandler = async () => {
        console.log(id,amount,doctor,phone)
        await axios.put(`http://203.247.240.226:22650/api/requestPHR`, {
            "EHRNumber" : id, 
            "maxtoken": amount, 
            "doctor": doctor, 
            "data": "all",
            "phonenumber" : phone
        }).then((res) => {
            console.log(res);
        })
        setRequest({
            EHRNumber: "",
            amount: "",
            doctor: "",
            phoneNumber: "",
        })
    }

    const onChangeHandler = (e) => {
        console.log(e)
        setAmount(e)
    }

    function Closerequest(){
        navigation.navigate("Request PHR")
    }

    return (
        <>
    <View style={styles.input}>
        <Text style={styles.textsize}> Request PHR to {id}</Text>
        <Text style={styles.textsize}></Text>
        <Text style={styles.textsize}>Information</Text>
        <View style={styles.checkcontainer}>
            <View style={styles.checkboxWrapper}>
            <Checkbox value={initialState.PID}/>
            <Text> PID   </Text>
            </View>
            <View style={styles.checkboxWrapper}>
            <Checkbox value={initialState.Name}/>
            <Text> Name   </Text>
            </View>
            <View style={styles.checkboxWrapper}>
            <Checkbox value={initialState.Symptoms}/>
            <Text> Symptoms   </Text>
            </View>            
        </View>
        <View style={styles.checkcontainer}>
            <View style={styles.checkboxWrapper}>
            <Checkbox value={initialState.Assigner}/>
            <Text> Assigner   </Text>
            </View>
            <View style={styles.checkboxWrapper}>
            <Checkbox value={initialState.DoctorName}/>
            <Text> Doctor Name  </Text>
            </View>
            
        </View>

        <View style={styles.checkcontainer}>
        <View style={styles.checkboxWrapper}>
            <Checkbox value={initialState.Age}/>
            <Text> Age   </Text>
            </View>
            <View style={styles.checkboxWrapper}>
            <Checkbox value={initialState.Gender}/>
            <Text> Gender   </Text>
            </View>
            <View style={styles.checkboxWrapper}>
            <Checkbox value={initialState.MobilePhone}/>
            <Text> Mobile Phone   </Text>
            </View>
        </View>

        <View style={styles.checkcontainer}>
            <View style={styles.checkboxWrapper}>
            <Checkbox value={initialState.Address}/>
            <Text> Address   </Text>
            </View>
            <View style={styles.checkboxWrapper}>
            <Checkbox value={initialState.AddingComment}/>
            <Text> Adding Comment   </Text>
            </View>
            </View>
       

       <View style={styles.smallcontainer}>
        <Text style={styles.textsize}>HBT recommended : </Text>
        <TextInput style={styles.Textinput} onChangeText={(e) => onChangeHandler(e)}/>
        </View>
    </View> 

        <View style={styles.container}>
        <AuroraButton text="Close" buttonFunction={() => Closerequest()} width="35%" height="12%" bgcolor="rgb(134, 193, 217)" color={"black"} outline={false} />
        <AuroraButton text="Send Request"  buttonFunction={() => requestHandler()} width="35%" height="12%" bgcolor="rgb(134, 193, 217)" color={"black"} outline={false} />
        </View>

    </>
    )
}

export default UserRequestDetails;

const styles = StyleSheet.create({
    input: {
      marginTop:20,
      height: 400,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius:10,
      backgroundColor:"#fff",
    },
    Textinput: {
        width:"40%",
        height:40,
        marginTop: 12,
        marginRight:10,
        borderWidth: 1,
        padding: 10,
      },
    textsize:{
        fontSize: 20
    },
    checkcontainer:{
        margin: "1%",
        width:"80%",
        height: 20,
        flex: 1,
        flexDirection:"row"
    }, 
    smallcontainer:{
        margin: "2%",
        width:"100%",
        height: 50,
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection:"row"
    }, 
    container:{
        margin: "2%",
        width:"100%",
        height: 50,
        flex: 1,
        justifyContent: "center",
        flexDirection:"row"
    }, 
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
      },
  });