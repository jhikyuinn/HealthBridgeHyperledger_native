import React, {useEffect,useState} from 'react';
import { Text, View,Button, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function UserRequestPHR({user, record}) {
    const [request, setRequest] = useState({
        req: "",
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
    <View >
    <TextInput  style={styles.input} type="text" placeholder="Search Symptom " name="req" value={request.req} onChange={changeHandler}/>

      <Button title="Search" onClick={onSearchHandler}></Button>
    </View>
    );
  }
  
  export default UserRequestPHR;

  const styles = StyleSheet.create({
    input: {
      marginTop:40,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  