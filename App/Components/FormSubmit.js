import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppButton from './AppButton';
import {useFormikContext} from 'formik';

function FormSubmit({...otherPerameters}) {
  const {handleSubmit} = useFormikContext();
  return <AppButton {...otherPerameters} onPress={handleSubmit} />;
}

export default FormSubmit;
