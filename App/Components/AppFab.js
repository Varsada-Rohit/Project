import {Button, Fab, Icon} from 'native-base';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

function AppFab() {
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
        <Button style={{backgroundColor: '#34A34F'}}>
          <Icon name="home-outline" />
        </Button>
        <Button style={{backgroundColor: '#3B5998'}}>
          <Icon name="restaurant-outline" />
        </Button>
        <Button disabled style={{backgroundColor: '#DD5144'}}>
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
