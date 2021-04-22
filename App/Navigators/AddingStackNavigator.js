import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Addpg from '../Screen/Addpg';
import Colors from '../Config/Colors';
import AddMess from '../Screen/AddMess';

const Stack = createStackNavigator();

function AddingStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        gestureDirection: 'horizontal',
        headerStyle: {backgroundColor: Colors.secondary, elevation: 3},
        headerTitleStyle: {color: Colors.primary},
      }}>
      <Stack.Screen
        name="AddMess"
        component={AddMess}
        options={{headerTitle: 'Mess Detail'}}
      />
      <Stack.Screen
        name="AddPG"
        component={Addpg}
        options={{headerTitle: 'Room Detail'}}
      />
    </Stack.Navigator>
  );
}

export default AddingStackNavigator;
