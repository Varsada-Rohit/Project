import {useNavigation} from '@react-navigation/core';
import {H2, H3, Icon} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableNativeFeedback,
  ScrollView,
  RefreshControl,
} from 'react-native';
import useAuth from '../Auth/useAuth';
import Upload from '../Backend/Upload';
import AppCard from '../Components/AppCard';
import AppFab from '../Components/APPFab';
import AppListItem from '../Components/AppListItem';
import Colors from '../Config/Colors';

function Profile({navigation}) {
  const nav = useNavigation();
  const {user, removeToken} = useAuth();

  const [properties, setProperties] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    nav.setOptions({
      headerTitle: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="ios-person"
            style={{color: Colors.primary, fontSize: 25}}
          />
          <Text
            style={{
              color: Colors.primary,
              fontSize: 20,
              fontWeight: 'bold',
              marginHorizontal: 10,
            }}>
            {user.displayName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <Icon
          name="ios-exit-outline"
          style={{margin: 15}}
          onPress={() => removeToken()}
        />
      ),
    });
    getProperties();
    return () => {};
  }, []);

  const getProperties = async () => {
    setRefresh(true);
    const data = await Upload.getUserProperties(user.email);

    setProperties(data);
    setRefresh(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => getProperties()}
        />
      }>
      <View>
        <Text style={{fontWeight: '700', fontSize: 16, marginBottom: 10}}>
          Properties
        </Text>
        <AppListItem
          total={properties.length}
          onPress={() => navigation.navigate('Properties', {properties})}
        />
        {/* <FlatList
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
      /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.secondary,
    padding: 10,
  },
});

export default Profile;
