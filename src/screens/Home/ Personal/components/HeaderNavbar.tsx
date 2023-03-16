import {Icon} from '@icon/index';
import {IHeaderEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';

interface IHeaderNavbar {
  label?: string;
  type?: string;
  isFromQRcode?: boolean;
}

const HeaderNavbar = ({label, type, isFromQRcode}: IHeaderNavbar) => {
  const navigation = useNavigation<any>();
  return (
    <View
      style={[
        styles.iconInPersonal,
        {marginTop: Platform.OS === 'android' ? -30 : 0},
      ]}>
      <TouchableOpacity
        style={[styles.back]}
        onPress={() => {
          isFromQRcode
            ? (navigation.popToTop(), navigation.goBack())
            : type
            ? navigation.goBack()
            : navigation.navigate(RouterName.Profile);
        }}>
        <IconEntypo name="chevron-thin-left" size={22} color={'white'} />
      </TouchableOpacity>
      <View style={styles.iconInPersonal}>
        <TouchableOpacity style={{paddingHorizontal: 20}} onPress={() => {}}>
          <IconFeather
            name={type === IHeaderEnum.Register ? 'phone' : 'clock'}
            size={type === IHeaderEnum.Register ? 23 : 26}
            color={'white'}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <FastImage
            source={Icon.more}
            tintColor={'white'}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderNavbar;

const styles = StyleSheet.create({
  iconInPersonal: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
  },
  back: {
    paddingRight: 20,
    flex: 1,
  },
  icon: {
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
});
