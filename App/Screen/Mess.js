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
import {Body, Button, Header, Icon, Left, Right, Title} from 'native-base';
import AppFab from '../Components/AppFab';
import Colors from '../Config/Colors';
import AuthContext from '../Auth/Context';

function Mess({navigation}) {
  const [messes, setMesses] = useState();
  const {location} = useContext(AuthContext);
  const {lat, lng} = location;
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

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
          <Button transparent>
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
    // nav.setOptions({
    //   headerRight: () => (
    //     <View
    //       style={{
    //         flexDirection: 'row',
    //         alignItems: 'center',
    //         marginHorizontal: 10,
    //       }}>
    //       <TouchableNativeFeedback onPress={() => onShowMap()}>
    //         <MaterialCommunityIcons
    //           style={{
    //             color: Colors.primary,
    //             fontSize: 28,
    //             marginHorizontal: 10,
    //           }}
    //           name="map-marker-radius"
    //         />
    //       </TouchableNativeFeedback>
    //       <TouchableNativeFeedback onPress={() => onShowChats()}>
    //         <Icon style={{color: Colors.primary}} name="ios-chatbubbles"></Icon>
    //       </TouchableNativeFeedback>
    //     </View>
    //   ),
    // }),
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
    await Upload.getFirebaseData('Mess', latitude, longitude, 5000).then(
      (data) => {
        setMesses(data);
      },
    );
    setLoading(false);
  };

  return (
    <>
      <MyHeader />
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
                  title={item.title}
                  rent={item.rate}
                  id={index.toString()}
                  photo={item['photos'][0]}
                  rating={item.rating}
                  //   additionF={item.AdditionFacilities}
                  coordinate={item.Location}
                />
              </View>
            </TouchableNativeFeedback>
          )}
          data={messes}
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
