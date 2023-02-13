import {Color} from '@constants';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import React from 'react';
import {GestureResponderEvent, Text, TouchableOpacity} from 'react-native';
import {styles} from './PostStatus';
interface ITouch {
  onPress: (event: GestureResponderEvent) => void;
  items: any;
  isSelect: number;
}
const Touch = ({onPress, items, isSelect}: ITouch) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.touch,
        {
          backgroundColor:
            isSelect === items.id ? Color.notificationValidate : 'transparent',
        },
      ]}>
      {items.id === 2 ? (
        <IconAntDesign name={items.icon} size={13} color={Color.DimGray} />
      ) : (
        <IconIonicons name={items.icon} size={13} color={Color.DimGray} />
      )}
      <Text style={styles.label}>{items.label}</Text>
    </TouchableOpacity>
  );
};

export default Touch;
