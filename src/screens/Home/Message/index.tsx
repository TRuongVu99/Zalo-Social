import Header from '@components/Header';
import StatusBar, {Constants} from '@components/StatusBar';
import {Color, FontSize} from '@constants';
import {fontFamily} from '@fonts/Font';
import {IHeaderEnum, IPeronalEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '@store/index';
import {getMessage, sentMessage} from '@store/slice/message/messageSlice';
import {addProfileFriend} from '@store/slice/profileFriend/profileFriendSlice';
import Platform from '@utils/Platform';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import {useDispatch, useSelector} from 'react-redux';

const renderUI = (item: any, profileFriend: any) => {
  return (
    <View
      style={{
        flexDirection: item.isSender ? 'row-reverse' : 'row',
        alignItems: 'center',
        marginBottom: 5,
      }}>
      {item.isReceive &&
        (item.isReceive ? (
          <Image style={styles.avatar} source={{uri: profileFriend.avatar}} />
        ) : (
          <View style={{width: 30}} />
        ))}
      <TouchableOpacity
        style={[
          styles.viewMessage,
          {backgroundColor: item.isReceive ? 'white' : Color.message},
        ]}>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.message}>
          {item.isReceive ? item.timeReceive?.hour : item.timeSent?.hour}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Message = ({route}: {route: any}) => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const inset = useSafeAreaInsets();
  const {name, profileFriend, type} = route?.params;
  const {profileUser} = useSelector((state: RootState) => state?.user);
  const {Messages} = useSelector((state: RootState) => state?.message);
  const [paddingBottom, setPaddingBottom] = useState<boolean>(true);
  const [messageApp, setMessage] = useState<string>('');
  const data = Messages?.message?.filter(
    (item: any) =>
      item.phoneOfSender === profileFriend.numberPhone ||
      item.phoneOfReceive === profileFriend.numberPhone,
  );
  console.log({Messages});
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
      setPaddingBottom(false);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setPaddingBottom(true);
    });
  }, []);
  useEffect(() => {
    dispatch(getMessage({numberPhone: profileUser.numberPhone}));
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.isIos ? 'padding' : undefined}
      style={styles.container}>
      <View style={styles.container}>
        <Header
          onPress={() => {
            type === IHeaderEnum.Phonebook
              ? navigation.goBack()
              : navigation.navigate(RouterName.HomeMessage);
          }}
          type={IHeaderEnum.Message}
          label={name ? name : profileFriend.username}
          onPressUser={async () => {
            dispatch(addProfileFriend(profileFriend));

            navigation.navigate(RouterName.Personal, {
              profile: profileFriend,
              type: IPeronalEnum.Friend,
            });
          }}
          onPressIconRight3={() => {
            navigation.navigate(RouterName.Optional, {
              profile: profileFriend,
            });
          }}
        />
        <FlatList
          inverted
          contentContainerStyle={{
            marginHorizontal: 15,
            paddingBottom: 20,
          }}
          data={data?.reverse()}
          renderItem={({item}) => renderUI(item, profileFriend)}
        />

        <View
          style={[
            styles.viewTextInput,
            {paddingBottom: paddingBottom ? inset.bottom : 0},
          ]}>
          <TouchableOpacity>
            <IconSimple name={'emotsmile'} size={26} color={Color.DimGray} />
          </TouchableOpacity>
          <TextInput
            value={messageApp}
            multiline={true}
            placeholder="Tin nhắn"
            onChangeText={(text: string) => setMessage(text)}
            style={styles.textInput}
          />
          {messageApp !== '' ? (
            <TouchableOpacity
              onPress={() => {
                setMessage('');
                dispatch(
                  sentMessage({
                    numberPhone: profileFriend.numberPhone,
                    message: {
                      phoneOfSender: profileUser.numberPhone,
                      isReceive: true,
                      message: messageApp,
                      timeReceive: {
                        hour: moment().format('LT'),
                        day: moment().format('L'),
                      },
                    },
                  }),
                );
                dispatch(
                  sentMessage({
                    numberPhone: profileUser.numberPhone,
                    message: {
                      phoneOfReceive: profileFriend.numberPhone,
                      isSender: true,
                      message: messageApp,
                      timeSent: {
                        hour: moment().format('LT'),
                        day: moment().format('L'),
                      },
                    },
                  }),
                );
                dispatch(getMessage({numberPhone: profileUser.numberPhone}));
              }}>
              <IconIonicons name={'send'} size={24} color={Color.primary} />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity>
                <IconSimple name={'options'} size={26} color={Color.DimGray} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconR}>
                <IconSimple
                  name={'microphone'}
                  size={26}
                  color={Color.DimGray}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <IconSimple name={'picture'} size={26} color={Color.DimGray} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <StatusBar
        mode={Constants.statusBar.light}
        navigation={navigation}
        backgroundColor={Color.primary}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  avatar: {
    width: 30,
    height: 30,
    marginVertical: 10,
    borderRadius: 60 / 2,
  },
  viewMessage: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Color.Darkgray,
  },
  userName: {
    fontSize: FontSize.h4,
    fontFamily: fontFamily.primaryFont,
  },
  message: {
    fontSize: FontSize.h5,
    fontFamily: fontFamily.primaryFont,
  },
  iconR: {
    paddingHorizontal: 20,
  },
  textInput: {
    flex: 1,
    paddingVertical: Platform.isIos ? 5 : 10,
    fontSize: FontSize.h4,
    paddingHorizontal: 10,
  },
  viewTextInput: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Platform.isIos ? 10 : 0,
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
export default Message;
