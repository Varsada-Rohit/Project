import {Button, Fab, Icon} from 'native-base';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

function AppFab() {
  const [showFab, setShowFab] = useState(true);

  return (
    <View style={{flex: 1}}>
      {/* <Fab
        active={true}
        direction="up"
        containerStyle={{}}
        style={{backgroundColor: '#5067FF'}}
        position="bottomRight"
        // onPress={() => this.setState({active: !this.state.active})}>
        <Icon name="share" />
        <Button style={{backgroundColor: '#34A34F'}}>
          <Icon name="logo-whatsapp" />
        </Button>
        <Button style={{backgroundColor: '#3B5998'}}>
          <Icon name="logo-facebook" />
        </Button>
        <Button disabled style={{backgroundColor: '#DD5144'}}>
          <Icon name="mail" />
        </Button>
      </Fab> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppFab;
