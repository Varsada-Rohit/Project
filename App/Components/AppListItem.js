import React from 'react';
import {View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {Body, Button, Icon, Left, ListItem, Right, Text} from 'native-base';
import Colors from '../Config/Colors';

function AppListItem({total, onPress, icon, text}) {
  return (
    <View style={styles.container}>
      <ListItem icon onPress={onPress}>
        <Left>
          <Icon name={icon} style={{color: Colors.primary}} />
        </Left>
        <Body>
          <Text>{text}</Text>
        </Body>
        <Right>
          <Text>{total}</Text>
          <Icon name="ios-chevron-forward" />
        </Right>
      </ListItem>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppListItem;
