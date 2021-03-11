import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import * as yup from 'yup';
import Auth from '../Auth/Auth';
import ErrorText from '../Components/ErrorText';
import useAuth from '../Auth/useAuth';

import FormikForm from '../Components/FormikForm';
import FormInput from '../Components/FormInput';
import FormSubmit from '../Components/FormSubmit';
import Loading from '../Components/Loading';
import Colors from '../Config/Colors';
import FormPasswordInput from '../Components/FormPasswordInput';

function Login({navigation}) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const {setToken} = useAuth();

  const Schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8, 'Please enter valid password'),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const result = await Auth.login(values);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    setLoading(false);
    setToken(result.user);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>Sign In</Text>
        <ErrorText style={styles.error} visible={true} error={error} />
        <FormikForm
          initialValues={{email: '', password: ''}}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={Schema}>
          <FormInput
            feildName="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            placeholder="Email"
          />
          <FormPasswordInput
            feildName="password"
            placeholder="Password"
            textContentType="password"
          />
          <FormSubmit
            title="Submit"
            backgroundColor={Colors.black}
            color={Colors.white}
          />
        </FormikForm>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{color: Colors.grey}}>Dont have Account? </Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Register')}>
            <Text>Sign Up</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <Loading visible={loading} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
    fontFamily: 'serif',
    width: '70%',

    marginBottom: 50,
  },
});

export default Login;
