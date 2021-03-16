import React, {createRef, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  Button,
  Dimensions,
  Linking,
} from 'react-native';
import useAuth from '../Auth/useAuth';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import Geolocation from '@react-native-community/geolocation';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {Rating} from 'react-native-ratings';
import Swiper from 'react-native-swiper';
import firestore from '@react-native-firebase/firestore';
import {geohashQueryBounds, distanceBetween} from 'geofire-common';

import AppButton from '../Components/AppButton';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Colors from '../Config/Colors';
import Icon from '../Components/Icon';
import PanelList from '../Components/PanelList';
import LocationDetailModal from '../Components/LocationDetailModal';

function Profile() {
  const {removeToken} = useAuth();
  const [initialRegion, setInitialRegion] = useState();
  const [marker, setMarker] = useState();
  const [URL, setURL] = useState();
  const panel = useRef();

  const [places, setPlaces] = useState([]);
  const [selected, setSelected] = useState(1);
  const [placeDetail, setPlaceDetail] = useState();
  const [firebaseData, setFirebaseData] = useState([]);

  useEffect(() => {
    getCurrentLocation();
    let url =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=22.274971,70.778645&radius=5000&keyword=pg&key=AIzaSyCiXRGvZ23QernKQP4lnzH-8mdj2Zdb2fs';
    setURL(url);

    fetchUrl(url, null);
    // RNGooglePlaces.openAutocompleteModal()
    //   .then((place) => {
    //     console.log(place);
    //   })
    //   .catch((error) => console.log(error.message));
    // return () => {};
  }, []);

  const fetchUrl = (url, pt) => {
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
        title: m.name,
        icon: m.icon,
        rating: m.rating,
        noOfRating: m.user_ratings_total,
        address: m.vicinity,
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
  };

  const getCurrentLocation = async () => {
    await Geolocation.getCurrentPosition((position) => {
      // console.log(position.coords);
      setInitialRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
      getFirebaseData(
        position.coords.latitude,
        position.coords.longitude,
        5000,
      );
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
          photos: photoUrls,
        };

        setPlaceDetail(detail);
      });
  };

  const getFirebaseData = async (latitude, longitude, distance) => {
    const bounds = geohashQueryBounds([latitude, longitude], distance);
    let promises = [];
    for (const b of bounds) {
      const q = firestore()
        .collection('PG')
        .orderBy('geohash')
        .startAt(b[0])
        .endAt(b[1]);

      promises.push(q.get());
    }

    Promise.all(promises).then((snapshots) => {
      const matchingDocs = [];
      for (const snap of snapshots) {
        for (const doc of snap.docs) {
          const lat = doc.get('Location')._latitude;
          const lng = doc.get('Location')._longitude;

          const distanceInKm = distanceBetween(
            [lat, lng],
            [latitude, longitude],
          );
          const distanceInM = distanceInKm * 1000;
          if (distanceInM <= distance) {
            matchingDocs.push(doc);
          }
        }
      }
      // setFirebaseData(firebaseData.concat(matchingDocs));
      let data = [];
      matchingDocs.forEach((doc) => {
        data.push(doc.data());
      });
      setFirebaseData(data);
    });

    // let lat = 0.0144927536231884;
    // let lon = 0.0181818181818182;
    // let greaterLat = latitude + lat * distance;
    // let greaterLon = longitude + lon * distance;
    // const upper = await geohash.encode(greaterLat, greaterLon);
    // await firestore()
    //   .collection('PG')
    //   .where('geohash', '<', upper)
    //   .get()
    //   .then((data) => {
    //     data.forEach((place) => {
    //       console.log(place.data());
    //     });
    //   });
  };

  return (
    <View style={styles.container}>
      <LocationDetailModal />
      {places.length > 0 && (
        <SlidingUpPanel
          ref={panel}
          draggableRange={{
            top: Dimensions.get('window').height - 78,
            bottom: 0,
          }}>
          <View
            style={{
              zIndex: 2,
              flex: 1,
              backgroundColor: 'white',
              borderTopRightRadius: 10,
              overflow: 'hidden',

              borderTopLeftRadius: 10,
              // justifyContent: 'center',
            }}>
            {placeDetail && (
              <>
                {placeDetail['photos'].length != 0 && (
                  <View style={{height: 202}}>
                    <Swiper
                      autoplay
                      showsPagination
                      loadMinimal
                      loop={false}
                      loadMinimal
                      ize={1}>
                      {placeDetail['photos'].map((url, index) => {
                        return (
                          <View key={index.toString()} style={{height: 202}}>
                            <Image
                              source={{uri: url}}
                              resizeMode="cover"
                              style={{width: '100%', height: 202}}
                              // height={100}
                              width={100}
                            />
                          </View>
                        );
                      })}
                    </Swiper>
                  </View>
                )}
              </>
            )}
            <View style={{padding: 10, flex: 1}}>
              <Text style={{fontSize: 18}}>{places[selected]['title']}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: Colors.grey}}>
                  {places[selected]['rating']}
                </Text>
                <Rating
                  style={{alignSelf: 'flex-start', margin: 5}}
                  readonly
                  imageSize={15}
                  startingValue={places[selected]['rating']}
                />
                <Text style={{color: Colors.grey}}>
                  {'(' + places[selected]['noOfRating'] + ')'}
                </Text>
              </View>
              <View style={{marginVertical: 10}}>
                <PanelList
                  text={places[selected]['address']}
                  icon="map-marker"
                />
                {placeDetail && (
                  <>
                    <PanelList
                      light={placeDetail['phone'] ? false : true}
                      onPress={() => {
                        placeDetail['phone'] &&
                          Linking.openURL(`tel:${placeDetail['phone']}`);
                      }}
                      text={
                        placeDetail['phone']
                          ? placeDetail['phone']
                          : 'Not defined'
                      }
                      icon="phone"
                    />

                    <PanelList
                      light={placeDetail['website'] ? false : true}
                      onPress={() => {
                        placeDetail['website'] &&
                          Linking.openURL(placeDetail['website']);
                      }}
                      text={
                        placeDetail['website']
                          ? placeDetail['website']
                          : 'Not availabe'
                      }
                      icon="web"
                    />
                  </>
                )}
              </View>
              <AppButton
                style={{position: 'absolute', bottom: 50, left: 10}}
                title="Directons"
                color="white"
                backgroundColor={Colors.yellow}
                icon="directions"
                onPress={() => {
                  Linking.openURL(
                    'https://www.google.com/maps/dir/?api=1&destination=destination&destination_place_id=' +
                      places[selected]['id'],
                  );
                }}
              />
            </View>
          </View>
        </SlidingUpPanel>
      )}
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        followsUserLocation
        initialRegion={initialRegion}
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
                  setSelected(index);
                  getPlaceDetails(places[index]['id']);
                  panel.current.show(300);
                }}
                title={coordinate.title}></Marker>
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
                  childRef.current.show(500);
                  // console.log('ref', ref.current);
                }}
              />
            );
          })}
      </MapView>
      <AppButton
        title="Logout"
        onPress={() => {
          childRef.current.show();
          // fetchUrl(URL, marker);
        }}
      />
    </View>
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
});

export default Profile;
