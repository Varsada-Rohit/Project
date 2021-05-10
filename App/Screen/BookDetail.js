import {useNavigation} from '@react-navigation/core';
import {Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  ScrollView,
  Linking,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Carousel from 'react-native-snap-carousel';
import AppButton from '../Components/AppButton';
import Colors from '../Config/Colors';
import useAuth from '../Auth/useAuth';

function BookDetail({route, navigation}) {
  const nav = useNavigation();
  const {book, bg, ownerData} = route.params;
  const {user} = useAuth();
  const [sellerData, setSellerData] = useState(ownerData ? ownerData : ' ');

  useEffect(() => {
    nav.setOptions({
      headerStyle: {backgroundColor: bg, elevation: 0},
    });
    if (!ownerData) {
      firestore()
        .collection('Users')
        .doc(book.userId)
        .get()
        .then((data) => {
          setSellerData(data.data());
        });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.upper, {backgroundColor: bg}]}>
        <View
          style={{
            height: '60%',
            elevation: 5,
            shadowColor: 'black',
            shadowOffset: {height: 10, width: 20},
            shadowOpacity: 1,
            shadowRadius: 20,
            backgroundColor: 'transparent',
            borderRadius: 2,
            overflow: 'hidden',
          }}>
          <Carousel
            data={book.Photos}
            loop
            renderItem={({item, index}) => (
              <Image
                source={{uri: item}}
                style={{width: '100%', height: '100%'}}
              />
            )}
            sliderWidth={Dimensions.get('screen').width * 0.4}
            itemWidth={Dimensions.get('screen').width * 0.4}
            // sliderHeigh={Dimensions.get('screen').height * 0.75}
            // itemHeight={Dimensions.get('screen').height * 0.}
            style={{elevation: 5}}
            autoplay
          />
        </View>
        <View style={{marginVertical: 10, alignItems: 'center'}}>
          <Text style={styles.title}>Title of book</Text>
          <Text style={styles.price}>{'\u20B9'} 300</Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.item}>
            <Text style={styles.value}>{book.Field}</Text>
            <Text style={styles.placeholder}>Field</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.value}>{book.Branch}</Text>
            <Text style={styles.placeholder}>Branch</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.value}>{book.sem}</Text>
            <Text style={styles.placeholder}>Sem</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.lower}>
        <View style={{marginBottom: 20}}>
          <Text style={[styles.title, {marginBottom: 10}]}>Description</Text>
          <Text>{book.Description}</Text>
          <Text style={[styles.title, {marginBottom: 10, marginTop: 20}]}>
            Seller
          </Text>
          <Text>Name : {sellerData.Name}</Text>
          <Text>email : {book.userId}</Text>
          <Text>Phone : {sellerData.Phone}</Text>
        </View>
      </ScrollView>

      <View
        style={{
          marginHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {user.email !== book.userId && (
          <AppButton
            title="Chat"
            icon="chat-outline"
            onPress={() => {
              navigation.navigate('Chat', {ownerId: book.userId});
            }}
            style={{
              backgroundColor: Colors.lightSecondary,
              borderWidth: 1,
              width: '80%',
              // margin: 0,
              paddingVertical: 5,
              marginVertical: 5,
              borderColor: Colors.primary,
            }}
            color={Colors.primary}
          />
        )}
        <Icon
          name="ios-call"
          onPress={() => {
            Linking.openURL(`tel:${sellerData.Phone}`);
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            textAlign: 'center',
            color: 'green',
            marginHorizontal: '3%',
            textAlignVertical: 'center',
            backgroundColor: Colors.lightPrimary,
            // borderRadius: '7%',
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  upper: {
    alignItems: 'center',
    height: '60%',
    backgroundColor: Colors.primary,
  },
  detailContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 10,
  },
  item: {
    textAlign: 'center',
    alignItems: 'center',
  },
  value: {
    fontWeight: '700',
    fontSize: 18,
  },
  placeholder: {
    color: 'grey',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  lower: {
    padding: 10,
    paddingLeft: 20,
    height: '30%',
    margin: 10,
    borderColor: 'grey',
    borderLeftWidth: 2,
    // marginBottom: 0,

    // flexGrow: 1,
    // overflow: 'scroll',
  },
});

export default BookDetail;
