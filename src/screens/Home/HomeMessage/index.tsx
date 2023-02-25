import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Keyboard,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import React, {useCallback, useContext, useEffect} from 'react';
import Header from '@components/Header';
import {IHeaderEnum, IPeronalEnum} from '@model/handelConfig';
import {Icon} from '@icon/index';
import UserData from '@data/UserData';
import {FontSize} from '@constants';
import {fontFamily} from '@fonts/Font';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {RouterName} from '@navigation/rootName';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@store/index';
import firestore from '@react-native-firebase/firestore';
import {getMessages} from '@store/slice/message/messageSlice';

const Home: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const {profileUser} = useSelector((state: RootState) => state?.user);
  const {Messages, MessageAll} = useSelector(
    (state: RootState) => state?.message,
  );
  const Message = MessageAll.filter((item: any) => item.message !== undefined);
  const messageRecevive = Message.map((item: any) => {
    const data = item.message.filter((items: any) => items.isReceive === true);
    return data;
  });
  const ListFriend = profileUser?.listFriend?.filter(
    (item: any) => item.status === 3,
  );
  function getMessage(numberPhone: any) {
    const subscriber = firestore()
      .collection('Message')
      .doc(numberPhone)
      .onSnapshot((documentSnapshot: any) => {
        dispatch(getMessages(documentSnapshot.data()));
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }

  const renderUI = (item: any) => {
    console.log({img: item.avatar});
    return (
      <TouchableOpacity
        style={{flexDirection: 'row'}}
        onPress={() => {
          getMessage(item.numberPhone);
          navigation.navigate(RouterName.Message, {
            name: item.username,
            numberPhoneFriend: item.numberPhone,
          });
        }}>
        <Image style={styles.avatar} source={{uri: item.avatar}} />
        <View style={styles.viewMessage}>
          <Text style={styles.userName}>{item.username}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header
          placeholder={'Tìm kiếm'}
          type={IHeaderEnum.Home}
          nameIconRight1={Icon.qrcode}
          nameIconRight2={Icon.plus}
          typeOption={IPeronalEnum.AddFriend}
        />
        <FlatList data={ListFriend} renderItem={({item}) => renderUI(item)} />
      </View>
    </TouchableNativeFeedback>
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
    width: 60,
    height: 60,
    marginVertical: 10,
    marginHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 60 / 2,
  },
  viewMessage: {
    borderBottomWidth: 0.2,
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: FontSize.h4,
    fontFamily: fontFamily.primaryFont,
  },
  message: {
    fontSize: FontSize.h5,
    fontFamily: fontFamily.primaryFont,
  },
});
export default Home;
