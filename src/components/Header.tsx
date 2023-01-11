import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  GestureResponderEvent,
} from 'react-native';

import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/AntDesign';
import {IHeaderEnum} from '@model/handelConfig';
import {fontFamily} from '../assets/fonts/Font';
import {FontSize} from '../constants';

interface IHeader {
  type?: string;
  label?: string;
  placeholder?: string;
  onChangeText?: (value: string) => void;
  nameIconRight1?: string;
  nameIconRight2?: string;
  onPress: (event: GestureResponderEvent) => void;
}
const Header = ({
  type,
  label,
  placeholder,
  onChangeText,
  nameIconRight1,
  nameIconRight2,
  onPress,
}: IHeader) => {
  const inset = useSafeAreaInsets();
  if (type === IHeaderEnum.Register) {
    return (
      <View style={[styles.header, {paddingTop: inset.top}]}>
        <TouchableOpacity style={[styles.back]} onPress={onPress}>
          <Icon name="angle-left" size={28} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.label}>{label}</Text>
      </View>
    );
  } else if (type === IHeaderEnum.Home) {
    return (
      <View style={[styles.header, {paddingTop: inset.top}]}>
        <TouchableOpacity style={[styles.back]} onPress={onPress}>
          <Icons name="search1" size={24} color={'white'} />
        </TouchableOpacity>
        <TextInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="white"
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.iconRight} onPress={() => {}}>
          <Icons name={nameIconRight1} size={24} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconRight,
            {paddingLeft: nameIconRight2 === undefined ? 0 : 5},
          ]}
          onPress={() => {}}>
          <Icons name={nameIconRight2} size={24} color={'white'} />
        </TouchableOpacity>
      </View>
    );
  }
  return <View />;
  // return (
  //   <View style={[styles.header, {paddingTop: inset.top, paddingVertical: 16}]}>
  //     <Text style={{width: windowWidth}}>Header</Text>
  //     {/* <Icon name="arrow-left" size={24} /> */}
  //   </View>
  // );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1FAEEB',
    paddingVertical: 16,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  back: {
    justifyContent: 'center',
    paddingRight: 20,
  },
  label: {
    fontFamily: fontFamily.headerFont,
    fontSize: FontSize.h3,
    color: 'white',
    alignSelf: 'center',
  },
  textInput: {
    color: 'white',
    flex: 1,
  },
  iconRight: {
    paddingLeft: 5,
  },
});
export default Header;
