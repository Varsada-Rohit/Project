import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

function AppButton({title, onPress, backgroundColor, color, style}) {
  return (
    <TouchableOpacity
      style={[styles.constainer, {backgroundColor: backgroundColor}, style]}
      onPress={onPress}>
      <Text style={[styles.title, {color: color ? color : 'black'}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  constainer: {
    width: '100%',

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'grey',
    marginVertical: 10,
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    textTransform: 'uppercase',
  },
});

export default AppButton;
