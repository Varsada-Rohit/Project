import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import * as yup from 'yup';

import FormikForm from '../Components/FormikForm';
import FormInput from '../Components/FormInput';
import Auth from '../Auth/Auth';
import FormSubmit from '../Components/FormSubmit';
import Colors from '../Config/Colors';
import useAuth from '../Auth/useAuth';
import firestore from '@react-native-firebase/firestore';

import ErrorText from '../Components/ErrorText';
import Loading from '../Components/Loading';
import FormPasswordInput from '../Components/FormPasswordInput';

const Schema = yup.object().shape({
  dname: yup.string().required().label('Name'),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
  confirmP: yup
    .string()
    .oneOf([yup.ref('password')], 'password must match')
    .required('please confirm password'),
  phone: yup
    .string()
    .max(10, 'Enter valid phone number')
    .min(10, 'Enter valid phone number')
    .required(),
});

function Register({navigation}) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {setToken} = useAuth();

  const handleSubmit = async (values) => {
    setLoading(true);
    const result = await Auth.register(values);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    try {
      firestore().collection('Users').doc(values.email).set({
        Name: values.dname,
        Email: values.email,
        Phone: values.phone,
        Pg: [],
      });
    } catch (error) {
      setError('Error saving user data');
    }
    setLoading(false);
    setToken(result.user);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>Create a new account</Text>
          <ErrorText style={styles.error} visible={true} error={error} />
          <FormikForm
            initialValues={{
              dname: '',
              email: '',
              password: '',
              confirmP: '',
              phone: '',
            }}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={Schema}>
            <FormInput
              feildName="dname"
              placeholder="Name"
              textContentType="name"
              // name="account-circle"
            />

            <FormInput
              feildName="email"
              textContentType="emailAddress"
              // icon={'email'}
              placeholder={'Email'}
              keyboardType={'email-address'}
            />
            <FormInput
              feildName="phone"
              textContentType="telephoneNumber"
              // icon={'email'}
              placeholder={'Phone'}
              keyboardType={'phone-pad'}
            />
            <FormPasswordInput
              feildName="password"
              textContentType="password"
              // name={'key'}
              placeholder={'Password'}
            />
            <FormPasswordInput
              feildName="confirmP"
              textContentType="password"
              // name={'key'}
              placeholder={'Confirm Password'}
            />
            <FormSubmit
              style={styles.submit}
              title={'Sign Up'}
              color={Colors.white}
              backgroundColor={Colors.black}
            />
          </FormikForm>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text style={styles.footer}>Already have an account? Sign in</Text>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Login')}>
              <Text> Sign in</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
      <Loading visible={loading} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  error: {
    alignSelf: 'center',
    fontSize: 18,
  },
  footer: {
    textAlign: 'center',
    color: Colors.grey,
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
    fontFamily: 'serif',
    width: '75%',
    marginTop: 10,
    marginBottom: 30,
  },
  submit: {
    alignSelf: 'center',
  },
});

export default Register;
