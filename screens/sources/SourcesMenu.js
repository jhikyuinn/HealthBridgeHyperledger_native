import React, {useEffect,useState} from 'react';
import axios from 'axios'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from 'react-native-elements';

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
      <>
      <Header
      backgroundColor='rgb(134, 193, 217)'
      leftComponent={{text:"HealthBridge",style:{width:200,fontSize:25,fontWeight: 'bold'}}}
      />

      <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Send PHR') {
            iconName = focused
              ? 'ios-create'
              : 'ios-create-outline';
              color="rgb(134, 193, 217)"
          } else if (route.name === 'Records') {
            iconName = focused ? 'ios-medkit' : 'ios-medkit-outline';
            color="rgb(134, 193, 217)"
          }
          else if (route.name === 'Information') {
            iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline';
            color="rgb(134, 193, 217)"
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      }
        )}>
          <Tab.Screen name="Records" children={({navigation})=><SourcesRecords user={user} record={record} navigation={navigation}/>} />
          <Tab.Screen name="Send PHR" children={({navigation})=><SourcesSendPHR user={user} navigation={navigation}/>} />
          <Tab.Screen name="Information" children={({navigation})=><SourcesInformation user={user} navigation={navigation}/>}  />
      </Tab.Navigator>
      </>
    );
}

export default SourcesMenu;
  