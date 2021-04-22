import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useFormikContext} from 'formik';
import Colors from '../Config/Colors';

function LabeledCheckbox({label, feildName}) {
  const {values, setFieldValue} = useFormikContext();
  const x = feildName.split('.');
  return (
    <View style={styles.container}>
      <CheckBox
        tintColors={{true: Colors.primary, false: Colors.black}}
        value={values[x[0]][x[1]]}
        onValueChange={(value) => setFieldValue(feildName, value)}
      />
      <Text>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
});

export default LabeledCheckbox;
