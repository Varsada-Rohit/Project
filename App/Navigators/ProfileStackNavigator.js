import React from 'react';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Profile from '../Screen/Profile';
import ListingDetail from '../Screen/ListingDetail';
import Colors from '../Config/Colors';
import UserPropertyList from '../Screen/UserPropertyList';
import UserBookList from '../Screen/UserBookList';
import BookDetail from '../Screen/BookDetail';
import UserMessList from '../Screen/UserMessList';

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
      <Stack.Screen name="UserBooks" component={UserBookList} />
      <Stack.Screen name="UserMesses" component={UserMessList} />
      <Stack.Screen name="CardDetail" component={ListingDetail} />
      <Stack.Screen name="BookDetail" component={BookDetail} />
    </Stack.Navigator>
  );
}

export default ProfileStackNavigator;
