import {Button, Fab, Icon} from 'native-base';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

function AppFab({navigation}) {
  const [showFab, setShowFab] = useState(false);

  return (
    <View style={{flex: 1}}>
      <Fab
        active={showFab}
        direction="up"
        containerStyle={{}}
        style={{backgroundColor: '#5067FF'}}
        position="bottomRight"
        onPress={() => setShowFab(!showFab)}>
        <Icon name="add" />
        <Button
          style={{backgroundColor: '#34A34F'}}
          onPress={() => navigation.navigate('Add', {screen: 'AddPG'})}>
          <Icon name="home-outline" />
        </Button>
        <Button
          style={{backgroundColor: '#3B5998'}}
          onPress={() => navigation.navigate('Add', {screen: 'AddMess'})}>
          <Icon name="restaurant-outline" />
        </Button>
        <Button
          style={{backgroundColor: '#DD5144'}}
          onPress={() => navigation.navigate('Add', {screen: 'AddBook'})}>
          <Icon name="book-outline" />
        </Button>
      </Fab>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppFab;
