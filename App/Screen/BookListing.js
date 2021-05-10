import {Icon, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/core';

import BookCard from '../Components/BookCard';
import Colors from '../Config/Colors';
import Loading from '../Components/Loading';

function BookListing({navigation}) {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

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
          {/* <TouchableNativeFeedback onPress={() => onShowMap()}>
            <MaterialCommunityIcons
              style={{
                color: Colors.primary,
                fontSize: 26,
                marginHorizontal: 10,
              }}
              name="map-marker-radius"
            />
          </TouchableNativeFeedback> */}
          <TouchableNativeFeedback onPress={() => onShowChats()}>
            <Icon
              style={{
                color: Colors.primary,
                fontSize: 26,
                marginHorizontal: 10,
              }}
              name="ios-chatbubbles"></Icon>
          </TouchableNativeFeedback>
        </View>
      ),
    }),
      getBooks();
  }, []);

  function getRandomColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

  const getBooks = () => {
    setLoading(true);
    firestore()
      .collection('Book')
      .get()
      .then((data) => {
        let allBooks = [];
        data.forEach((book) => {
          allBooks.push(book.data());
        });
        setBooks(allBooks);
      });
    setLoading(false);
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={books}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            let bg = getRandomColor();
            return (
              <View style={{width: '50%'}} key={index.toString()}>
                <BookCard
                  book={item}
                  backgroundColor={bg}
                  onPress={() =>
                    navigation.navigate('BookDetail', {book: item, bg})
                  }
                />
              </View>
            );
          }}
        />
      </View>
      <Loading visible={loading} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flex: 1,
    flexDirection: 'row',
  },
});

export default BookListing;
