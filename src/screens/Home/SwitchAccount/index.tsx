import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '@components/Header';
import {IHeaderEnum} from '@model/handelConfig';
import {useNavigation} from '@react-navigation/native';
import {RouterName} from '@navigation/rootName';
import Platform from '@utils/Platform';
import Color from '@constants/Color';
import {fontFamily} from '@fonts/Font';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@store/index';
import FastImage from 'react-native-fast-image';
import {setIsSwitchAccount} from '@store/slice/app/appSlice';
const SwitchAccount = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const {accountDevice, profileUser} = useSelector(
    (state: RootState) => state.user,
  );
  return (
    <View style={styles.container}>
      <Header
        label={'Chuyển tài khoản'}
        type={IHeaderEnum.Register}
        onPress={() => {
          navigation.navigate(RouterName.SearchScreen);
        }}
        StyleHeaderSetting={{
          paddingVertical: Platform.isAndroid ? 14 : 10,
        }}
      />
      <View style={styles.boxHeader}>
        <Text style={{fontFamily: fontFamily.primaryFont}}>
          Thêm tài khoản để đăng nhập nhanh.
        </Text>
      </View>
      {accountDevice?.map((item, index) => {
        const isDisabled = item.uid === profileUser?.uid;
        return (
          <TouchableOpacity key={index} disabled={isDisabled}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 12,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FastImage
                  style={{width: 55, height: 55, borderRadius: 55 / 2}}
                  source={{uri: item.avatar}}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    fontFamily: fontFamily.primaryFont,
                  }}>
                  {item?.username}
                </Text>
              </View>
              {isDisabled && (
                <Text
                  style={{fontFamily: fontFamily.primaryFont, fontSize: 12}}>
                  Đã đăng nhập
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        onPress={() => {
          dispatch(setIsSwitchAccount(true));
          navigation.navigate(RouterName.LoginSwitchAccount);
        }}>
        <Text>Them Tai Khoan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxHeader: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
  },
});

export default SwitchAccount;
