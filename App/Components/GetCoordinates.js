import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Modal, PermissionsAndroid} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {useFormikContext} from 'formik';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import FormInput from './FormInput';
import Icon from './Icon';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoicm9oaXQyODEiLCJhIjoiY2tseGFkbDVnMXJtMjJwcDNxMDl5ZW13MiJ9.3VskmVrWzTwIDpD__CWJng',
);

function GetCoordinates({feildName}) {
  const [showMap, setShowMap] = useState(false);
  const {values, setFieldValue, setFieldTouched} = useFormikContext();
  const [marker, setMarker] = useState();
  const [initialRegion, setInitialRegion] = useState();

  useEffect(() => {
    requestLocationPermision();
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition((position) => {
      console.log(position.coords);
      setInitialRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
      setMarker({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setFieldValue(feildName, {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };

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
      <Modal visible={showMap} animationType="none">
        {/* <MapboxGL.MapView
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
        </MapboxGL.MapView> */}
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{width: '100%', height: '100%'}}
          followsUserLocation
          initialRegion={initialRegion}
          showsUserLocation
          onMapReady={() => {}}>
          {marker && (
            <Marker
              coordinate={marker}
              draggable
              onDragEnd={(event) => {
                setMarker(event.nativeEvent.coordinate);
                setFieldValue(feildName, event.nativeEvent.coordinate);
              }}
            />
          )}
        </MapView>
        <Icon
          name="check"
          style={styles.doneIcon}
          onPress={() => {
            console.log(values[feildName]);
            if (!values[feildName]) {
              getCurrentLocation();
            }
            // setFieldTouched(feildName);
            setShowMap(false);
          }}
        />
      </Modal>
      <FormInput
        placeholder="Coordinate"
        value={
          'Latitude : ' +
          values[feildName]['latitude'] +
          '\nLongitude : ' +
          values[feildName]['longitude']
        }
        feildName={feildName}
        multiline
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
    elevation: 3,
    right: 15,
    top: 30,
  },
});

export default GetCoordinates;
