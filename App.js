import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AppPasswordInput from './App/Components/AppPasswordInput';
import AppTextInput from './App/Components/AppTextInput';
import Addpg from './App/Screen/Addpg';
import Login from './App/Screen/Login';
import Register from './App/Screen/Register';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './App/Navigators/AuthNavigator';
import LabeledCheckbox from './App/Components/LabeledCheckbox';
import HomeTabNavigator from './App/Navigators/HomeTabNavigator';
import auth from '@react-native-firebase/auth';
import AuthContext from './App/Auth/Context';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(auth().currentUser);
    return () => {};
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <NavigationContainer>
        {user ? <HomeTabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
    // <Addpg />
    // <LabeledCheckbox />
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default App;
