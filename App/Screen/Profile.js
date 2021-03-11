import React from 'react';
import {View, StyleSheet} from 'react-native';
import useAuth from '../Auth/useAuth';

import AppButton from '../Components/AppButton';

function Profile() {
  const {removeToken} = useAuth();

  return (
    <View style={styles.container}>
      <AppButton title="Logout" onPress={() => removeToken()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Profile;
