import React, {useEffect,useState} from 'react';
import axios from 'axios'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from 'react-native-elements';

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
      <>
      <Header
      backgroundColor='rgb(134, 193, 217)'
      leftComponent={{text:"HealthBridge",style:{width:200,fontSize:25,fontWeight: 'bold'}}}
      rightComponent={{ icon:"notifications" }}
      />

      <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Transactions') {
            iconName = focused
              ? 'ios-clipboard-sharp'
              : 'ios-clipboard-sharp';
              color="rgb(134, 193, 217)"
          } else if (route.name === 'Records') {
            iconName = focused ? 'ios-medkit' : 'ios-medkit-outline';
            color="rgb(134, 193, 217)"
          }
          else if (route.name === 'Request PHR') {
            iconName = focused ? 'ios-document-attach' : 'ios-document-attach-outline';
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
          <Tab.Screen name="Records" children={({navigation})=><UserRecords user={user} record={record} navigation={navigation}/>} />
          <Tab.Screen name="Transactions" children={({navigation})=><UserTransactions user={user} navigation={navigation}/>} />
          <Tab.Screen name="Request PHR" children={({navigation})=><UserRequestPHR user={user} record={record} navigation={navigation}/>} />
          <Tab.Screen name="Information" children={({navigation})=><UserInformation user={user} navigation={navigation}/>}  />
      </Tab.Navigator>
      </>
    );
}

export default UserMenu;
  