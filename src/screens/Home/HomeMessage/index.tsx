import Header from '@components/Header';
import {IHeaderEnum, IPeronalEnum} from '@model/handelConfig';
import {Icon} from '@icon/index';
import UserData from '@data/UserData';
import {Color, FontSize} from '@constants';
import {fontFamily} from '@fonts/Font';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '@store/index';
import {getMessage, getMessages} from '@store/slice/message/messageSlice';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import StatusBar, {Constants} from '@components/StatusBar';
import {addProfileFriend} from '@store/slice/profileFriend/profileFriendSlice';
const Home: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const {profileUser} = useSelector((state: RootState) => state?.user);
  const ListFriend = profileUser?.listFriend?.filter(
    (item: any) => item.status === 3,
  );
  const {Messages} = useSelector((state: RootState) => state?.message);

  const renderUI = (item: any) => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row'}}
        onPress={() => {
          dispatch(getMessage({numberPhone: profileUser.numberPhone}));
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
  const onQRCode = async () => {
    navigation.navigate(RouterName.QRCodeScan);
  };
  return (
    <View style={styles.container}>
      <Header
        placeholder={'Tìm kiếm'}
        type={IHeaderEnum.Home}
        nameIconRight1={Icon.qrcode}
        nameIconRight2={Icon.plus}
        typeOption={IPeronalEnum.AddFriend}
        onPressIconRight1={() => onQRCode()}
      />

      <FlatList data={ListFriend} renderItem={({item}) => renderUI(item)} />
      <StatusBar
        mode={Constants.statusBar.light}
        navigation={navigation}
        backgroundColor={Color.primary}
      />
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
