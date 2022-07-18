import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Main from './screens/Main';
import OwnerMenu from './screens/owner/OwnerMenu';
import UserMenu from './screens/user/UserMenu';
import SourcesMenu from './screens/sources/SourcesMenu';

export default function App() {
  const Stack = createStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Main}></Stack.Screen>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen
          name="OwnerMenu"
          component={OwnerMenu}
        />
        <Stack.Screen
          name="UserMenu"
          component={UserMenu}
        />
        <Stack.Screen
          name="SourcesMenu"
          component={SourcesMenu}
        />
      
      </Stack.Navigator>

    </NavigationContainer>



    
    
  );
}