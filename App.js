import * as React from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Prediction from './screens/owner/Prediction';
import Transaction from './screens/owner/Transactions';
import Records from './screens/owner/Records';
import Information from './screens/owner/Information';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Main from './screens/Main';

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Main}></Stack.Screen>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
  
 
        <Tab.Screen name="PHR records" component={Records} />
        <Tab.Screen name="Transaction records" component={Transaction} />
        <Tab.Screen name="Prediction" component={Prediction} />
        <Tab.Screen name="Information" component={Information} />

    </NavigationContainer>



    
    
  );
}