import React, {useEffect,useState} from 'react';
import axios from 'axios'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header } from 'react-native-elements';


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
    return(<>
      <Header
      backgroundColor='rgb(134, 193, 217)'
      leftComponent={{text:"HealthBridge",style:{width:200,fontSize:30,fontWeight: 'bold'}}}
      rightComponent={{ icon:"notifications",size:30 }}
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
                size=30
            } else if (route.name === 'Records') {
              iconName = focused ? 'ios-medkit' : 'ios-medkit-outline';
              color="rgb(134, 193, 217)"
              size=30
            }
            else if (route.name === 'Prediction') {
              iconName = focused ? 'ios-bar-chart' : 'ios-bar-chart-outline';
              color="rgb(134, 193, 217)"
              size=30
            }
            else if (route.name === 'Information') {
              iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline';
              color="rgb(134, 193, 217)"
              size=30
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        }
          )}>

          <Tab.Screen 
          name="Records" 
          options={{tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            }
          }} 
          children={({navigation})=><OwnerRecords user={user} record={record}   
          navigation={navigation}/>} 
          />
          <Tab.Screen 
          name="Transactions" 
          options={{tabBarLabelStyle: {
            activeTintColor: "black",
				    inactiveTintColor: "gray",
            fontSize: 12,
            fontWeight: "bold",
            }
          }} 
          children={({navigation})=><OwnerTransactions user={user} 
          navigation={navigation}/>} 
          />
          <Tab.Screen 
          name="Prediction" 
          options={{tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            }
          }} 
          children={({navigation})=><OwnerPrediction user={user} 
          navigation={navigation}/>} 
          />
          <Tab.Screen 
          name="Information" 
          options={{tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            }
          }} 
          children={({navigation})=><OwnerInformation user={user} 
          navigation={navigation}/>}  
          />
      </Tab.Navigator>
      </>
    );
}

export default OwnerMenu;
  