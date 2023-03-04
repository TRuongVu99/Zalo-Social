import Header from '@components/Header';
import {FontSize} from '@constants';
import {fontFamily} from '@fonts/Font';
import {Icon} from '@icon/index';
import {IHeaderEnum, IPeronalEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '@store/index';
import {getMessages} from '@store/slice/message/messageSlice';
import React from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const Home: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const {profileUser} = useSelector((state: RootState) => state?.user);
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

    return () => subscriber();
  }

  const renderUI = (item: any) => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row'}}
        onPress={() => {
          getMessage(profileUser.numberPhone);
          navigation.navigate(RouterName.Message, {
            name: item.username,
            profileFriend: item,
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
