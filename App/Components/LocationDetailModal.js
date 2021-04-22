import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  Linking,
  ScrollView,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import Swiper from 'react-native-swiper';
import {SharedElement} from 'react-navigation-shared-element';

import Colors from '../Config/Colors';
import AppButton from './AppButton';
import PanelList from './PanelList';

const LocationDetailModal = ({
  title,
  rating,
  noOfRatings,
  placeDetail,
  address,
  directionUrl,
  id,
  about,
  style,
}) => {
  return (
    <ScrollView
      contentContainerStyle={[
        {
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#eee9e0',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          overflow: 'hidden',
        },
        style,
      ]}>
      <View
        style={{
          zIndex: 10,
          flex: 1,

          // justifyContent: 'center',
        }}>
        <>
          {placeDetail && (
            <SharedElement id={id ? 'CardImage' + id : 'CardImage0'}>
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
            </SharedElement>
          )}
        </>

        <View style={{padding: 10}}>
          <SharedElement id={id ? 'CardTitle' + id : 'CardImage0'}>
            <Text
              style={{
                fontSize: 20,
                marginBottom: 5,
                fontWeight: '600',
                alignItems: 'baseline',
                width: null,
              }}>
              {title}
            </Text>
          </SharedElement>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: Colors.grey}}>{rating}</Text>
            <SharedElement id={id ? 'CardRating' + id : 'CardImage0'}>
              <Rating
                style={{alignSelf: 'flex-start', margin: 5}}
                readonly
                type="custom"
                tintColor="#eee9e0"
                ratingColor="black"
                // style={{color: 'black'}}
                imageSize={15}
                startingValue={rating}
                ratingBackgroundColor="#DCDCDC"
              />
            </SharedElement>
            <Text style={{color: Colors.grey}}>{'(' + noOfRatings + ')'}</Text>
          </View>
          <View style={{marginVertical: 10}}>
            <PanelList text={address} icon="map-marker" />
            {placeDetail && (
              <>
                <PanelList
                  light={placeDetail['phone'] ? false : true}
                  onPress={() => {
                    placeDetail['phone'] &&
                      Linking.openURL(`tel:${placeDetail['phone']}`);
                  }}
                  text={
                    placeDetail['phone'] ? placeDetail['phone'] : 'Not defined'
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
            {about && <PanelList text={about} icon="information-outline" />}
          </View>
        </View>
        {/* <Button title="Hide" onPress={() => panel.current.hide()} /> */}
      </View>
      <View style={{paddingHorizontal: 10}}>
        <AppButton
          style={{
            height: 40,
            borderColor: '#627ca8',
            borderWidth: 1,
          }}
          title="Directons"
          color="#627ca8"
          // backgroundColor={'#627ca8'}
          icon="directions"
          onPress={() => {
            Linking.openURL(directionUrl);
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default LocationDetailModal;
