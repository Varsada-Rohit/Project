import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';

import BookCard from '../Components/BookCard';

function UserBookList({route}) {
  const {books} = route.params;

  function getRandomColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <View style={{width: '50%'}} key={index.toString()}>
              <BookCard
                book={item}
                backgroundColor={getRandomColor()}
                onPress={() =>
                  navigation.navigate('BookDetail', {book: item, bg})
                }
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default UserBookList;
