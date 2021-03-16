import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function AppButton({title, onPress, backgroundColor, color, style, icon}) {
  return (
    <TouchableOpacity
      style={[styles.constainer, {backgroundColor: backgroundColor}, style]}
      onPress={onPress}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          color={color ? color : 'black'}
          size={20}
          style={styles.icon}
        />
      )}
      <Text style={[styles.title, {color: color ? color : 'black'}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  constainer: {
    width: '100%',
    flexDirection: 'row',
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
  icon: {
    marginHorizontal: 5,
  },
});

export default AppButton;
