import {Body, Left, ListItem, Right, Text, Thumbnail} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

function ChatCard({chat, navigation}) {
  return (
    <ListItem
      avatar
      onPress={() =>
        navigation.navigate('Chat', {id: chat.id, user2: chat.user})
      }>
      <Left>
        <Thumbnail
          source={{
            uri:
              'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg',
          }}
        />
      </Left>
      <Body>
        <Text>{chat.user}</Text>
        <Text note>{chat.msg}</Text>
      </Body>
      <Right>
        <Text note>{chat.time}</Text>
      </Right>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ChatCard;
