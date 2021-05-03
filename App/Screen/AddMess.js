import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {geohashForLocation} from 'geofire-common';
import * as yup from 'yup';

import Colors from '../Config/Colors';
import FormikForm from '../Components/FormikForm';
import FormInput from '../Components/FormInput';
import FormInputImage from '../Components/FormInputImage';
import FormSubmit from '../Components/FormSubmit';
import GetCoordinates from '../Components/GetCoordinates';
import Loading from '../Components/Loading';
import useAuth from '../Auth/useAuth';

function AddMess() {
  const [loading, setLoading] = useState(false);
  const {user} = useAuth();

  const Schema = yup.object().shape({
    title: yup.string().required().label('Name'),
    address: yup.string().required(),
    rate: yup.number().required(),
    images: yup.array().min(1).required(),
    about: yup.string().required(),
    coordinate: yup.object().required(),
  });

  const handleSubmit = (values, resetForm) => {
    setLoading(true);

    let geo = geohashForLocation([
      values.coordinate['latitude'],
      values.coordinate['longitude'],
    ]);

    let formdata = {...values};
    delete formdata.coordinate;
    delete formdata.images;
    let firestoreRef = firestore().collection('Mess');
    firestoreRef
      .add({
        Location: new firestore.GeoPoint(
          values.coordinate['latitude'],
          values.coordinate['longitude'],
        ),
        geohash: geo,
        Photos: [],
        rating: 0,
        userId: user.email,
        About: formdata.about,
        rate: formdata.rate,
        noOfRatings: 0,
        Address: formdata.address,
        Title: formdata.title,
      })
      .then(async (data) => {
        await values.images.map(async (img, i) => {
          let storageRef = storage()
            .ref('MessPhotos/' + data.id)
            .child('image' + i);
          await storageRef.putFile(img);
          let url = await storageRef.getDownloadURL();
          await firestoreRef
            .doc(data.id)
            .update({Photos: firestore.FieldValue.arrayUnion(url)});
        });
        resetForm();
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error adding mess', error);
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
            address: '',
            rate: '',
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
            placeholder="Rate /m"
            keyboardType="numeric"
            feildName="rate"
            icon="currency-inr"
          />
          {/* <FormInput
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
              borderRadius: 5,
              marginHorizontal: 3,
              padding: 15,
              borderColor: Colors.grey,
              backgroundColor: Colors.lightSecondary,
              elevation: 2,
              marginVertical: 10,
            }}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>For </Text>
            <Text style={{marginLeft: 10}}>Boys</Text>
            <CheckBox
              value={forBoys}
              tintColors={{true: Colors.primary, false: Colors.black}}
              onValueChange={(value) => setForBoys(value)}
            />
            <Text style={{marginLeft: 10}}>Girls</Text>
            <CheckBox
              value={!forBoys}
              tintColors={{true: Colors.primary, false: Colors.black}}
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
              marginHorizontal: 3,
              borderRadius: 5,
              borderColor: Colors.grey,
              backgroundColor: Colors.lightSecondary,
              elevation: 2,
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
          </View> */}
          <FormInput
            icon="information-variant"
            placeholder="About Property"
            feildName="about"
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
});

export default AddMess;
