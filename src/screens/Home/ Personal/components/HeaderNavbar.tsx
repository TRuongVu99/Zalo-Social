import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {windowWidth} from '@utils/Dimensions';
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/core';
import {fontFamily} from '@fonts/Font';
import FontSize from '@constants/FontSize';
import isAndroid from '@utils/Platform';
import {IHeaderEnum} from '@model/handelConfig';
import {Icon} from '@icon/index';
import FastImage from 'react-native-fast-image';

interface IHeaderNavbar {
  label?: string;
  type?: string;
}

const HeaderNavbar = ({label, type}: IHeaderNavbar) => {
  const navigation = useNavigation<any>();
  return (
    <View
      style={[
        styles.iconInPersonal,
        {marginTop: Platform.OS === 'android' ? -30 : 0},
      ]}>
      <TouchableOpacity
        style={[styles.back]}
        onPress={() => navigation.goBack()}>
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
