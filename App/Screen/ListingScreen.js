import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
  TouchableNativeFeedback,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import AppCard from '../Components/AppCard';
import Upload from '../Backend/Upload';
import SelectLocation from '../Components/SelectLocation';
// import { useNavigation } from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';
import Loading from '../Components/Loading';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Icon} from 'native-base';
import {HeaderTitle} from '@react-navigation/stack';
import AppFab from '../Components/AppFab';
import Colors from '../Config/Colors';

function ListingScreen({route, navigation}) {
  const [places, setPlaces] = useState();
  const {lat, lng} = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

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
            <View
              style={{
                backgroundColor: '#627ca8',
                padding: 5,
                margin: 10,
                borderRadius: 5,
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white'}}>show on map</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => onShowChats()}>
            <Icon style={{color: Colors.primary}} name="ios-chatbubbles"></Icon>
          </TouchableNativeFeedback>
        </View>
      ),
    }),
      getData(lat, lng);
  }, []);

  const onShowMap = () => {
    navigation.navigate('MapScreen', {lat, lng});
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
        <FlatList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => onReload()} />
          }
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
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
          )}
          data={places}
          keyExtractor={(item, index) => index.toString()}
        />
        <AppFab />
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
