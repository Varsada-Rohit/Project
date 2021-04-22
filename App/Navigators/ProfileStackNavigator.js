import React from 'react';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Profile from '../Screen/Profile';
import ListingDetail from '../Screen/ListingDetail';
import Colors from '../Config/Colors';
import UserPropertyList from '../Screen/UserPropertyList';

const Stack = createStackNavigator();

function ProfileStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: {backgroundColor: Colors.secondary, elevation: 0},
        headerTitleStyle: {color: Colors.primary},
      }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Properties" component={UserPropertyList} />
      <Stack.Screen name="CardDetail" component={ListingDetail} />
    </Stack.Navigator>
  );
}

export default ProfileStackNavigator;
