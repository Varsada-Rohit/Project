import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AppTextInput from './AppTextInput';

function AppPasswordInput({...otherPerameters}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <AppTextInput
        placeholder="Password"
        secureTextEntry={showPassword ? false : true}
        {...otherPerameters}
      />
      <MaterialCommunityIcons
        name={showPassword ? 'eye' : 'eye-off'}
        size={25}
        style={styles.icon}
        onPress={() => setShowPassword(!showPassword)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  icon: {
    position: 'absolute',
    right: 15,
    top: 28,
    elevation: 3,
  },
});

export default AppPasswordInput;
