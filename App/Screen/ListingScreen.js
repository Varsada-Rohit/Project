import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableNativeFeedback,
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
  const [places, setPlaces] = useState();
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
                fontSize: 28,
                marginHorizontal: 10,
              }}
              name="map-marker-radius"
            />
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
