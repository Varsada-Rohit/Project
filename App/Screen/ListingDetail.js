import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Text, ScrollView} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import LocationDetailModal from '../Components/LocationDetailModal';

function ListingDetail({route, navigation}) {
  const {item, id} = route.params;

  const nav = useNavigation();

  useEffect(() => {
    // console.log('check', item);
  }, []);

  return (
    <LocationDetailModal
      ownerId={item.userId ? item.userId : null}
      style={{borderTopLeftRadius: 0, borderTopRightRadius: 0}}
      placeDetail={{
        photos: item.Photos,
        phone: item.phone ? item.phone : null,
        website: item.website ? item.website : null,
      }}
      navigation={navigation}
      rating={item.rating}
      noOfRatings={item.noOfRatings}
      id={id}
      address={item.Address}
      title={item.Title}
      about={item.About}
      forBoys={item.ForBoys ? item.ForBoys : null}
      additionalF={item.AdditionFacilities ? item.AdditionFacilities : null}
      directionUrl={
        item.url
          ? item.url
          : 'https://www.google.com/maps/dir/?api=1&destination=' +
            item['Location']._latitude.toString() +
            ',' +
            item['Location']._longitude.toString()
      }
    />
  );
  // <View style={styles.container}>
  {
    /* <SharedElement id={id} style={{height: 200, width: '100%'}}>
        <Image
          source={{
            uri: item.Photos[0],
          }}
          style={{height: 200, width: '100%', flex: 1}}
        />
      </SharedElement> */
  }
  // </View>
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 400,
  },
});

ListingDetail.sharedElements = (route, otherRoute, showing) => {
  //   console.log('yyyyyy', 'CardImage' + route.params.id);
  let id = route.params.id;
  return [
    {id: 'CardImage' + id},
    {id: 'CardTitle' + id, animation: 'fade'},
    {id: 'CardRating' + id},
  ];
};
export default ListingDetail;
