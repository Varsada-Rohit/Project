import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Addpg from '../Screen/Addpg';
import Colors from '../Config/Colors';
import {Icon} from 'native-base';
import HomeStackNavigator from './HomeStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import AddingStackNavigator from './AddingStackNavigator';
import Mess from '../Screen/Mess';
import {getFocusedRouteNameFromRoute} from '@react-navigation/core';

const Tab = createMaterialBottomTabNavigator();

function HomeTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-search-circle'
              : 'ios-search-circle-outline';
          } else if (route.name === 'Mess') {
            iconName = focused ? 'ios-restaurant' : 'ios-restaurant-outline';
          } else if (route.name === 'ProfileStack') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Book') {
            iconName = focused ? 'ios-book' : 'ios-book-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} style={{color: color, fontSize: 25}} />;
        },
      })}
      // sceneAnimationEnabled
      // backBehavior="firstRoute"
      shifting
      labeled={false}
      barStyle={{
        backgroundColor: Colors.primary,
        // borderBottomEndRadius: 20,
        borderWidth: 5,
        borderColor: Colors.primary,
        margin: 5,
        marginHorizontal: 10,
        backfaceVisibility: 'visible',
        borderRadius: 2,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        elevation: 5,
      }}
      keyboardHidesNavigationBar
      style={{
        backgroundColor: Colors.secondary,
        display: 'flex',
      }}
      // style={{backgroundColor: Colors.primary}}
      // tabBarOptions={{
      //   showLabel: false,
      //   activeTintColor: 'white',
      //   inactiveTintColor: 'white',
      //   style: {
      //     backgroundColor: '#627ca8',
      //     borderBottomEndRadius: 20,
      //     borderBottomStartRadius: 20,
      //     margin: 10,
      //     borderTopEndRadius: 2,
      //     borderTopStartRadius: 2,
      //   },
      //   keyboardHidesTabBar: true,
      //   tabStyle: {
      //     justifyContent: 'center',
      //   },

      //   // labelStyle: {
      //   //   color: 'black',
      //   // },
      //   // activeBackgroundColor: Colors.yellow,
      // }}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Mess" component={Mess} />
      <Tab.Screen name="Book" component={Mess} />
      <Tab.Screen name="ProfileStack" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}

export default HomeTabNavigator;
