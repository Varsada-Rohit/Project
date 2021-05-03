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
import {Body, Button, Header, Icon, Left, Right, Title} from 'native-base';
import AppFab from '../Components/AppFab';
import Colors from '../Config/Colors';
import AuthContext from '../Auth/Context';

function Mess({navigation}) {
  const [messes, setMesses] = useState([]);
  const {location} = useContext(AuthContext);
  const {lat, lng} = location;
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleMesses, setGoogleMesses] = useState([]);

  const nav = useNavigation();

  const MyHeader = () => {
    return (
      <Header transparent color="red    ">
        <Left>
          <Button
            transparent
            onPress={() => navigation.navigate('SelectLocation')}>
            <Icon style={{color: Colors.primary}} name="ios-arrow-back"></Icon>
          </Button>
        </Left>
        <Body>
          <Title style={{color: Colors.primary, fontWeight: '700'}}>Mess</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => navigation.navigate('MapScreen', {key: 'tiffin'})}>
            <MaterialCommunityIcons
              style={{
                color: Colors.primary,
                fontSize: 25,
              }}
              name="map-marker-radius"
            />
          </Button>
          <Button transparent>
            <Icon style={{color: Colors.primary}} name="ios-chatbubbles"></Icon>
          </Button>
        </Right>
      </Header>
    );
  };

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

  const GetGoogleData = async () => {
    setLoading(true);
    let url =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
      lat +
      ',' +
      lng +
      '&radius=5000&keyword=' +
      'tiffin' +
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
    let full = [...googleMesses].concat(ll);

    setGoogleMesses(full);
    setLoading(false);
  };

  const onShowMap = () => {
    navigation.navigate('MapScreen', {key: 'pg'});
  };

  const onShowChats = () => {
    navigation.navigate('AllChats');
  };

  const onReload = async () => {
    setRefreshing(true);
    await getData(lat, lng);
    setRefreshing(false);
  };

  const getData = async (latitude, longitude) => {
    setLoading(true);
    await Upload.getFirebaseData('Mess', latitude, longitude, 5000).then(
      (data) => {
        setMesses(data);
      },
    );
    setLoading(false);
  };

  return (
    <>
      {/* <MyHeader /> */}
      <View style={styles.container}>
        <SectionList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => onReload()} />
          }
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            let card1 = (item, index) => {
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
                      rent={item.rate}
                      id={index.toString()}
                      photo={item['Photos'][0]}
                      rating={item.rating}
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
            if (messes.includes(item)) {
              card = card1;
            } else {
              card = card2;
            }
            return card(item, index);
          }}
          sections={[
            {title: 'ourData', data: messes},
            {title: 'Google Data', data: googleMesses},
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

export default Mess;
