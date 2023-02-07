import {
  GestureResponderEvent,
  Image,
  ImageStyle,
  Keyboard,
  NativeSyntheticEvent,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  Touchable,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {Icon as icon} from '@icon/index';
import {IHeaderEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TargetedEvent} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icons from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {fontFamily} from '../assets/fonts/Font';
import {Color, FontSize} from '../constants';

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
  styleIconRight?: StyleProp<ImageStyle>;
  buttonBack?: string;
  name?: string;
  // onPressIn?:
  //   | ((event: NativeSyntheticEvent<TargetedEvent>) => void)
  //   | undefined;
  // onFocus?:
  //   | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
  //   | undefined;
  StyleHeaderSetting?: ViewStyle;
}
const Header = ({
  type,
  label,
  placeholder,
  onChangeText,
  nameIconRight1,
  nameIconRight2,
  onPress,
  onPressIconRight2,
  onPressIconRight1,
  name,
  StyleHeaderSetting,
}: // onPressIn,
// onFocus,
IHeader) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  if (type === IHeaderEnum.Register) {
    return (
      <View
        style={[
          styles.header,
          StyleHeaderSetting,
          {paddingTop: Platform.OS === 'ios' ? inset.top * 1.15 : 10},
        ]}>
        <TouchableOpacity
          style={[styles.back]}
          onPress={() => navigation.goBack()}>
          <IconEntypo name="chevron-thin-left" size={22} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity onPress={onPress}>
          <Icons name={name} size={24} color={'white'} />
        </TouchableOpacity>
      </View>
    );
  } else if (type === IHeaderEnum.Message) {
    return (
      <View
        style={[
          styles.header,
          {paddingTop: Platform.OS === 'ios' ? inset.top * 1.15 : 15},
        ]}>
        <TouchableOpacity style={[styles.back]} onPress={onPress}>
          <IconEntypo name="chevron-thin-left" size={20} color={'white'} />
        </TouchableOpacity>
        <Text style={[styles.label]}>{label}</Text>
        <TouchableOpacity
          style={styles.buttonRight}
          onPress={onPressIconRight1}>
          <Image
            source={icon.telephone}
            style={[styles.styleiconRightMessage]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonRight}
          onPress={onPressIconRight1}>
          <Image
            source={icon.videocall}
            style={[styles.styleiconRightMessage]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonRight, {paddingEnd: 0}]}
          onPress={onPressIconRight1}>
          <Image source={icon.menu} style={[styles.styleiconRightMessage]} />
        </TouchableOpacity>
      </View>
    );
  } else if (type === IHeaderEnum.Home) {
    return (
      <View
        style={[
          styles.headerHome,
          {paddingTop: Platform.OS === 'ios' ? inset.top * 1.15 : null},
        ]}>
        <TouchableOpacity style={styles.back} onPress={onPress}>
          <Icons name="search1" size={24} color={'white'} />
        </TouchableOpacity>
        <TextInput
          // onPressIn={onPressIn}
          onPressOut={() => navigation.push(RouterName.SearchScreen)}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="white"
          style={styles.textInput}
          showSoftInputOnFocus={false}
        />

        <TouchableOpacity
          style={styles.buttonRight}
          onPress={onPressIconRight1}>
          <Image source={nameIconRight1} style={styles.styleiconRight} />
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
  } else if (type === IHeaderEnum.Search) {
    return (
      <View
        style={[
          styles.header,
          {
            paddingTop: Platform.OS === 'ios' ? inset.top * 1.1 : 10,
            paddingVertical: Platform.OS === 'ios' ? 8 : 10,
          },
        ]}>
        <TouchableOpacity style={styles.back} onPress={onPress}>
          <IconEntypo name="chevron-thin-left" size={20} color={'white'} />
        </TouchableOpacity>
        <TextInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Color.Darkgray}
          autoFocus={true}
          clearButtonMode={'while-editing'}
          style={[
            styles.textInput,
            {
              backgroundColor: 'white',
              paddingVertical: Platform.OS === 'ios' ? 5 : 0,
              paddingLeft: 10,
              color: Color.DimGray,
              borderRadius: 8,
            },
          ]}
        />
        <TouchableOpacity
          style={[styles.buttonRight, {marginLeft: 25}]}
          onPress={onPressIconRight2}>
          <Image source={icon.qrcode} style={styles.styleiconRight} />
        </TouchableOpacity>
      </View>
    );
  }
  return <View />;
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.primary,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerHome: {
    backgroundColor: Color.primary,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 10 : 3,
  },
  back: {
    justifyContent: 'center',
    paddingRight: 20,
  },
  label: {
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h4 * 1.1,
    color: 'white',
    // alignSelf: 'center',
    fontWeight: '500',
    flex: 1,
  },
  textInput: {
    flex: 1,
    color: 'white',
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h4 * 0.9,
  },
  buttonRight: {
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  styleiconRight: {
    width: 20,
    height: 20,
    tintColor: 'white',
    marginLeft: 10,
  },
  styleiconRightMessage: {
    width: 25,
    height: 25,
    tintColor: 'white',
    marginLeft: 10,
  },
});
export default Header;
