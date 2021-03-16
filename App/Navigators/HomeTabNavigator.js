import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Addpg from '../Screen/Addpg';
import Colors from '../Config/Colors';
import Profile from '../Screen/Profile';

const Tab = createBottomTabNavigator();

function HomeTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          // zIndex: 0,
          // borderBottomWidth: 15,
          // borderTopRightRadius: 15,
          // borderWidth: 10,
          // borderColor: Colors.white,
          // borderTopWidth: 10,
          // borderTopColor: Colors.white,
          // position: 'relative',
          // marginHorizontal: 10,
          // marginVertical: 5,
          borderRadius: 15,
          // width: '90%',
          // bottom: 19,

          borderTopLeftRadius: 15,
          backgroundColor: '#E8E8E8',
        },
        keyboardHidesTabBar: true,
        tabStyle: {
          justifyContent: 'center',
        },
        // activeBackgroundColor: Colors.yellow,
      }}>
      <Tab.Screen name="Add" component={Addpg} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default HomeTabNavigator;
