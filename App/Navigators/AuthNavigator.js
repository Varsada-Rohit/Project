import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Register from '../Screen/Register';
import Login from '../Screen/Login';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
