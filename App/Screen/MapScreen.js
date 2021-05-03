import React, {createRef, useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  TouchableNativeFeedback,
} from 'react-native';
import useAuth from '../Auth/useAuth';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Upload from '../Backend/Upload';
import Loading from '../Components/Loading';
import Colors from '../Config/Colors';
import {Icon} from 'native-base';
import {Rating} from 'react-native-ratings';
import {SharedElement} from 'react-navigation-shared-element';
import AuthContext from '../Auth/Context';

function MapScreen({route, navigation}) {
  const {removeToken} = useAuth();
  const [initialRegion, setInitialRegion] = useState();
  const [marker, setMarker] = useState();
  const [URL, setURL] = useState();
  const panel = createRef(null);
  const panel2 = createRef(null);

  const [places, setPlaces] = useState([]);
  const [selected, setSelected] = useState(1);
  const [placeDetail, setPlaceDetail] = useState();
  const [fireSelected, setFireSelected] = useState();
  const [firebaseData, setFirebaseData] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [ownerData, setOwnerData] = useState();
  const [loading, setLoading] = useState(false);
  const [cardAnimValue, setCardAnimValue] = useState(new Animated.Value(0));
  const {key} = route.params;

  const {location} = useContext(AuthContext);
  const {lat, lng} = location;

  useEffect(() => {
    console.log('key', key);
    getFData();
    let url =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
      lat +
      ',' +
      lng +
      '&radius=5000&keyword=' +
      key +
      '&key=AIzaSyCiXRGvZ23QernKQP4lnzH-8mdj2Zdb2fs';
    setURL(url);

    fetchUrl(url, null);
  }, []);

  const fetchUrl = (url, pt) => {
    setLoading(true);
    let finalUrl = pt ? url + '&pagetoken=' + pt : url;
    fetch(finalUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        if (data.next_page_token) {
          // setTimeout(() => {
          //   fetchUrl(url, data.next_page_token);
          // }, 2000);
          setMarker(data.next_page_token);
        }
      });
  };

  const setData = (data) => {
    let ll = [];
    data.results.map(async (m) => {
      const {lat, lng} = m.geometry.location;
      let obj = {
        latitude: lat,
        longitude: lng,
        Title: m.name,
        rating: m.rating,
        noOfRatings: m.user_ratings_total,
        Address: m.vicinity,
        id: m.place_id,
      };
      if (m.photos) {
        let photoUrl =
          'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' +
          m.photos[0].photo_reference +
          '&key=AIzaSyCiXRGvZ23QernKQP4lnzH-8mdj2Zdb2fs';
        // console.log(photoUrl);
        obj.photo = photoUrl;
      }

      ll.push(obj);
    });
    let full = places.concat(ll);

    setPlaces(full);
    setLoading(false);
  };

  const getFData = async () => {
    // await Geolocation.getCurrentPosition(async (position) => {
    //   setInitialRegion({
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude,
    //     latitudeDelta: 0.1,
    //     longitudeDelta: 0.1,
    //   });
    setLoading(true);
    await Upload.getFirebaseData(
      key == 'pg' ? 'PG' : 'Mess',
      lat,
      lng,
      5000,
    ).then((data) => {
      setFirebaseData(data);
      // setLoading(false);
    });
  };

  const getPlaceDetails = (placeId) => {
    let url =
      'https://maps.googleapis.com/maps/api/place/details/json?fields=website,formatted_phone_number,photo,price_level&key=AIzaSyCiXRGvZ23QernKQP4lnzH-8mdj2Zdb2fs&place_id=' +
      placeId;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let photoUrls = [];
        if (data.result.photos) {
          for (const i in data.result.photos) {
            if (i == 10) {
              break;
            }
            let Url =
              'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' +
              data.result.photos[i].photo_reference +
              '&key=AIzaSyCiXRGvZ23QernKQP4lnzH-8mdj2Zdb2fs';
            photoUrls.push(Url);
          }
        }
        let detail = {
          phone: data.result.formatted_phone_number
            ? data.result.formatted_phone_number
            : null,
          website: data.result.website ? data.result.website : null,
          Photos: photoUrls,
        };

        setPlaceDetail(detail);
      });
  };

  const getOwnerDetail = (index) => {
    firestore()
      .collection('Users')
      .doc(firebaseData[index]['userId'])
      .get()
      .then((data) => {
        setOwnerData({
          phone: data.data().Phone,
          name: data.data().Name,
        });
      });
  };

  const AnimateCard = () => {
    Animated.timing(cardAnimValue, {
      toValue: 1,
      useNativeDriver: false,
      easing: Easing.linear,
      duration: 300,
    }).start();
  };

  const DeAnimateCard = () => {
    Animated.timing(cardAnimValue, {
      toValue: 0,
      useNativeDriver: false,
      easing: Easing.linear,
      duration: 200,
    }).start(() => {
      setShowCard(false);
    });
  };

  return (
    <>
      <View style={styles.container}>
        {showCard && (
          <TouchableNativeFeedback
            onPress={() => {
              let obj;
              if (selected) {
                let googlePlace = places[selected];
                obj = {
                  rating: googlePlace['rating'],
                  noOfRatings: googlePlace['noOfRatings'],
                  Address: googlePlace['Address'],
                  Title: googlePlace['Title'],
                  About: null,
                  url:
                    'https://www.google.com/maps/dir/?api=1&destination=destination&destination_place_id=' +
                    googlePlace['id'],
                  ...placeDetail,
                };
                console.log(obj);
              }
              navigation.navigate('CardDetail', {
                item: selected
                  ? obj
                  : {
                      ...firebaseData[fireSelected],
                      phone: ownerData['phone'],
                    },
                id: '0',
              });
            }}
            style={{borderRadius: 15}}>
            <Animated.View
              style={[
                styles.popup,
                {
                  opacity: cardAnimValue,
                  bottom: cardAnimValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 10],
                  }),
                },
              ]}>
              <Icon
                name="ios-close"
                style={styles.popupClose}
                onPress={() => DeAnimateCard()}
              />
              <View style={{flexDirection: 'row'}}>
                <SharedElement id="CardImage0">
                  <Image
                    progressiveRenderingEnabled={true}
                    source={{
                      uri:
                        selected != null
                          ? places[selected]['photo']
                          : firebaseData[fireSelected]['Photos'][0],
                    }}
                    resizeMode="cover"
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 5,
                      marginHorizontal: 10,
                    }}
                  />
                </SharedElement>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    paddingRight: 25,
                  }}>
                  <SharedElement id="CardTitle0">
                    <Text
                      numberOfLines={2}
                      style={{fontSize: 14, fontWeight: '700'}}>
                      {selected != null
                        ? places[selected]['Title']
                        : firebaseData[fireSelected]['Title']}
                    </Text>
                  </SharedElement>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 3,
                      alignItems: 'center',
                    }}>
                    <Rating
                      imageSize={12}
                      startingValue={
                        selected != null
                          ? places[selected]['rating']
                          : firebaseData[fireSelected]['rating']
                      }
                      readonly
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        marginLeft: 3,
                        color: Colors.grey,
                      }}>
                      (
                      {selected != null
                        ? places[selected]['noOfRatings']
                        : firebaseData[fireSelected]['noOfRatings'] + ')'}
                      )
                    </Text>
                  </View>
                  <TouchableWithoutFeedback>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 6,
                      }}>
                      <MaterialCommunityIcons
                        name="directions"
                        style={{
                          fontSize: 12,
                          margin: 3,
                          color: Colors.primary,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: Colors.primary,
                          fontWeight: '700',
                        }}>
                        Directons
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </Animated.View>
          </TouchableNativeFeedback>
        )}
        {/* {places.length > 0 && (
          <SlidingUpPanel
            key={'panel2'}
            ref={panel}
            draggableRange={{
              top: Dimensions.get('window').height - 80,
              bottom: 0,
            }}>
            <LocationDetailModal
              style={{marginBottom: 50}}
              title={
                selected
                  ? places[selected]['Title']
                  : firebaseData[fireSelected]['Title']
              }
              rating={
                selected
                  ? places[selected]['rating']
                  : firebaseData[fireSelected]['rating']
              }
              noOfRatings={
                selected
                  ? places[selected]['noOfRatings']
                  : firebaseData[fireSelected]['noOfRatings']
              }
              placeDetail={selected ? placeDetail : ownerData}
              address={
                selected
                  ? places[selected]['Address']
                  : firebaseData[fireSelected]['Address']
              }
              directionUrl={
                selected
                  ? 'https://www.google.com/maps/dir/?api=1&destination=destination&destination_place_id=' +
                    places[selected]['id']
                  : 'https://www.google.com/maps/dir/?api=1&destination=' +
                    firebaseData[fireSelected][
                      'Location'
                    ]._latitude.toString() +
                    ',' +
                    firebaseData[fireSelected]['Location']._longitude.toString()
              }
            />
          </SlidingUpPanel>
        )} */}
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          followsUserLocation
          initialRegion={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsUserLocation>
          {places &&
            places.map((coordinate, index) => {
              return (
                <Marker
                  coordinate={{
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                  }}
                  key={index.toString()}
                  onPress={() => {
                    setFireSelected(null);
                    getPlaceDetails(places[index]['id']);
                    setSelected(index);
                    setShowCard(true);
                    AnimateCard();
                  }}
                  title={coordinate.Title}></Marker>
              );
            })}
          {firebaseData &&
            firebaseData.map((data, index) => {
              return (
                <Marker
                  key={index.toString()}
                  coordinate={{
                    latitude: data.Location._latitude,
                    longitude: data.Location._longitude,
                  }}
                  title={data.Title}
                  onPress={() => {
                    // setSelected(index);
                    // getPlaceDetails(places[index]['id']);
                    // panel2.current.show(500);
                    setSelected(null);
                    setFireSelected(index);
                    getOwnerDetail(index);
                    setShowCard(true);
                    AnimateCard();
                    // panel.current.show(300);
                  }}
                />
              );
            })}
        </MapView>
        {/* <AppButton
        title="Logout"
        onPress={() => {
          childRef.current.show();
          // fetchUrl(URL, marker);
        }}
      /> */}
      </View>
      <Loading visible={loading} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    // justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: -100,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  popup: {
    height: 120,
    width: '90%',
    position: 'absolute',

    backgroundColor: Colors.white,
    borderRadius: 10,
    elevation: 5,
    flex: 1,
    justifyContent: 'center',
  },
  popupClose: {
    position: 'absolute',
    top: 10,
    right: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.white,
    fontSize: 16,
    height: 20,
    width: 20,
    backgroundColor: Colors.primary,
    borderRadius: 12,
  },
});

export default MapScreen;
