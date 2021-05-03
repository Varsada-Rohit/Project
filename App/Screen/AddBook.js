import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import * as yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import FormikForm from '../Components/FormikForm';
import FormInput from '../Components/FormInput';
import FormInputImage from '../Components/FormInputImage';
import FormSubmit from '../Components/FormSubmit';
import Loading from '../Components/Loading';
import Colors from '../Config/Colors';
import {useState} from 'react';
import useAuth from '../Auth/useAuth';

function AddBook() {
  const [loading, setLoading] = useState(false);
  const {user} = useAuth();

  const Schema = yup.object().shape({
    title: yup.string().required().label('Name'),

    price: yup.number().required(),
    sem: yup.number().required().min(1).max(10),
    images: yup.array().min(1).required(),
    branch: yup.string().required(),
    description: yup.string().required(),
    field: yup.string().required(),
    // coordinate: yup.object().required(),
  });

  const handleSubmit = async (bookInfo, resetForm) => {
    setLoading(true);

    const firestoreRef = firestore().collection('Book');
    firestoreRef
      .add({
        userId: user.email,
        Title: bookInfo.title,
        Price: parseInt(bookInfo.price),
        Branch: bookInfo.branch,
        Field: bookInfo.field,
        Photos: [],
        sem: parseInt(bookInfo.sem),
        sold: false,

        Description: bookInfo.description,
      })
      .then((data) => {
        bookInfo.images.map(async (img, i) => {
          let storageRef = storage()
            .ref('BookPhotos/' + data.id)
            .child('image' + i);
          await storageRef.putFile(img);
          let url = await storageRef.getDownloadURL();
          await firestoreRef
            .doc(data.id)
            .update({Photos: firestore.FieldValue.arrayUnion(url)});
          resetForm();
          setLoading(false);
        });
      })
      .catch((error) => {
        console.log('Error uploading Pg', error);
        setLoading(false);
      });
  };

  return (
    <>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {/* <Text style={styles.heading}>Room Detail</Text> */}

        <FormikForm
          initialValues={{
            title: '',
            price: '',
            sem: '',
            description: '',
            images: [],
            field: '',
            branch: '',
          }}
          validationSchema={Schema}
          onSubmit={(values, {resetForm}) => {
            handleSubmit(values, resetForm);
          }}>
          <FormInputImage name="images" />
          <FormInput
            placeholder="Title"
            feildName="title"
            icon="format-title"
          />

          <FormInput
            placeholder="Price"
            keyboardType="numeric"
            feildName="price"
            icon="currency-inr"
          />

          <FormInput placeholder="Field" feildName="field" icon="school" />
          <FormInput placeholder="Branch" feildName="branch" icon="book" />
          <FormInput
            placeholder="Sem"
            keyboardType="numeric"
            feildName="sem"
            icon="calendar-clock"
          />
          <FormInput
            icon="information-variant"
            placeholder="About Book"
            feildName="description"
            multiline={true}
            numberOfLines={3}
          />

          <FormSubmit
            title="ADD"
            backgroundColor={'rgba(162, 171, 186,0.2)'}
            color={Colors.primary}
            style={{borderColor: Colors.primary, borderWidth: 1}}
          />
        </FormikForm>
      </ScrollView>
      <Loading visible={loading} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#eee9e0',
    overflow: 'visible',
  },

  heading: {
    fontSize: 33,
    fontFamily: 'Poppins-Regular',
    width: '75%',
    marginTop: 20,
    marginBottom: 30,
  },
});

export default AddBook;
