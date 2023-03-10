import Header from '@components/Header';
import UIButton from '@components/UIButton';
import Color from '@constants/Color';
import FontSize from '@constants/FontSize';
import {fontFamily} from '@fonts/Font';
import {Icon} from '@icon/index';
import {IHeaderEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {resetStatus} from '@store/slice/contents/contentsSlice';
import {resetMessage} from '@store/slice/message/messageSlice';
import {resetUser} from '@store/slice/user/userSlice';
import React from 'react';
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import StatusBar, {Constants} from '@components/StatusBar';

const data = [
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
    icon: Icon.notification,
    label: 'Thông báo',
    descriptions: null,
  },
  {
    icon: Icon.message,
    label: 'Tin nhắn',
    descriptions: null,
  },
  {
    icon: Icon.history,
    label: 'Nhật ký',
    descriptions: null,
  },
  {
    icon: Icon.telephone,
    label: 'Cuộc gọi',
    descriptions: null,
  },
  {
    icon: Icon.phonebook,
    label: 'Danh bạ',
    descriptions: null,
  },
  {
    icon: Icon.language,
    label: 'Giao diện và ngôn ngữ',
    descriptions: null,
  },
  {
    icon: Icon.info,
    label: 'Thông tin về ZALO',
    descriptions: null,
  },
  {
    icon: Icon.question,
    label: 'Hỗ trợ',
    descriptions: null,
  },
  {
    icon: Icon.account,
    label: 'Chuyển tài khoản',
    descriptions: null,
  },
];
const renderItem = ({item}: {item: any}) => {
  return (
    <TouchableOpacity
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
        <Text style={[styles.labelStyle, styles.userName]}>{item.label}</Text>
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
  );
};
const Setting = () => {
  const navigation = useNavigation<any>();
  const {bottom} = useSafeAreaInsets();
  const dispatch = useDispatch<any>();
  return (
    <View style={styles.container}>
      <Header
        label={'Cài đặt'}
        type={IHeaderEnum.Register}
        name={'search1'}
        onPressExit={() => navigation.goBack()}
        onPress={() => {
          navigation.navigate(RouterName.SearchScreen);
        }}
        StyleHeaderSetting={{
          paddingVertical: Platform.OS === 'android' ? 14 : 10,
        }}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        extraData={(item: any) => item.label}
        ListFooterComponent={
          <UIButton
            styleUIButton={{marginHorizontal: 80, marginBottom: bottom}}
            label={'Đăng xuất'}
            styleLabel={{fontSize: FontSize.h5}}
            onPress={() => {
              Alert.alert('Thông báo', 'Bạn có muốn đăng xuất', [
                {
                  text: 'À không',
                },
                {
                  text: 'Đúng vậy',
                  onPress: async () => {
                    await auth()
                      .signOut()
                      .then(() => {
                        dispatch(resetStatus());
                        dispatch(resetMessage());
                        dispatch(resetUser());
                      });
                  },
                },
              ]);
            }}
          />
        }
      />
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
export default Setting;
