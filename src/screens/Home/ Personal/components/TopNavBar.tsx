import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/core';
import {fontFamily} from '@fonts/Font';
import FontSize from '@constants/FontSize';
import FastImage from 'react-native-fast-image';
import Color from '@constants/Color';
import isAndroid from '@utils/Platform';
import {IHeaderEnum} from '@model/handelConfig';
import {Icon} from '@icon/index';
import {RouterName} from '@navigation/rootName';

interface ITopNavBar {
  avatar?: string;
  userName?: string;
  type?: string;
}

const TopNavBar = ({avatar, userName, type}: ITopNavBar) => {
  const navigation = useNavigation<any>();
  return (
    <View
      style={[
        styles.iconInPersonal,
        {marginTop: Platform.OS === 'android' ? -30 : 0},
      ]}>
      <TouchableOpacity
        style={[styles.back]}
        onPress={() => navigation.navigate(RouterName.Profile)}>
        <IconEntypo name="chevron-thin-left" size={22} color={'black'} />
      </TouchableOpacity>
      <View style={styles.user}>
        <FastImage source={{uri: avatar}} style={styles.avatar} />
        <Text style={styles.label}>{userName}</Text>
      </View>
      <View style={styles.iconInPersonal}>
        <TouchableOpacity style={{paddingHorizontal: 20}} onPress={() => {}}>
          <IconFeather
            name={type === IHeaderEnum.Register ? 'phone' : 'clock'}
            size={type === IHeaderEnum.Register ? 23 : 26}
            color={'black'}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <FastImage
            source={Icon.more}
            tintColor={'black'}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopNavBar;

const styles = StyleSheet.create({
  iconInPersonal: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 10,
    alignItems: 'center',
  },
  back: {
    paddingRight: 20,
  },
  label: {
    fontFamily: fontFamily.RobotoMedium,
    fontSize: FontSize.h5 * 1.1,
    color: 'black',
    alignSelf: 'center',
    fontWeight: '500',
    marginLeft: 15,
  },
  user: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
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
