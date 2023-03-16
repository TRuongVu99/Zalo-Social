import Header from '@components/Header';
import {IHeaderEnum} from '@model/handelConfig';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const logo =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/640px-ChatGPT_logo.svg.png';

const API_URL = 'https://api.openai.com/v1/completions';
const YOUR_API_KEY = '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';
const MAX_TOKENS = 1000;

export default function ChatGPT() {
  const [messages, setMessages] = useState<any>([]);
  const navigation = useNavigation<any>();
  const {bottom} = useSafeAreaInsets();
  useEffect(() => {
    firstMessage();
  }, []);

  const firstMessage = () => {
    setMessages([
      {
        _id: 1,
        text: 'Bạn muốn hỏi gì ?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chatbot GPT',
          avatar: logo,
        },
      },
    ]);
  };

  const onSend = useCallback((message = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, message),
    );
    const value = message[0]?.text as string;
    callApi(value);
  }, []);

  const callApi = async (value: string) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${YOUR_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: value,
        max_tokens: MAX_TOKENS,
        temperature: 0,
      }),
    });

    const data = await res.json();
    if (data) {
      const values = data?.choices[0]?.text;
      addNewMessage(values);
      console.log('Data: ', values);
    }
  };

  const addNewMessage = (data: string) => {
    const numberRandom = 999999999999;
    const value = {
      _id: Math.random(numberRandom),
      text: data,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Chatbot GPT',
        avatar: logo,
      },
    } as any;

    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, value),
    );
  };

  return (
    <View style={{flex: 1, paddingBottom: bottom}}>
      <Header
        label="Chat GPT"
        type={IHeaderEnum.QRCode}
        onPress={() => navigation.goBack()}
      />
      <GiftedChat
        messages={messages}
        onSend={(text: any) => onSend(text)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}
