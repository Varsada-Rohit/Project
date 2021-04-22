import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SelectLocation from '../Components/SelectLocation';
import HomeTabNavigator from './HomeTabNavigator';
import Colors from '../Config/Colors';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#eee9e0', elevation: 0},
        // headerTitleStyle: {color: '#627ca8'},
        headerTintColor: '#627ca8',
        cardShadowEnabled: false,

        // headerTransparent: true,
      }}>
      <Stack.Screen
        name="SelectLocation"
        component={SelectLocation}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Home" component={HomeTabNavigator} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
