import Header from '@components/Header';
import {IHeaderEnum, IPeronalEnum} from '@model/handelConfig';
import {Icon} from '@icon/index';
import {Color, FontSize} from '@constants';
import {fontFamily} from '@fonts/Font';
import {RouterName} from '@navigation/rootName';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {RootState} from '@store/index';
import {getMessage, getMessageHomeAll} from '@store/slice/message/messageSlice';
import React, {useCallback, useEffect, useState} from 'react';
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
import moment from 'moment';
const Home: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const {profileUser} = useSelector((state: RootState) => state?.user);
  const {MessageAll} = useSelector((state: RootState) => state?.message);

  useFocusEffect(
    useCallback(() => {
      dispatch(getMessageHomeAll({numberPhone: profileUser.numberPhone}));
    }, []),
  );

  const renderUI = (item: any) => {
    let m1 = moment(
      `${moment(
        `${
          item?.lastMessage?.timeReceive?.day
            ? item?.lastMessage?.timeReceive?.day
            : item?.lastMessage?.timeSent?.day
        } ${
          item?.lastMessage?.timeReceive?.hour
            ? item?.lastMessage?.timeReceive?.hour
            : item?.lastMessage?.timeSent?.hour
        }`,
        'MM/DD/YYYY HH:mm:ss A',
      ).format('MM/DD/YYYY HH:mm:ss A')}`,
      'MM/DD/YYYY HH:mm:ss A',
    );
    let m2 = moment(
      `${moment().format('MM/DD/YYYY HH:mm:ss A')}`,
      'MM/DD/YYYY HH:mm:ss A',
    );
    const diff = m2.diff(m1, 'minute');
    const resultTime =
      Math.floor(diff / 60) < 1
        ? diff + ' phút trước'
        : Math.floor(diff / 60) >= 1 && Math.floor(diff / 60) <= 24
        ? Math.floor(diff / 60) + ' giờ trước'
        : item?.lastMessage?.timeReceive?.day
        ? item?.lastMessage?.timeReceive?.day
        : item?.lastMessage?.timeSent?.day;
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.userName}>{item.username}</Text>
            <Text style={styles.time}>{resultTime}</Text>
          </View>
          <Text style={styles.message}>
            {item?.lastMessage?.message?.includes('firebasestorage')
              ? '[Hình ảnh]'
              : item?.lastMessage?.message}
          </Text>
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

      <FlatList data={MessageAll} renderItem={({item}) => renderUI(item)} />
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
    backgroundColor: 'white',
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
    borderBottomColor: Color.Darkgray,
  },
  userName: {
    fontSize: FontSize.h4,
    fontFamily: fontFamily.SanFranciscoDisplayMedium,
    color: Color.DimGray,
    marginBottom: 3,
  },
  message: {
    fontSize: FontSize.h5,
    fontFamily: fontFamily.primaryFont,
    color: 'gray',
  },
  time: {
    fontSize: FontSize.h6 * 1.1,
    fontFamily: fontFamily.primaryFont,
    color: 'gray',
    marginRight: 15,
  },
});
export default Home;
