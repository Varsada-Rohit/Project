import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {GiftedChat} from 'react-native-gifted-chat';

import useAuth from '../Auth/useAuth';
import {useNavigation} from '@react-navigation/core';
import {Icon, Text} from 'native-base';
import Colors from '../Config/Colors';

function ChatScreen({route}) {
  const {ownerId, id, user2} = route.params;
  const {user} = useAuth();
  const nav = useNavigation();

  const [chatId, setChatId] = useState(id ? id : 0);
  const [user2Name, setuser2Name] = useState(user2 ? user2 : '');
  const [messages, setMessages] = useState([
    // {
    //   _id: '6cc0e5bd-26af-4024-b12f-da23b4d9bfb1',
    //   createdAt: '2021-04-23T13:22:21.668Z',
    //   pending: true,
    //   text: 'Dcgg',
    //   user: {_id: 2, name: 'Rohit'},
    // },
  ]);

  useEffect(() => {
    nav.setOptions({
      headerTitle: () => (
        <Text
          style={{
            color: Colors.primary,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {user2Name}
        </Text>
      ),
    });
  }, [user2Name]);

  useEffect(() => {
    checkChatId();
  }, [ownerId]);

  useEffect(() => {
    if (!user2Name && ownerId) {
      firestore()
        .collection('Users')
        .doc(ownerId)
        .get()
        .then((data) => {
          setuser2Name(data.data().Name);
        });
    }
    if (chatId != 0) {
      console.log('Rohit');
      if (user2Name) {
        getMessages();
      }
    }
  }, [chatId, user2Name]);

  const checkChatId = () => {
    if (ownerId) {
      firestore()
        .collection('Chat')
        .where('members', 'in', [
          [user.email, ownerId],
          [ownerId, user.email],
        ])
        .get()
        .then((data) => {
          if (data.size > 0) {
            data.forEach((chat) => {
              console.log('yup');
              setChatId(chat.id);
            });
          }
        });
    }
  };

  const getMessages = () => {
    firestore()
      .collection('Chat')
      .doc(chatId)
      .collection('messages')
      .orderBy('sentAt', 'desc')
      .onSnapshot((data) => {
        let msgs = [];
        data.forEach((message) => {
          let obj = {
            _id: message.id,
            createdAt: message.data().sentAt
              ? message.data().sentAt.toDate()
              : firestore.Timestamp.now().toDate(),
            sent: true,
            text: message.data().msg,
            user: {_id: message.data().sentBy, name: user2Name},
          };

          msgs.push(obj);
        });
        setMessages(msgs);
      });
  };

  const createChatId = async () => {
    let members = [user.email, ownerId];
    let id = null;

    if (chatId === 0) {
      await firestore()
        .collection('Chat')
        .add({
          members: members,
          recentMessage: {
            msg: '',
            sentAt: '',
            sentBy: '',
          },
        })
        .then((data) => {
          setChatId(data.id);
          id = data.id;
        })
        .catch((error) => {
          console.log('Error creating chatid ', error);
        });
    }
    return id;
  };

  const storeMessage = async (msg, id) => {
    await firestore()
      .collection('Chat')
      .doc(id)
      .collection('messages')
      .add({
        msg: msg,
        sentAt: firestore.FieldValue.serverTimestamp(new Date()),
        sentBy: user.email,
      });

    await firestore()
      .collection('Chat')
      .doc(id)
      .update({
        recentMessage: {
          msg: msg,
          sentAt: firestore.FieldValue.serverTimestamp(),
          sentBy: user.email,
        },
      });
  };

  const onSend = useCallback(
    async (messages = []) => {
      console.log('ownerId', chatId);
      let msg = [...messages];
      msg[0].pending = true;

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, msg),
      );
      let id = await createChatId();

      if (id) {
        await storeMessage(msg[0].text, id);
      } else {
        await storeMessage(msg[0].text, chatId);
      }
    },
    [chatId],
  );

  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user.email,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ChatScreen;
