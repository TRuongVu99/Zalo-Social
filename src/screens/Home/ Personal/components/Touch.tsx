import {Color} from '@constants';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import {IButtonEnum} from '@model/handelConfig';
import React from 'react';
import {
  GestureResponderEvent,
  ImageStyle,
  Text,
  TouchableOpacity,
  StyleProp,
} from 'react-native';
import {styles} from './PostStatus';
interface ITouch {
  onPress: (event: GestureResponderEvent) => void;
  items: any;
  isSelect?: number;
  type?: boolean;
  types?: boolean;
  styleTouch?: StyleProp<ImageStyle>;
}
const Touch = ({onPress, items, isSelect, type, types, styleTouch}: ITouch) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.touch,
        styleTouch,
        {
          backgroundColor:
            isSelect === items.id ? Color.notificationValidate : 'transparent',
        },
      ]}>
      {type && (
        <IconFeather name={items.icon} size={13} color={Color.DimGray} />
      )}
      {types && (
        <>
          {items.id === 2 ? (
            <IconAntDesign name={items.icon} size={13} color={Color.DimGray} />
          ) : (
            <IconIonicons name={items.icon} size={13} color={Color.DimGray} />
          )}
        </>
      )}
      <Text style={styles.label}>{items.label}</Text>
    </TouchableOpacity>
  );
};

export default Touch;
