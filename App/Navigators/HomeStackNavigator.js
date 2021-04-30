import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {enableScreens} from 'react-native-screens';

import ListingScreen from '../Screen/ListingScreen';
import MapScreen from '../Screen/MapScreen';
import SelectLocation from '../Components/SelectLocation';
import ListingDetail from '../Screen/ListingDetail';

const Stack = createSharedElementStackNavigator();

enableScreens();

function HomeStackNavigator() {
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
      <Stack.Screen
        name="Listing"
        component={ListingScreen}
        options={{
          title: 'PG',
        }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{headerTransparent: true, title: ''}}
      />
      <Stack.Screen
        name="CardDetail"
        component={ListingDetail}
        // sharedElementsConfig={(route, otherRoute, showing) => {
        //   const {id} = route.params;
        //   return [
        //     {
        //       id: `item.${id}.photo`,
        //       animation: 'fade',
        //       // resize: 'clip'
        //       // align: ''left-top'
        //     },
        //   ];
        // }}

        options={{
          headerTransparent: true,
          title: '',
          gestureEnabled: false,
          transitionSpec: {
            open: {animation: 'timing', config: {duration: 300}},
            close: {animation: 'timing', config: {duration: 300}},
          },
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
