import Header from '@components/Header';
import Color from '@constants/Color';
import FontSize from '@constants/FontSize';
import {fontFamily} from '@fonts/Font';
import {Icon} from '@icon/index';
import {IHeaderEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import firestore from '@react-native-firebase/firestore';
export const urlAvatar =
  'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/300794624_1928738850648421_6758468667402727253_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=oH5kCNJxencAX9qaEQF&_nc_ht=scontent.fdad3-5.fna&oh=00_AfAeTfoKUWvEwS3kaOcVXMb2yGfXs0yLUEdpAgChPA5Mlw&oe=63E06BA8';
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
  const {profileUser} = useSelector((state: RootState) => state.user);
  console.log();
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
        onPress={() =>
          navigation.navigate(RouterName.Personal, {
            UserId: null,
          })
        }>
        <Image
          source={{
            uri: profileUser.avatar,
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
          style={[
            styles.item,
            {
              marginBottom:
                item.label === 'Ví QR' || item.label === 'Dữ Liệu và bộ nhớ'
                  ? 10
                  : 0,
            },
          ]}>
          <Image source={item.icon} style={styles.icon} />
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
    tintColor: Color.blue,
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
