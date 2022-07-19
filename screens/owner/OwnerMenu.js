import React, {useEffect,useState} from 'react';
import axios from 'axios'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import OwnerPrediction from './OwnerPrediction';
import OwnerTransactions from './OwnerTransactions';
import OwnerRecords from './OwnerRecords';
import OwnerInformation from './OwnerInformation';

function OwnerMenu({route}){
    const [user, setUser] = useState([]);
    const [record, setRecord] = useState([]);
    const {category}=route.params
    const {id}=route.params

    useEffect(() => {
        getUsers();
      },[])

    async function getUsers() { 
        let temp = [];
        await axios.get(`http://203.247.240.226:22650/api/query/${id}`).then((res) => {
        setUser(res.data)
        console.log(res.data)
        axios.get(`http://203.247.240.226:8080/fhir/Patient?phone=${res.data.phonenumber}&name=${res.data.patientName}`).then((res) => {
          for(const item of res.data.entry) {
            if(item.resource.meta.tag  == undefined) {
                temp.push(item);
            } 
          }
          console.log(temp)
          setRecord(temp);
        })
      })
    }

    const Tab = createBottomTabNavigator();
    console.log(user)
    console.log(record)
    return(
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Owner Transaction records" children={({navigation})=><OwnerTransactions user={user} navigation={navigation}/>} />
          <Tab.Screen name="Owner Records" children={({navigation})=><OwnerRecords user={user} record={record} navigation={navigation}/>} />
          <Tab.Screen name="Owner Prediction" children={({navigation})=><OwnerPrediction user={user} navigation={navigation}/>} />
          <Tab.Screen name="Owner Information" children={({navigation})=><OwnerInformation user={user} navigation={navigation}/>}  />
      </Tab.Navigator>
    );
}

export default OwnerMenu;
  