import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Header from '@components/Header';
import {IHeaderEnum} from '@model/handelConfig';
import {useNavigation} from '@react-navigation/native';
import {RouterName} from '@navigation/rootName';
import {Icon} from '@icon/index';
import Color from '@constants/Color';
import {windowHeight, windowWidth} from '@utils/Dimensions';
import QRCode from 'react-native-qrcode-svg';
import {useSelector} from 'react-redux';
import {RootState} from '@store/index';
import FastImage from 'react-native-fast-image';
import {urlAvatar} from '../Profile';

const QRCodeScreen = () => {
  const navigation = useNavigation<any>();
  const {profileUser} = useSelector((state: RootState) => state.user);

  return (
    <View style={styles.container}>
      <Header
        label="QR Code của bạn"
        type={IHeaderEnum.QRCode}
        onPress={() => navigation.goBack()}
      />
      <View
        style={{
          position: 'absolute',
          top: 120,
          right: 0,
          bottom: 0,
          left: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          backgroundColor: 'white',
          elevation: 7,
          marginHorizontal: 16,
          borderRadius: 8,
          height: windowWidth - 32,
          padding: 16,
        }}>
        <QRCode value={profileUser?.numberPhone} size={windowWidth - 64} />
      </View>

      <View
        style={{
          position: 'absolute',
          top: 120 + windowWidth - 32 + 50,
          right: 0,
          bottom: 0,
          left: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          backgroundColor: 'white',
          elevation: 7,
          marginHorizontal: 16,
          borderRadius: 8,
          height: 100,
          padding: 16,
          justifyContent: 'space-around',
        }}>
        <Text>Mã Id: {profileUser?.uid}</Text>
        <Text>Họ và tên: {profileUser?.username}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
  },
});

export default QRCodeScreen;
