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
        {borderColor: error ? Colors.red : focus ? '#627ca8' : Colors.grey},
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
    backgroundColor: '#fffcf7',
    elevation: 2,
    marginHorizontal: 3,
    // height: 40,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 7,
    paddingVertical: 8,
    borderWidth: 1,
  },
  icon: {
    marginHorizontal: 5,
    color: '#627ca8',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingRight: 25,
    fontFamily: 'Poppins-Regular',
  },
});

export default AppTextInput;
