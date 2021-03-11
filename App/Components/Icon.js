import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Icon = ({
  name,
  size = 40,
  backgroundColor = '#000',
  iconColor = '#fff',
  style,
  onPress,
}) => {
  return (
    <View
      style={[
        style,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <MaterialCommunityIcons
        onPress={onPress}
        name={name}
        color={iconColor}
        size={size * 0.5}
      />
    </View>
  );
};

export default Icon;

const styles = StyleSheet.create({});
