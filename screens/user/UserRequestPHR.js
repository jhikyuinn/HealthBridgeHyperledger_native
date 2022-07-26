import React, {useEffect,useState} from 'react';
import { Text, View,Button, StyleSheet} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import AuroraButton from '../../components/AuroraButton';

function UserRequestPHR({user, record,navigation}) {
    const [request, setRequest] = useState({
        req:undefined,
    });
    const [patient, setPatient] = useState({
        name: "",
        phone: "",
    });
    const [resultList, setResultList] = useState();

    async function getRequest(word) {
        console.log(word)
        let temp = [];
        await axios.get(`http://203.247.240.226:8080/fhir/Condition?code:text=${word}`).then((res) => {
            console.log(res)
            for(const item of res.data.entry) {
                temp.push(item);
            }
        })
        setResultList(temp);
    }

    const onChangeHandler = (keyvalue,e) => {
        setRequest({
            [keyvalue]: e,
        })
    }

    const getPatientInfo = async (item) => {
        console.log(item)
        await axios.get(`http://203.247.240.226:8080/fhir/${item.resource.subject.reference}`).then((res) => {
            if(res.data.name[0] !== undefined) {
                setPatient({
                    ...patient,
                    name: res.data.name[0].text,
                    phone: res.data.telecom[0].value
                })
            }
        })
        navigation.navigate("User Request Details",{item:patient})
    }

    function Requestrecord(item){
        getPatientInfo(item)
    }
 
    return (
    <View>
        <View style={styles.container}>
            <TextInput  style={styles.input} type="text" placeholder="Search Symptom " name="request.req" value={request.req} onChangeText={(e) => onChangeHandler("req", e)}/>
            <AuroraButton buttonFunction={()=>getRequest(request.req)} width="20%" height="80%" bgcolor="rgb(134, 193, 217)" text="Search" color={"black"} outline={false}/>
        </View>
        <ScrollView>
        {resultList && resultList.map((item, index) => {
            return (
                <View style={styles.Textinput}>
                    <Text>PID: {item.resource.id}</Text>
                    <Text>Symptom: {item.resource.code.text}</Text>
                    <Text>Doctor: {item.resource.extension[0] && item.resource.extension[0].valueString}</Text>
                    <Text>Assigner: {item.resource.extension[1] && item.resource.extension[1].valueString}</Text>
                    <Text>Created At: {item.resource.extension[2] && item.resource.extension[2].valueString}</Text>
                    <AuroraButton buttonFunction={()=>Requestrecord(item)} width="30%" height="25%" bgcolor="rgb(134, 193, 217)" text="Request" color={"black"} outline={false}/>
                </View>  
        )}
        )}
        </ScrollView>
    </View>
    );
  }
  
  export default UserRequestPHR;

  const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:'center',
        width:"100%",
        height:50,
        marginBottom:10,
    },
    input: {
        width:"60%",
        height:40,
        marginTop: 12,
        marginRight:10,
        borderWidth: 1,
        padding: 10,
      },
    Textinput: {
      marginTop:10,
      height: 150,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius:10,
      backgroundColor:"#fff",
    },
    textsize:{
        fontSize: 20
    },
  });


  