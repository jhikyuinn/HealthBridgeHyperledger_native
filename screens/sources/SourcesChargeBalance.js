import { Text, TextInput,View,StyleSheet } from 'react-native';
import AuroraButton from '../../components/AuroraButton';
import { Header } from 'react-native-elements';
import axios from 'axios';
import { useState } from 'react';


function SourcesChargeBalance({route,navigation}) {
    const {user}=route.params
    console.log(user)

    const [amount,setAmount]=useState();
  
    async function Chargeamount(){
        await axios.post(`http://203.247.240.226:22650/api/chargeaccount`, {
            "EHRNumber":user.AccountID,
            "chargeamount": amount,
        }).then((res) => {
            console.log(res);
            window.alert("Successful Charge")
        })
    }
    
    const onChangeHandler = (e) => {
        setAmount(e)
    }

  const Goback=()=>{
    navigation.navigate('Information',{user:user})
  }
    return (
        <>
        <Header
      backgroundColor='rgb(134, 193, 217)'
      leftComponent={{text:"HealthBridge",style:{width:200,fontSize:30,fontWeight: 'bold'}}}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize:25,fontWeight:"bold"}}>Edit Profile {"\n"} </Text>
        <Text style={styles.textsize}>Account Balance: {user.checkingBalance}</Text>
        <View style={styles.container}>
        <Text style={styles.textsize}>Charge Amount: </Text>
        <TextInput style={styles.input} type="text" name="amount" value={amount} onChangeText={(e) => onChangeHandler(e)} />
        </View>
        <View style={styles.container}>
        <AuroraButton buttonFunction={()=>Chargeamount()} width="100%" height="100%"  bgcolor="rgb(134, 193, 217)" text="Save" color={"black"} outline={false}/>
        <AuroraButton buttonFunction={()=>Goback()} width="100%" height="100%"  bgcolor="rgb(134, 193, 217)" text="Close" color={"black"} outline={false}/>
        </View>
      </View>
      </>
    );
  }
  
  export default SourcesChargeBalance;
  const styles = StyleSheet.create({
    input: {
        width:"100%",
        height:40,
    
        marginRight:10,
        borderWidth: 1,
        padding: 10,
      },
    textsize:{
      fontSize: 20
  },
    container:{
        marginTop:"5%",
        marginBottom:"2%",
        width:150,
        height:50,
        alignItems: "center", 
        justifyContent: "center",
        flexDirection:"row"
    }
  });