import {Text, View,StyleSheet,TextInput} from 'react-native';
import AuroraButton from '../../components/AuroraButton';
import { useState, useRef } from 'react'
import axios from 'axios'
import Checkbox from 'expo-checkbox';


function UserResponsePayment({route,navigation}) {
    const {id} = route.params;
    const {receiver} =route.params;
    console.log(id,receiver)

    const initialState = {
        PID: true,
        Name: true,
        Age: true,
        Gender: true,
        MobilePhone: true,
        Address: true,
        Symptoms: true,
        AddingComment: true,
        Assigner: true,
        DoctorName: true,
      };

    const [txInfo, setTxInfo] = useState({
        senderName: id,
        receiverName: receiver,
        Amount: amount,
    });

    const [amount,setAmount]= useState([]);

    async function RequestPayment(){
        await axios.post(`http://203.247.240.226:22650/api/sendPayment`, {
            "SenderName": txInfo.senderName,
            "ReceiverName": txInfo.receiverName,
            "Price": amount
        }).then((res) => {
            console.log(res);
            window.alert("Successful payment")
        })
    }

    function Closerequest(id){
        navigation.navigate("User Notification",{id:id})
    }

    const onChangeHandler = (e) => {
        console.log(e)
        setAmount(e)
    }

    return (
        <>
    <View style={styles.input}>
        <Text style={styles.textsize}> Payment to {receiver}</Text>
        <Text style={styles.textsize}></Text>
        <Text style={styles.textsize}>Total amount: 1.64 HBT</Text>
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
            <Checkbox value={initialState.Age}/>
            <Text> Age   </Text>
            </View>
            <View style={styles.checkboxWrapper}>
            <Checkbox value={initialState.Gender}/>
            <Text> Gender   </Text>
            </View>
        </View>
        <View style={styles.checkcontainer}>
            <View style={styles.checkboxWrapper}>
            <Checkbox value={initialState.MobilePhone}/>
            <Text> Mobile Phone   </Text>
            </View>
            <View style={styles.checkboxWrapper}>
            <Checkbox value={initialState.Address}/>
            <Text> Address   </Text>
            </View>
            <View style={styles.checkboxWrapper}>
            <Checkbox value={initialState.Symptoms}/>
            <Text> Symptoms   </Text>
            </View>
        </View>
        <View style={styles.checkcontainer}>
             <View style={styles.checkboxWrapper}>
            <Checkbox value={initialState.AddingComment}/>
            <Text> Adding Comment   </Text>
            </View>
            <View style={styles.checkboxWrapper}>
            <Checkbox value={initialState.Assigner}/>
            <Text> Assigner   </Text>
            </View>
            <View style={styles.checkboxWrapper}>
            <Checkbox value={initialState.DoctorName}/>
            <Text> Doctor Name  </Text>
            </View>
            
        </View>

       
        <Text style={styles.textsize}>Sender Name : {id}</Text>
        <Text style={styles.textsize}>Receiver Name : {receiver}</Text>

        <View style={styles.smallcontainer}>
        <Text style={styles.textsize}>HBT recommended : </Text>
        <TextInput style={styles.Textinput} onChangeText={(e) => onChangeHandler(e)}/>
        </View>
    </View> 

        <View style={styles.container}>
        <AuroraButton text="Close" buttonFunction={() => Closerequest(id)} width="35%" height="12%" bgcolor="rgb(134, 193, 217)" color={"black"} outline={false} />
        <AuroraButton text="Send Payment" buttonFunction={() => RequestPayment()} width="35%" height="12%" bgcolor="rgb(134, 193, 217)" color={"black"} outline={false} />
        </View>

    </>
    )
}

export default UserResponsePayment;

const styles = StyleSheet.create({
    input: {
      marginTop:20,
      height: 300,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius:10,
      backgroundColor:"#fff",
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
        margin: "5%",
        width:350,
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
      Textinput: {
        width:"40%",
        height:40,
        marginTop: 12,
        marginRight:10,
        borderWidth: 1,
        padding: 10,
      },
  });