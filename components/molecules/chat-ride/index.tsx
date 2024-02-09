import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

import {StyledCol, StyledSafeAreaView} from '../../../styles/container';
import {styledText} from '../../../styles/text';

import HomeHeader from '../../atoms/home-header';

import {
  Avatar,
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Message,
  Send,
} from 'react-native-gifted-chat';

import firestore from '@react-native-firebase/firestore';

function ChatRide({navigation, userUID, driverUID, bookingUID}: any) {
  const sans = styledText();

  console.log('userUID', userUID);
  console.log('driverUID', driverUID);
  console.log('bookingUID', bookingUID);

  // @ts-ignore
  const renderMessage = props => {
    return (
      <Message
        {...props}
        showUserAvatar={true}
        containerStyle={{backgroundColor: 'red'}}
      />
    );
  };

  // @ts-ignore
  const renderAvatar = props => {
    return (
      <Avatar
        {...props}
        showAvatarForEveryMessage={false}
        imageStyle={{
          right: {
            width: 0,
            height: 0,
          },
          left: {
            borderWidth: 1,
            borderColor: '#fff',
            width: 35,
            height: 35,
          },
        }}
      />
    );
  };

  // @ts-ignore
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: '#000',
          },
          right: {
            color: '#fff',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#fff',
          },
          right: {
            backgroundColor: '#1FBF83',
          },
        }}
      />
    );
  };

  // @ts-ignore
  const renderSend = props => {
    return (
      <StyledCol style={{marginBottom: 7.5}}>
        <Send {...props} textStyle={[sans.bold, {color: '#1FBF83'}]} />
      </StyledCol>
    );
  };

  // @ts-ignore
  const renderComposer = props => {
    return (
      <Composer
        {...props}
        multiline={false}
        textInputProps={{
          marginTop: 10,
          marginBottom: 10,
          blurOnSubmit: true,
          paddingHorizontal: 15,
          paddingTop: 7.5,
          borderRadius: 50,
          backgroundColor: '#f3f3f3',
          width: '80%',
          height: 40,
        }}
        textInputStyle={[sans.bold, {paddingBottom: 2.5, color: '#878787'}]}
        placeholder={'Message'}
        placeholderTextColor={'#878787'}
      />
    );
  };

  // @ts-ignore
  const renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#042F40',
          borderTopWidth: 0,
        }}
      />
    );
  };

  const [messages, setMessages] = useState([]);

  const getAllMessages = async () => {
    const chatid = bookingUID + '-' + driverUID;
    const msgResponse = await firestore()
      .collection('Chats')
      .doc(chatid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get();
    const allTheMsgs = msgResponse.docs.map(docSanp => {
      return {
        ...docSanp.data(),
        createdAt: docSanp.data().createdAt.toDate(),
      };
    });
    setMessages(allTheMsgs);
  };

  useEffect(() => {
    // getAllMessages();
  }, []);

  const onSend = async msgArray => {
    const msg = msgArray[0];
    const usermsg = {
      ...msg,
      sentBy: 1,
      sentTo: driverUID,
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, usermsg),
    );
    const chatid = bookingUID + '-' + driverUID;
    console.log(chatid);
  };

  return (
    <StyledSafeAreaView
      style={{
        justifyContent: 'flex-start',
        backgroundColor: '#042F40',
      }}>
      <HomeHeader
        navigation={navigation}
        title={'Ride Chat'}
        main={true}
        fromProfile={false}
      />
      <GiftedChat
        messages={messages}
        onSend={text => onSend(text)}
        user={{
          _id: userUID,
        }}
        renderSend={renderSend}
        renderAvatar={renderAvatar}
        renderBubble={renderBubble}
        renderMessage={renderMessage}
        renderComposer={renderComposer}
        renderInputToolbar={renderInputToolbar}
        messagesContainerStyle={{
          width: Dimensions.get('window').width,
          height: '95.75%',
          paddingBottom: 10,
          backgroundColor: '#f3f3f3',
        }}
        keyboardShouldPersistTaps="never"
        inverted
        scrollToBottom
        infiniteScroll
        alwaysShowSend
      />
    </StyledSafeAreaView>
  );
}

export default ChatRide;
