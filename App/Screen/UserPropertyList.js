import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
} from 'react-native';
import AppCard from '../Components/AppCard';

function UserPropertyList({route, navigation}) {
  const {properties} = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={properties}
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
                rent={item.Rent}
                id={index.toString()}
                photo={item['Photos'][0]}
                rating={item.rating}
                additionF={item.AdditionFacilities}
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

export default UserPropertyList;
