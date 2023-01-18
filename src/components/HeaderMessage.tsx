import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  GestureResponderEvent,
  Image,
  StyleProp,
  ImageStyle,
  NativeSyntheticEvent,
} from 'react-native';

import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/AntDesign';
import {IHeaderEnum} from '@model/handelConfig';
import {fontFamily} from '../assets/fonts/Font';
import {Color, FontSize} from '../constants';
import {TargetedEvent} from 'react-native';

interface IHeader {
  type?: string;
  label?: string;
  placeholder?: string;
  onChangeText?: (value: string) => void;
  nameIconRight1?: string | undefined;
  nameIconRight2?: string | undefined;
  onPress?: (event: GestureResponderEvent) => void;
  onPressIconRight1?: (event: GestureResponderEvent) => void;
  onPressIconRight2?: (event: GestureResponderEvent) => void;
  onPressIn?:
    | ((event: NativeSyntheticEvent<TargetedEvent>) => void)
    | undefined;
  buttonBack?: string;
}
const HeaderMessage = ({
  type,
  label,
  placeholder,
  onChangeText,
  nameIconRight1,
  nameIconRight2,
  onPress,
  onPressIconRight2,
  onPressIconRight1,
  onPressIn,
  buttonBack,
}: IHeader) => {
  const inset = useSafeAreaInsets();
  if (type === IHeaderEnum.Register) {
    return (
      <View style={[styles.header, {paddingTop: inset.top * 1.15}]}>
        <TouchableOpacity style={[styles.back]} onPress={onPress}>
          <Icon name="angle-left" size={28} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.label}>{label}</Text>
      </View>
    );
  } else if (type === IHeaderEnum.Home) {
    return (
      <View style={[styles.header, {paddingTop: inset.top * 1.15}]}>
        <TouchableOpacity style={[styles.back]} onPress={onPress}>
          {!buttonBack ? (
            <Icons name="search1" size={24} color={'white'} />
          ) : (
            <Icon name="angle-left" size={28} color={'white'} />
          )}
        </TouchableOpacity>
        <TextInput
          onPressIn={onPressIn}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="white"
          style={styles.textInput}
        />
        <TouchableOpacity
          style={styles.buttonRight}
          onPress={onPressIconRight1}>
          <Image source={nameIconRight1} style={[styles.styleiconRight]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonRight,
            {paddingLeft: nameIconRight2 === undefined ? 0 : 5},
          ]}
          onPress={onPressIconRight2}>
          <Image source={nameIconRight2} style={styles.styleiconRight} />
          {/* <Icons name={nameIconRight2} size={24} color={'white'} /> */}
        </TouchableOpacity>
      </View>
    );
  }
  return <View />;
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.primary,
    paddingVertical: 15,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  back: {
    justifyContent: 'center',
    paddingRight: 20,
  },
  label: {
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h3,
    color: 'white',
    alignSelf: 'center',
    fontWeight: '500',
  },
  textInput: {
    flex: 1,
    color: 'white',
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h4 * 0.9,
  },
  buttonRight: {
    paddingHorizontal: 5,
  },
  styleiconRight: {
    width: 20,
    height: 20,
    tintColor: 'white',
    marginLeft: 15,
  },
});
export default HeaderMessage;
