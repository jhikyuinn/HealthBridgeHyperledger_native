import React, {useEffect,useState} from 'react';
import axios from 'axios'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SourcesRecords from "./SourcesRecords"
import SourcesSendPHR from "./SourcesSendPHR"
import SourcesInformation from "./SourcesInformation"

function SourcesMenu({route}){
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
        axios.get(`http://203.247.240.226:8080/fhir/Patient?organization=${id}`).then((res) => {
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
          <Tab.Screen name="Sources Send PHR" children={({navigation})=><SourcesSendPHR user={user} navigation={navigation}/>} />
          <Tab.Screen name="Sources Records" children={({navigation})=><SourcesRecords user={user} record={record} navigation={navigation}/>} />
          <Tab.Screen name="Sources Information" children={({navigation})=><SourcesInformation user={user} navigation={navigation}/>}  />
      </Tab.Navigator>
    );
}

export default SourcesMenu;
  