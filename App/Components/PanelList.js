import React from 'react';
import {View, StyleSheet, Text, TouchableNativeFeedback} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Config/Colors';

function PanelList({text, icon, light, onPress}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons name={icon} size={25} style={styles.icon} />
        <Text
          style={[styles.text, {color: light ? Colors.grey : Colors.black}]}>
          {text}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: Colors.grey,
    paddingVertical: 10,
    alignItems: 'center',
  },
  icon: {
    margin: 5,
    color: Colors.yellow,
  },
  text: {
    marginRight: 20,
    marginLeft: 20,
  },
});

export default PanelList;
