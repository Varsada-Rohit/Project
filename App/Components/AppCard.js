import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Card, CardItem, Text, Left, Right} from 'native-base';
import {Rating} from 'react-native-ratings';
import {SharedElement} from 'react-navigation-shared-element';

const AppCard = ({title, rent, photo, rating, additionF, coordinate, id}) => {
  const [facilities, setfacilities] = useState();
  useEffect(() => {
    let f = [];
    Object.keys(additionF).map((obj) => {
      if (additionF[obj]) {
        f.push(obj);
      }
    });
    if (f.length > 3) {
      setfacilities(
        f.slice(0, 3).join(' | ') + ' | +' + (f.length - 3).toString(),
      );
    } else {
      setfacilities(f.join(' | '));
    }
  }, []);

  return (
    <Card style={styles.card}>
      <CardItem cardBody>
        <SharedElement
          id={'CardImage' + id}
          style={{height: 200, width: null, flex: 1}}>
          <Image
            progressiveRenderingEnabled
            source={{
              uri: photo,
            }}
            style={{height: 200, width: null, flex: 1}}
          />
        </SharedElement>
      </CardItem>
      <CardItem>
        <Left>
          <SharedElement id={'CardTitle' + id}>
            <Text numberOfLines={1}>{title}</Text>
          </SharedElement>
        </Left>
        <Right>
          <SharedElement id={'CardRating' + id}>
            <Rating
              imageSize={15}
              type="custom"
              ratingColor="black"
              style={{color: 'black'}}
              tintColor="white"
              startingValue={rating}
              ratingBackgroundColor="#DCDCDC"
              readonly
            />
          </SharedElement>
        </Right>
      </CardItem>
      <CardItem style={{paddingTop: 0}}>
        <Left>
          <Text note>{facilities}</Text>
        </Left>
        <Right>
          <Text>&#8377;{rent}</Text>
        </Right>
      </CardItem>
    </Card>
  );
};

export default AppCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f2ed',
    padding: 15,
  },
  icon: {
    fontSize: 15,
  },
  card: {
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 5,
    width: '95%',
    alignSelf: 'center',
  },
});

{
  /* <CardItem footer bordered>
        <Left>
          <Button dark height={25} onPress={() => console.log('yy')}>
            <Text uppercase={false}>More Detail</Text>
          </Button>
        </Left>
        <Right>
          <Text style={{transform: [{rotate: '45deg'}]}}>
            <MaterialCommunityIcons
              name="navigation"
              size={25}
              onPress={() => {
                Linking.openURL(
                  'https://www.google.com/maps/dir/?api=1&destination=' +
                    coordinate._latitude.toString() +
                    ',' +
                    coordinate._longitude.toString(),
                );
              }}
            />
          </Text>
        </Right>
      </CardItem> */
}
