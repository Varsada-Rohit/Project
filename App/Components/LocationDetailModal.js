import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

const LocationDetailModal = () => {
  return (
    <View style={styles.container}>
      <SlidingUpPanel
        draggableRange={{
          top: Dimensions.get('window').height,
          bottom: 0,
        }}>
        <View
          style={{
            zIndex: 10,
            flex: 1,
            backgroundColor: 'red',
            borderTopRightRadius: 10,
            overflow: 'hidden',

            borderTopLeftRadius: 10,
            // justifyContent: 'center',
          }}>
          {/* {placeDetail && (
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
          )} */}
          <View style={{padding: 10, flex: 1}}>
            <Text style={{fontSize: 18}}>Title</Text>
            {/* <AppButton title="Rohti" /> */}
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            </View> */}
            {/* <View style={{marginVertical: 10}}>
              <PanelList text={places[selected]['address']} icon="map-marker" />
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
            /> */}
          </View>
          {/* <Button title="Hide" onPress={() => panel.current.hide()} /> */}
        </View>
      </SlidingUpPanel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default LocationDetailModal;
