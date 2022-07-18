import React, {useEffect,useState} from 'react';
import axios from 'axios'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import UserRecords from "./UserRecords"
import UserTransactions from "./UserTransactions"
import UserInformation from "./UserInformation"
import UserRequestPHR from './UserRequestPHR';

function UserMenu({route}){
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
    })
        await axios.get(`http://203.247.240.226:8080/fhir/Patient?organization=INLab&general-practitioner=${id}`).then((res) => {
          for(const item of res.data.entry) {
            if(item.resource.meta.tag  == undefined) {
                temp.push(item);
            } 
          }
          console.log(temp)
          setRecord(temp);
        })
    }

    const Tab = createBottomTabNavigator();
    console.log(user)
    console.log(record)
    return(
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="User Transaction records" children={({navigation})=><UserTransactions user={user} navigation={navigation}/>} />
          <Tab.Screen name="User Request PHR" children={({navigation})=><UserRequestPHR user={user} record={record} navigation={navigation}/>} />
          <Tab.Screen name="User Records" children={({navigation})=><UserRecords user={user} record={record} navigation={navigation}/>} />
          <Tab.Screen name="User Information" children={({navigation})=><UserInformation user={user} navigation={navigation}/>}  />
      </Tab.Navigator>
    );
}

export default UserMenu;
  