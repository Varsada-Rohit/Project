import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  Text,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import * as yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {geohashForLocation} from 'geofire-common';

import Colors from '../Config/Colors';

import FormikForm from '../Components/FormikForm';
import FormInput from '../Components/FormInput';
import FormSubmit from '../Components/FormSubmit';
import FormInputImage from '../Components/FormInputImage';
import LabeledCheckbox from '../Components/LabeledCheckbox';
import GetCoordinates from '../Components/GetCoordinates';

import Loading from '../Components/Loading';

function Addpg() {
  const [forBoys, setForBoys] = useState(true);
  const [loading, setLoading] = useState(false);

  const {user} = useAuth();

  const Schema = yup.object().shape({
    title: yup.string().required().label('Name'),
    address: yup.string().required(),
    rent: yup.number().required(),
    capacity: yup.number().required(),
    images: yup.array().min(1).required(),
    additionF: yup.object(),
    forBoys: yup.boolean(),
    about: yup.string().required(),
    coordinate: yup.object().required(),
  });

  const handleSubmit = async (pgInfo, resetForm) => {
    setLoading(true);
    let geo = geohashForLocation([
      pgInfo.coordinate['latitude'],
      pgInfo.coordinate['longitude'],
    ]);
    const firestoreRef = firestore().collection('PG');
    firestoreRef
      .add({
        userId: user.email,
        Title: pgInfo.title,
        Rent: parseInt(pgInfo.rent),
        Address: pgInfo.address,
        Location: new firestore.GeoPoint(
          pgInfo.coordinate['latitude'],
          pgInfo.coordinate['longitude'],
        ),
        geohash: geo,
        rating: 0,
        noOfRAtings: 0,
        Photos: [],
        Capacity: parseInt(pgInfo.capacity),
        ForBoys: pgInfo.forBoys,
        AdditionFacilities: pgInfo.additionalF,
        About: pgInfo.about,
      })
      .then((data) => {
        console.log('added', data.id);
        pgInfo.images.map(async (img, i) => {
          let storageRef = storage()
            .ref('PgPhotos/' + data.id)
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
        <Text style={styles.heading}>Room Detail</Text>

        <FormikForm
          initialValues={{
            title: '',
            address: '',
            rent: '',
            capacity: '',
            additionalF: {
              Furnished: false,
              StudyT: false,
              AC: false,
              Geyser: false,
              Bed: false,
              TV: false,
              WashingM: false,
              Fride: false,
              Sofa: false,
              WaterP: false,
            },
            forBoys: true,
            about: '',
            coordinate: '',
            images: [],
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
            icon="map-marker"
            placeholder="Address"
            feildName="address"
            multiline={true}
            numberOfLines={3}
          />
          <GetCoordinates feildName="coordinate" />
          <FormInput
            placeholder="Rent"
            keyboardType="numeric"
            feildName="rent"
            icon="currency-inr"
          />
          <FormInput
            placeholder="Total Capacity"
            keyboardType="numeric"
            feildName="capacity"
            icon="account-group"
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 15,
              padding: 15,
              borderColor: Colors.grey,
              backgroundColor: '#F0F0F0',
              marginVertical: 10,
            }}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>For </Text>
            <Text style={{marginLeft: 10}}>Boys</Text>
            <CheckBox
              value={forBoys}
              tintColors={{true: Colors.yellow, false: Colors.black}}
              onValueChange={(value) => setForBoys(value)}
            />
            <Text style={{marginLeft: 10}}>Girls</Text>
            <CheckBox
              value={!forBoys}
              tintColors={{true: Colors.yellow, false: Colors.black}}
              onValueChange={(value) => setForBoys(!value)}
            />
          </View>

          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              paddingLeft: 8,
              marginTop: 10,
            }}>
            Addition Facilities
          </Text>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderRadius: 15,
              borderColor: Colors.grey,
              backgroundColor: '#F0F0F0',
              padding: 15,
              marginVertical: 10,
            }}>
            <View style={{width: '50%'}}>
              <LabeledCheckbox
                label="Furnished"
                feildName="additionalF.Furnished"
              />
              <LabeledCheckbox label="AC" feildName="additionalF.AC" />
              <LabeledCheckbox label="Bed" feildName="additionalF.Bed" />
              <LabeledCheckbox
                label="Washing Machine"
                feildName="additionalF.WashingM"
              />
              <LabeledCheckbox label="Sofa" feildName="additionalF.Sofa" />
            </View>
            <View>
              <LabeledCheckbox
                label="Study Tabel"
                feildName="additionalF.StudyT"
              />
              <LabeledCheckbox label="Geyser" feildName="additionalF.Geyser" />
              <LabeledCheckbox label="TV" feildName="additionalF.TV" />
              <LabeledCheckbox label="Fridge" feildName="additionalF.Fridge" />
              <LabeledCheckbox
                label="Water purifier"
                feildName="additionalF.WaterP"
              />
            </View>
          </View>
          <FormInput
            icon="information-variant"
            placeholder="About Property"
            feildName="about"
            multiline={true}
            numberOfLines={3}
          />

          <FormSubmit
            title="ADD"
            backgroundColor={Colors.black}
            color={Colors.white}
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
    backgroundColor: Colors.white,
  },

  heading: {
    fontSize: 33,
    fontFamily: 'Poppins-Regular',
    width: '75%',
    marginTop: 20,
    marginBottom: 30,
  },
});

export default Addpg;
