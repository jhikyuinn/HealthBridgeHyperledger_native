
import React, {useState} from 'react';
import {View, Text, StatusBar,StyleSheet, Image,TouchableOpacity, TextInput, ScrollView} from 'react-native';
import AuroraButton from '../components/AuroraButton';
import Feather from 'react-native-vector-icons/Feather';
import { Overlay } from 'react-native-elements';
import PopUp from '../components/Popup';
import Loader from '../components/Loader';
  
  const SignIn = ({navigation})=>{
      const [overlay,setOverlay] = useState(false);
      const [OverlayText,setOverlayText] = useState("");
      const [popUpErr,setpopUpErr] = useState(false);
      const [id,onChangeid] = useState('');
      const [password,onChangePassword] = useState('');
      const [loader,setLoader] = useState(false);
  
      const validate = ()=>{
          if(id == '' && password == ''){
              showErr(true,true,"Unable to sign in \n please fill in all fields");
          }else if(id == ''){
              showErr(true,true,"Unable to sign in \n please enter your id");
          }else if(password == ''){
              showErr(true,true,"Unable to sign in \n please enter your password");
          }else{

              navigation.navigate('PHR records')
          }
      }
  
  
      const showErr = (show_overlay,show_popup,overlay_text)=>{
          setOverlay(show_overlay);
          setpopUpErr(show_popup);
          setOverlayText(overlay_text);
      }
  
    return (
          <>
              <StatusBar  backgroundColor="white" barStyle="dark-content"/>
              <View style={styles.body}>

                  <ScrollView style={styles.bottomSection} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                  <View style={{justifyContent:'center',alignItems:'center',height:'100%'}}>
                      <View style={{width:'95%',height:50}}>
                          <TouchableOpacity onPress={()=>navigation.navigate('Main')}>
                              <Feather size={50} color={'#fff'} name="chevron-left"/>
                          </TouchableOpacity>
                      </View>
                      <View style={{width:'80%',marginBottom:20}}>
                          <Text style={{color:'#fff',fontSize:40,marginTop:10,marginBottom:30}}>Welcome {'\n'}Back</Text> 
                          <TextInput value={id} onChangeText={text => onChangeid(text)} style={{height:52,width:'100%',color:'white',borderRadius:10,borderWidth:1,borderColor:'white',paddingLeft:10}} placeholderTextColor="#fff" placeholder="id" />  
                          <TextInput value={password} onChangeText={text => onChangePassword(text)} secureTextEntry={true} style={{height:52,width:'100%',color:'white',borderRadius:10,marginTop:10,borderWidth:1,borderColor:'white',paddingLeft:10}} placeholderTextColor="#fff" placeholder="Password" />  
                      </View>
                      <AuroraButton buttonFunction={()=>validate()} bgcolor="white" text="Sign in" color={"black"} outline={false}/>
                      <AuroraButton buttonFunction={()=>validate()} bgcolor="white" text="Sign up" color={"black"} outline={false}/>
                  </View>
                  </ScrollView>
              </View>
              <Overlay isVisible={overlay}>
                  <PopUp errorBtn={()=>setOverlay(false)} text={OverlayText} error={popUpErr} />
              </Overlay>
              <Overlay isVisible={loader}>
                  <Loader text={'Signing you in, please wait..'}/>
              </Overlay>
          </>
      )
  }
  
  export default SignIn

  const styles = StyleSheet.create({
      topSection:{
          alignItems:'center',
          justifyContent:'center',
          height:'30%',
  
      },
      body:{
          flex:1,
          backgroundColor:'white',
          flexDirection:'column',
          justifyContent:'space-between'
      },
      bottomSection:{
          width:'100%',
          height:'70%',
          backgroundColor:'rgb(134, 193, 217)',
          borderTopLeftRadius:30,
          borderTopRightRadius:30,
      }
  
  })