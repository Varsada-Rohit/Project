import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Mess from '../Screen/Mess';
import BookDetail from '../Screen/BookDetail';
import Colors from '../Config/Colors';
import ListingDetail from '../Screen/ListingDetail';

const Stack = createStackNavigator();

function MessStackNavigator() {
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
      <Stack.Screen name="Mess" component={Mess} />
      <Stack.Screen
        name="CardDetail"
        component={ListingDetail}
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

export default MessStackNavigator;
