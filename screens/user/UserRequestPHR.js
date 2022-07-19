import React, {useEffect,useState} from 'react';
import { Text, View,Button, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import AuroraButton from '../../components/AuroraButton';
import UserRequestItem from './UserRequestItem'

function UserRequestPHR({user, record}) {
    const [request, setRequest] = useState({
        req:undefined,
    });
    const [resultList, setResultList] = useState();


    const getRequest = async () => {
        let temp = [];
        await axios.get(`http://203.247.240.226:8080/fhir/Condition?code:text=cold`).then((res) => {
            console.log(res)
            for(const item of res.data.entry) {
                temp.push(item);
            }
            console.log(temp);
        })
        setResultList(temp);
    }

    const changeHandler = (e) => {
        setRequest({
            [e.target.name]: e.target.value,
        })
    }

    const onSearchHandler = () => {
        console.log("3")
        getRequest();
    }
 
    return (
    <View>
        <View >
            <TextInput  style={styles.input} type="text" placeholder="Search Symptom " name="request.req" value={request.req} onChange={changeHandler}/>
            <AuroraButton buttonFunction={()=>onSearchHandler()} bgcolor="white" text="Search" color={"black"} outline={false}/>
        </View>
        <View>
        {resultList && resultList.map((item, index) => {
            return <UserRequestItem item={item} key={index} />
        })}
        </View>
    </View>
    );
  }
  
  export default UserRequestPHR;

  const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
  });

  