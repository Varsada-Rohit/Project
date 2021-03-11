import React from 'react';
import {useFormikContext} from 'formik';
import ImageInputList from './ImageInputList';
import {View} from 'react-native';
import ErrorText from './ErrorText';

function FormInputImage({name}) {
  const {values, setFieldValue, touched, errors} = useFormikContext();

  handleAdd = uri => {
    setFieldValue(name, values[name].concat(uri));
  };

  handleRemove = uri => {
    setFieldValue(name, values[name].filter(img => img !== uri));
  };

  return (
    <View>
      <ImageInputList
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
        uris={values[name]}
      />
      <ErrorText visible={touched[name]} error={errors[name]} />
    </View>
  );
}

export default FormInputImage;
