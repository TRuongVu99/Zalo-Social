import Header from '@components/Header';
import Color from '@constants/Color';
import FontSize from '@constants/FontSize';
import {fontFamily} from '@fonts/Font';
import {Icon} from '@icon/index';
import {IHeaderEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/native';
import {endLoading, startLoading} from '@store/slice/app/appSlice';
import {getStatus} from '@store/slice/contents/contentsSlice';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import FastImage from 'react-native-fast-image';
import StatusBar, {Constants} from '@components/StatusBar';

export const urlAvatar =
  'data:image/jpeg;base64,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';
const data = [
  {
    icon: Icon.walletQR,
    label: 'Ví QR',
    descriptions: 'Lưu trữ và xuất trình các mã QR quan trọng',
  },
  {
    icon: Icon.cloud,
    label: 'Cloud của tôi',
    descriptions: 'Lưu trữ các tin nhắn quan trọng',
  },
  {
    icon: Icon.data,
    label: 'Dữ Liệu và bộ nhớ',
    descriptions: 'Quản lý dữ liệu Zalo của bạn',
  },
  {
    icon: Icon.security,
    label: 'Tài khoản và bảo mật',
    descriptions: null,
  },
  {
    icon: Icon.privacy,
    label: 'Quyền riêng tư',
    descriptions: null,
  },
];
const Profile = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const {profileUser} = useSelector((state: RootState) => state.user);

  const onGetProfile = async () => {
    dispatch(startLoading());
    await dispatch(getStatus({numberPhone: profileUser.numberPhone})).unwrap();
    dispatch(endLoading());
  };
  const onNavigationService = (item: string) => {
    switch (item) {
      case 'Ví QR':
        navigation.navigate(RouterName.QRCode);
        break;

      default:
        break;
    }
  };
  return (
    <View style={styles.container}>
      <Header
        placeholder={'Tìm kiếm'}
        type={IHeaderEnum.Home}
        nameIconRight2={Icon.setting}
        onPressIconRight2={() => {
          navigation.navigate(RouterName.Setting);
        }}
      />
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          onGetProfile();
          navigation.navigate(RouterName.Personal, {
            UserId: null,
          });
        }}>
        <FastImage
          source={{
            uri:
              profileUser.avatar === undefined ? urlAvatar : profileUser.avatar,
          }}
          style={styles.avatar}
        />
        <View style={{justifyContent: 'center'}}>
          <Text style={[styles.labelStyle, styles.userName]}>
            {profileUser.username}
          </Text>
          <Text style={styles.description}>Xem trang cá nhân</Text>
        </View>
      </TouchableOpacity>
      {data.map(item => (
        <TouchableOpacity
          key={item.label}
          onPress={() => onNavigationService(item.label)}
          style={[
            styles.item,
            {
              marginBottom:
                item.label === 'Ví QR' || item.label === 'Dữ Liệu và bộ nhớ'
                  ? 10
                  : 0,
            },
          ]}>
          <FastImage
            source={item.icon}
            style={styles.icon}
            tintColor={Color.blue}
          />
          <View style={styles.container}>
            <Text style={[styles.labelStyle, styles.userName]}>
              {item.label}
            </Text>
            {item.descriptions !== null && (
              <Text style={styles.description}>{item.descriptions}</Text>
            )}
          </View>
          {item.label !== 'Ví QR' && (
            <TouchableOpacity style={{padding: 10}}>
              <IconEntypo name="chevron-thin-right" size={12} color={'black'} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      ))}
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
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 18,
    marginBottom: 10,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    marginHorizontal: 18,
  },
  labelStyle: {
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
  },
  description: {
    fontFamily: fontFamily.primaryFont,
    fontWeight: '300',
    color: Color.DimGray,
  },
  userName: {fontSize: FontSize.h4 * 0.95, marginBottom: 5},
  icon: {
    width: 25,
    height: 25,

    marginHorizontal: 18,
    alignSelf: 'center',
  },
  item: {
    paddingVertical: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default Profile;
