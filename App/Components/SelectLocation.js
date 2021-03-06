import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Icon, Button} from 'native-base';
navigator.geolocation = require('@react-native-community/geolocation');
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../Auth/Context';

function SelectLocation({navigation}) {
  const [animatingValue, setAnimatingValue] = useState(new Animated.Value(1));
  const [coordinate, setCoordinate] = useState();
  const {location, setLocation} = useContext(AuthContext);

  useNavigation;

  const animateHeight = () => {
    Animated.timing(animatingValue, {
      toValue: 0.4,
      useNativeDriver: false,
      duration: 500,
    }).start();
  };

  const resetAnimation = () => {
    Animated.timing(animatingValue, {
      toValue: 1,
      useNativeDriver: false,
      duration: 500,
    }).start();
  };

  return (
    <>
      <Animated.View style={[styles.block1, {flex: animatingValue}]}>
        {/* <View style={styles.input}></View> */}
        <Text
          style={{
            fontSize: 70,
            color: 'white',
            fontFamily: 'ShadowsIntoLight-Regular',
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 70,
            overflow: 'visible',
          }}>
          {' ' + 'SES' + ' '}
        </Text>
      </Animated.View>
      <View style={styles.block2}>
        <GooglePlacesAutocomplete
          minLength={2}
          currentLocation={true}
          currentLocationLabel="Current location"
          renderRightButton={() => (
            <TouchableOpacity
              disabled={coordinate ? false : true}
              onPress={() => {
                navigation.navigate('HomeTab');
              }}>
              <Icon
                style={{color: coordinate ? 'black' : '#A9A9A9', margin: 10}}
                name="ios-arrow-forward"
              />
            </TouchableOpacity>
          )}
          renderLeftButton={() => (
            <Icon name="ios-search" style={{margin: 10}} />
          )}
          fetchDetails
          textInputProps={{
            onFocus: () => animateHeight(),
          }}
          styles={{
            container: {
              top: -25,
              // backgroundColor: 'white',
            },
            textInputContainer: {
              width: '100%',
              zIndex: 4,
              backgroundColor: 'white',
              alignItems: 'center',
              borderRadius: 5,
              elevation: 5,
            },
            textInput: {
              backgroundColor: 'transparent',
              // height: '100%',
              marginTop: 5,
            },
          }}
          placeholder="Enter location / landmark"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            resetAnimation();
            setCoordinate(details.geometry.location);
            setLocation(details.geometry.location);
            navigation.navigate('HomeTab');
            // console.log(details.geometry.location);
            // console.log(data);
          }}
          nearbyPlacesAPI={'None'}
          query={{
            key: 'AIzaSyCiXRGvZ23QernKQP4lnzH-8mdj2Zdb2fs',
            language: 'en',
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  block1: {
    backgroundColor: '#627ca8',
    justifyContent: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // flex: 1,
    // zIndex: 1,
  },
  block2: {
    backgroundColor: '#eee9e0',
    // paddingTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
  },
  block: {
    position: 'absolute',
    // backgroundColor: 'red',
    zIndex: 100,

    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginHorizontal: 10,
  },
});

export default SelectLocation;
