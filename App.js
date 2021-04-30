import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './App/Navigators/AuthNavigator';
import HomeTabNavigator from './App/Navigators/HomeTabNavigator';
import auth from '@react-native-firebase/auth';
import AuthContext from './App/Auth/Context';
import firestore from '@react-native-firebase/firestore';
import AppStackNavigator from './App/Navigators/AppStackNavigator';
function App() {
  const [user, setUser] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    setUser(auth().currentUser);
    return () => {};
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser, location, setLocation}}>
      <NavigationContainer>
        {user ? <AppStackNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
    // <Addpg />
    // <LabeledCheckbox />
  );
}

export default App;
