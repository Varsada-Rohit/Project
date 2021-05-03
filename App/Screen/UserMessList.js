import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
} from 'react-native';
import AppCard from '../Components/AppCard';

function UserMessList({route, navigation}) {
  const {messes} = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={messes}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
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
                rent={item.rate}
                id={index.toString()}
                photo={item['Photos'][0]}
                rating={item.rating}
                coordinate={item.Location}
              />
            </View>
          </TouchableNativeFeedback>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default UserMessList;
