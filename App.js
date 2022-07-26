import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Main from './screens/Main';
import OwnerMenu from './screens/owner/OwnerMenu';
import UserMenu from './screens/user/UserMenu';
import SourcesMenu from './screens/sources/SourcesMenu';
import OwnerNotification from './screens/owner/OwnerNotification'
import OwnerRequestRecordsDetails from './screens/owner/OwnerRequestRecordsDetails'
import OwnerRecordsDetails from './screens/owner/OwnerRecordsDetails';
import UserNotification from './screens/user/UserNotification'
import UserResponsePayment from './screens/user/UserResponsePayment';
import UserRequestDetails from './screens/user/UserRequestDetails'

export default function App() {
  const Stack = createStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Main} ></Stack.Screen>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Owner Notification" component={OwnerNotification}/>
      <Stack.Screen name="Owner Request Records Details" component={OwnerRequestRecordsDetails}/>
      <Stack.Screen name="User Notification" component={UserNotification}/>
      <Stack.Screen name="User Response Payment" component={UserResponsePayment}/>
      <Stack.Screen name="User Request Details" component={UserRequestDetails}/>
      <Stack.Screen name="Owner Records Details" component={OwnerRecordsDetails}/>
      <Stack.Screen
          name="OwnerMenu"
          component={OwnerMenu}
          options={{
            title: 'Health Bridge',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="UserMenu"
          component={UserMenu}
          options={{
            title: 'Health Bridge',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="SourcesMenu"
          component={SourcesMenu}
          options={{
            title: 'Health Bridge',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      
      </Stack.Navigator>

    </NavigationContainer>



    
    
  );
}