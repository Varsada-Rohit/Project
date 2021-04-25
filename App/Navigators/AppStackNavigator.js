import React from 'react';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Colors from '../Config/Colors';
import HomeTabNavigator from './HomeTabNavigator';
import ChatScreen from '../Screen/ChatScreen';
import AllChatScreen from '../Screen/AllChatScreen';

const Stack = createStackNavigator();

function AppStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: {backgroundColor: Colors.secondary, elevation: 0},
        headerTitleStyle: {color: Colors.primary},
      }}>
      <Stack.Screen
        name="HomeTab"
        component={HomeTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="AllChats" component={AllChatScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

export default AppStackNavigator;
