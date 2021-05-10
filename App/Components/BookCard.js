import {CardItem, Left, Text} from 'native-base';
import React from 'react';
import {View, StyleSheet, Image, TouchableNativeFeedback} from 'react-native';
import Colors from '../Config/Colors';

function BookCard({book, backgroundColor, onPress}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.photoCover}>
          <View
            style={[
              styles.photoFrame,
              {backgroundColor: backgroundColor},
            ]}></View>
          <View style={styles.photo}>
            <Image
              source={{
                uri: book.Photos[0],
              }}
              //   width={'80%'}
              style={{width: '100%', height: '100%'}}
              //   style={styles.photo}
            />
          </View>
        </View>

        <View
          style={{
            borderWidth: 0.5,
            borderRadius: 10,
            borderTopWidth: 0,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            borderColor: '#c6c6c6',
            top: -5,
            paddingHorizontal: 10,
            paddingBottom: 5,
            backgroundColor: 'white',
          }}>
          <Text style={styles.title}>{book.Title}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.leftBlock}>{book.Field}</Text>
            <Text style={{width: '50%', textAlign: 'right'}}>
              {'\u20B9'} {book.Price}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.leftBlock}>{book.Branch}</Text>
            <Text style={styles.rightBlock}>Sem : {book.sem}</Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
  },
  photoCover: {
    position: 'relative',
    height: 200,
    zIndex: 1,
  },

  photoFrame: {
    elevation: 5,
    height: 170,

    borderRadius: 10,
    top: 30,
    zIndex: 1,
  },
  photo: {
    position: 'absolute',
    width: '70%',
    height: '90%',
    borderRadius: 10,
    marginHorizontal: '15%',

    overflow: 'hidden',
    // shadowOffset: {width: 10, height: 10},
    // shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 5,
    backgroundColor: '#000000',
    zIndex: 999999999,
  },
  title: {
    marginTop: 5,
    textAlign: 'center',
    fontWeight: '700',
  },
  rightBlock: {
    color: Colors.grey,
    width: '50%',
    textAlign: 'right',
    fontSize: 14,
  },
  leftBlock: {
    fontSize: 14,
    color: Colors.grey,
    width: '50%',
  },
});

export default BookCard;
