import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableNativeFeedback,
  SectionList,
} from 'react-native';

import AppCard from '../Components/AppCard';
import Upload from '../Backend/Upload';
// import { useNavigation } from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';
import Loading from '../Components/Loading';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Icon} from 'native-base';
import AppFab from '../Components/AppFab';
import Colors from '../Config/Colors';
import AuthContext from '../Auth/Context';

function ListingScreen({navigation}) {
  const [places, setPlaces] = useState([]);
  const [googlePlaces, setGooglePlaces] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const {location} = useContext(AuthContext);
  const {lat, lng} = location;

  const nav = useNavigation();

  useEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <TouchableNativeFeedback onPress={() => onShowMap()}>
            <MaterialCommunityIcons
              style={{
                color: Colors.primary,
                fontSize: 24,
                marginHorizontal: 10,
              }}
              name="map-marker-radius"
            />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => onShowChats()}>
            <Icon
              style={{
                color: Colors.primary,
                fontSize: 24,
                marginHorizontal: 10,
              }}
              name="ios-chatbubbles"></Icon>
          </TouchableNativeFeedback>
        </View>
      ),
    }),
      getData(lat, lng);
    GetGoogleData();
  }, []);

  const onShowMap = () => {
    navigation.navigate('MapScreen', {key: 'pg'});
  };

  const onShowChats = () => {
    navigation.navigate('AllChats');
  };

  const GetGoogleData = async () => {
    setLoading(true);
    let url =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
      lat +
      ',' +
      lng +
      '&radius=5000&keyword=' +
      'pg' +
      '&key=AIzaSyCiXRGvZ23QernKQP4lnzH-8mdj2Zdb2fs';
    const data = await Upload.fetchGoogleData(url);
    setData(data);
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
        obj.Photo = photoUrl;
      }

      ll.push(obj);
    });
    let full = [...googlePlaces].concat(ll);

    setGooglePlaces(full);
    setLoading(false);
  };

  const onReload = async () => {
    setRefreshing(true);
    await getData(lat, lng);
    setRefreshing(false);
  };

  const getData = async (latitude, longitude) => {
    setLoading(true);
    await Upload.getFirebaseData('PG', latitude, longitude, 5000).then(
      (data) => {
        setPlaces(data);
      },
    );
    setLoading(false);
  };

  return (
    <>
      <View style={styles.container}>
        <SectionList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => onReload()} />
          }
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            let card1 = (item, index) => {
              console.log('forBoys', item.ForBoys);
              return (
                <TouchableNativeFeedback
                  onPress={() =>
                    navigation.navigate('CardDetail', {
                      item: item,
                      id: index.toString(),
                    })
                  }>
                  <View>
                    <AppCard
                      title={item.Title}
                      rent={item.Rent}
                      id={index.toString()}
                      photo={item['Photos'][0]}
                      rating={item.rating}
                      additionF={item.AdditionFacilities}
                      coordinate={item.Location}
                    />
                  </View>
                </TouchableNativeFeedback>
              );
            };
            let card2 = (item, index) => {
              return (
                <TouchableNativeFeedback
                  onPress={async () => {
                    const detail = await Upload.getPlaceDetails(item.id);
                    let obj = {
                      About: null,
                      url:
                        'https://www.google.com/maps/dir/?api=1&destination=destination&destination_place_id=' +
                        item['id'],
                      ...item,
                      ...detail,
                    };

                    navigation.navigate('CardDetail', {
                      item: obj,
                      id: item.id,
                    });
                  }}>
                  <View>
                    <AppCard
                      title={item.Title}
                      // rent={item.Rent}
                      id={item.id}
                      photo={item['Photo']}
                      rating={item.rating}
                      // additionF={item.AdditionFacilities}
                      coordinate={item.Location}
                    />
                  </View>
                </TouchableNativeFeedback>
              );
            };
            let card;
            if (places.includes(item)) {
              card = card1;
            } else {
              card = card2;
            }
            return card(item, index);
          }}
          sections={[
            {title: 'ourData', data: places},
            {title: 'Google Data', data: googlePlaces},
          ]}
          keyExtractor={(item, index) => index.toString()}
        />
        <AppFab navigation={navigation} />
      </View>
      <Loading visible={loading && !refreshing} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 15,
    backgroundColor: Colors.secondary,
  },
});

export default ListingScreen;
