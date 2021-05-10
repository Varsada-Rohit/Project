import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import BookListing from '../Screen/BookListing';
import BookDetail from '../Screen/BookDetail';
import Colors from '../Config/Colors';

const Stack = createStackNavigator();

function BookStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureDirection: 'horizontal',
        headerStyle: {backgroundColor: '#eee9e0', elevation: 0},
        // headerTitleStyle: {color: '#627ca8'},
        headerTintColor: '#627ca8',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        // headerTransparent: true,
      }}>
      <Stack.Screen name="Books" component={BookListing} />
      <Stack.Screen
        name="BookDetail"
        component={BookDetail}
        options={{
          headerStyle: {backgroundColor: Colors.primary, elevation: 0},

          headerTintColor: 'white',
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}

export default BookStackNavigator;
