import React, {useState,  useRef } from 'react';
import {View, Text, StatusBar,StyleSheet, Image,TouchableOpacity, TextInput,ScrollView} from 'react-native';
import AuroraButton from '../components/AuroraButton';
import Feather from 'react-native-vector-icons/Feather';
import { Overlay } from 'react-native-elements';
import PopUp from '../components/Popup';
import Loader from '../components/Loader';
import axios from 'axios';

const SignUp = ({route,navigation})=>{
    const { category } = route.params;

    const [overlay,setOverlay] = useState(false);
    const [OverlayText,setOverlayText] = useState('Registration is currently not complete');
    const [popUpErr,setpopUpErr] = useState(false);
    const [Registered,setRegistered] = useState(false);

    const [usercreate,setUsercreate]=useState({
        AccountID: "",
        PersonName: "",
        CryptoBalance: "",
        phonenumber:"",
        password: "",
        confirmPassword:"",
    })

    const onChangeHandler = (e) => {
        setUsercreate({
            ...usercreate,
            [e.target.placeholder]: e.target.value,
        })

    }

    const BASE_URL = "http://203.247.240.226:22650/api"
    const SignupBlock = async () => {
        await axios.post(`${BASE_URL}/createAcc`, {
          "AccountID": usercreate.AccountID,
          "PersonName": usercreate.AccountID,
          "PatientName": usercreate.PersonName,
          "CryptoBalance": 10000000,
          "phonenumber":usercreate.phonenumber
        }).then(console.log);
      }

    const [loader,setLoader] = useState(false);

    const validate = ()=>{
        
        if(usercreate.PersonName,usercreate.AccountID,usercreate.phonenumber,usercreate.password,usercreate.confirmPassword == ''){
            showErr(true,true,"Unable to sign up \n please fill in all fields");
        }else if(isNaN(usercreate.phonenumber) || usercreate.phonenumber.length < 10 || usercreate.phonenumber[0] != '0' ){
            showErr(true,true,"Unable to sign up \n please enter a valid 10 digit mobile number");
        }else if(usercreate.password != usercreate.confirmPassword){
            showErr(true,true,"Unable to sign up \n your passwords do not match");
        }else if(usercreate.password.length < 6){
            showErr(true,true,"Unable to sign up \n a password must be at least 6 characters long");
        }
        else{
          
           SignupBlock()
               
        }
    }

    const showErr = (show_overlay,show_popup_err,overlay_text)=>{
        setOverlay(show_overlay);
        setpopUpErr(show_popup_err);
        setOverlayText(overlay_text);
    }


    return (
        <>
            <StatusBar  backgroundColor="white" barStyle="dark-content"/>
            <View style={styles.body}>
                <View style={styles.topSection}>
                </View>
                <ScrollView style={styles.bottomSection} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>                
                    <View style={{justifyContent:'center',alignItems:'center',height:'100%'}}>
                    <View style={{width:'95%',height:50,marginBottom:20}}>
                          <TouchableOpacity onPress={()=>navigation.navigate('Main')}>
                              <Feather size={50} color={'#fff'} name="chevron-left"/>
                          </TouchableOpacity>
                      </View>
                            <View style={{width:'80%',marginBottom:20}}>
                                <Text style={{color:'#fff',fontSize:40,marginTop:10,marginBottom:30}}>First Visit {category}</Text> 
                                <TextInput name="PersonName" value={usercreate.PersonName} onChange={onChangeHandler} style={styles.firstitem} placeholderTextColor="#fff" placeholder="PersonName" />  
                                <TextInput name="AccountID" value={usercreate.AccountID} onChange={onChangeHandler} style={styles.otheritem} placeholderTextColor="#fff" placeholder="AccountID" /> 
                                <TextInput name="phonenumber" value={usercreate.phonenumber} onChange={onChangeHandler} style={styles.otheritem} placeholderTextColor="#fff" placeholder="phonenumber" />
                                <TextInput name="password" value={usercreate.password} onChange={onChangeHandler} secureTextEntry={true} style={styles.otheritem} placeholderTextColor="#fff" placeholder="password" />
                                <TextInput name="confirmPassword" value={usercreate.confirmPassword} onChange={onChangeHandler} secureTextEntry={true} style={styles.otheritem} placeholderTextColor="#fff" placeholder="confirmPassword" />  
                            </View>
                            <AuroraButton buttonFunction={()=>validate()} bgcolor="white" text="Create Account" color={"black"} outline={false}/>
                    </View>
                </ScrollView>
            </View>
            <Overlay isVisible={overlay}>
                <PopUp errorBtn={()=>setOverlay(false)} text={OverlayText} error={popUpErr} />
            </Overlay>

            <Overlay isVisible={Registered}>
                <PopUp text={"Welcome to Aurora, please check your inbox to verify your account."} />
            </Overlay>

            <Overlay isVisible={loader}>
                <Loader text={'Creating your account, please wait..'}/>
            </Overlay>
        </>
    )
}

export default SignUp

const styles = StyleSheet.create({
    topSection:{
        alignItems:'center',
        justifyContent:'center',
        height:'5%',

    },
    body:{
        flex:1,
        backgroundColor:'white',
        flexDirection:'column',
        justifyContent:'space-between'
    },
    firstitem:{
        height:52,
        width:'100%',
        color:'white',
        borderRadius:10,
        borderWidth:1,
        borderColor:'white',
        paddingLeft:10
    },
    otheritem:{
        height:52,
        width:'100%',
        color:'white',
        borderRadius:10,
        borderWidth:1,
        borderColor:'white',
        paddingLeft:10,
        marginTop:10
    },
    bottomSection:{
        width:'100%',
        height:'95%',
        backgroundColor:'rgb(134, 193, 217)',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
    }

})
