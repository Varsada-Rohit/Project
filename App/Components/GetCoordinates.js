import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Modal, PermissionsAndroid} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {useFormikContext} from 'formik';

import FormInput from './FormInput';
import Icon from './Icon';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoicm9oaXQyODEiLCJhIjoiY2tseGFkbDVnMXJtMjJwcDNxMDl5ZW13MiJ9.3VskmVrWzTwIDpD__CWJng',
);

function GetCoordinates({feildName}) {
  const [showMap, setShowMap] = useState(false);
  const {values, setFieldValue, setFieldTouched} = useFormikContext();
  const [marker, setMarker] = useState();

  useEffect(() => {
    requestLocationPermision();
  }, []);

  RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
    interval: 10000,
    fastInterval: 5000,
  })
    .then((data) => {})
    .catch((err) => {});

  const requestLocationPermision = async () => {
    let grant = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission required',
        message: 'Location is required to for map',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if ((grant = 'granted')) {
    } else {
      Alert.alert('Location', 'Location Required to run app', [{text: 'ok'}]);
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={showMap} animationType="slide">
        <MapboxGL.MapView
          style={{width: '100%', height: '100%'}}
          logoEnabled={false}
          onPress={(event) => {
            setMarker(event.geometry.coordinates);
            setFieldValue(feildName, event.geometry.coordinates);
          }}>
          <MapboxGL.Camera followUserLocation></MapboxGL.Camera>
          {marker && (
            <MapboxGL.PointAnnotation id="marker" coordinate={marker} />
          )}
          <MapboxGL.UserLocation />
        </MapboxGL.MapView>
        <Icon
          name="check"
          style={styles.doneIcon}
          onPress={() => {
            setFieldTouched(feildName);
            setShowMap(false);
          }}
        />
      </Modal>
      <FormInput
        placeholder="Coordinate"
        value={values[feildName].toString()}
        feildName={feildName}
        editable={false}
      />
      <Icon
        style={styles.locationIcon}
        name="map-marker-radius"
        onPress={() => {
          setShowMap(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  doneIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  locationIcon: {
    position: 'absolute',
    right: 15,
    top: 20,
  },
});

export default GetCoordinates;
