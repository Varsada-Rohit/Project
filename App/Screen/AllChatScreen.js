import {Container, Content, List} from 'native-base';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import ChatCard from '../Components/ChatCard';
import Colors from '../Config/Colors';
import useAuth from '../Auth/useAuth';

function AllChatScreen({navigation}) {
  const {user} = useAuth();

  const [chats, setChats] = useState([]);

  useEffect(() => {
    getAllChats();
  }, []);

  const getAllChats = () => {
    let allChats = [];
    firestore()
      .collection('Chat')
      .where('members', 'array-contains', user.email)
      .get()
      .then((data) => {
        console.log('hhh', data.size);
        data.forEach(async (chatData) => {
          let members = chatData.data().members;

          let chatUser =
            members.indexOf(user.email) == 0 ? members[1] : members[0];
          let recentMessage = chatData.data().recentMessage;
          let date = new Date(recentMessage.sentAt.toDate());
          let current = new Date();
          let diff = current.getDate() - date.getDate();
          let time =
            diff == 0
              ? date
                  .toLocaleTimeString()
                  .match(/\d{2}:\d{2}|[AMP]+/g)
                  .join(' ')
              : diff == 1
              ? 'yesterday'
              : date.toLocaleDateString();
          let obj = {
            msg: recentMessage.msg,
            time: time,
            id: chatData.id,
            user2Id: chatUser,
          };

          allChats.push(obj);
        });
      })
      .then(async () => {
        const result = await Promise.all(
          allChats.map(async (all, index) => {
            await firestore()
              .collection('Users')
              .doc(all.user2Id)
              .get()
              .then((data) => {
                all.user = data.data().Name;
              });
            return all;
          }),
        );
        setChats(result);
      });
  };

  return (
    <View style={styles.container}>
      <Container>
        <Content>
          <List>
            {chats.map((chat, index) => {
              return (
                <ChatCard chat={chat} key={chat.id} navigation={navigation} />
              );
            })}
          </List>
        </Content>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default AllChatScreen;
