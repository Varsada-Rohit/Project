import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Config/Colors';

function AppTextInput({icon, onBlur, error, ...otherPerameters}) {
  const [focus, setFocus] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {borderColor: error ? Colors.red : focus ? Colors.yellow : Colors.grey},
      ]}>
      {icon && (
        <MaterialCommunityIcons style={styles.icon} name={icon} size={25} />
      )}
      <TextInput
        style={styles.textInput}
        {...otherPerameters}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setFocus(false);
          onBlur();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ececec',
    // height: 40,
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 7,
    paddingVertical: 8,
    borderWidth: 1,
  },
  icon: {
    marginHorizontal: 5,
    color: Colors.yellow,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingRight: 25,
    fontFamily: 'Poppins-Regular',
  },
});

export default AppTextInput;
