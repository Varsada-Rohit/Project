import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function AppButton({title, onPress, backgroundColor, color, style, icon}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View
        style={[styles.constainer, {backgroundColor: backgroundColor}, style]}>
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
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  constainer: {
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
    borderRadius: 5,
    backgroundColor: 'grey',
    marginVertical: 10,
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default AppButton;
