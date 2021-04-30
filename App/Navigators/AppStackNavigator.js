import React from 'react';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Colors from '../Config/Colors';
import HomeTabNavigator from './HomeTabNavigator';
import ChatScreen from '../Screen/ChatScreen';
import AllChatScreen from '../Screen/AllChatScreen';
import AddingStackNavigator from './AddingStackNavigator';
import SelectLocation from '../Components/SelectLocation';

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
        name="SelectLocation"
        component={SelectLocation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeTab"
        component={HomeTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllChats"
        component={AllChatScreen}
        options={{headerTitle: 'Chats'}}
      />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen
        name="Add"
        component={AddingStackNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AppStackNavigator;
