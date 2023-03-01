import {
  GestureResponderEvent,
  Image,
  ImageStyle,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {Icon, Icon as icon} from '@icon/index';
import {IHeaderEnum, IPeronalEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icons from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {fontFamily} from '../../assets/fonts/Font';
import FastImage from 'react-native-fast-image';
import {Color, FontSize} from '../../constants';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {renderers} from 'react-native-popup-menu';
import {menu} from './menu';
import {windowHeight, windowWidth} from '@utils/Dimensions';
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
  onPressExit?: (event: GestureResponderEvent) => void;
  onPostStatus?: (event: GestureResponderEvent) => void;
  onPressBack?: () => void;
  styleIconRight?: StyleProp<ImageStyle>;
  buttonBack?: string;
  name?: string;
  StyleHeaderSetting?: ViewStyle;
  typeOption?: string;
  typePersonal?: string;
  isPost?: boolean;
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
  onPressExit,
  name,
  StyleHeaderSetting,
  typeOption,
  typePersonal,
  isPost,
  onPostStatus,
  onPressBack,
}: IHeader) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [isSelect, setSelect] = useState<boolean>(true);
  switch (type) {
    case IHeaderEnum.Register:
      return (
        <View
          style={[
            styles.header,
            {paddingTop: Platform.OS === 'ios' ? inset.top * 1.15 : 10},
            StyleHeaderSetting,
          ]}>
          <TouchableOpacity style={[styles.back]} onPress={onPressExit}>
            <IconEntypo name="chevron-thin-left" size={22} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.label}>{label}</Text>
          <TouchableOpacity onPress={onPress}>
            <Icons name={name} size={24} color={'white'} />
          </TouchableOpacity>
          {typePersonal === IHeaderEnum.Comment && (
            <View style={styles.iconInPersonal}>
              <TouchableOpacity onPress={onPressIconRight1}>
                <FastImage
                  source={Icon.more}
                  tintColor={'white'}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      );
    case IHeaderEnum.Message:
      return (
        <View
          style={[
            styles.header,
            {paddingTop: Platform.OS === 'ios' ? inset.top * 1.15 : 15},
          ]}>
          <TouchableOpacity style={[styles.back]} onPress={onPress}>
            <IconEntypo name="chevron-thin-left" size={20} color={'white'} />
          </TouchableOpacity>
          <Text style={styles.label}>{label}</Text>
          <TouchableOpacity
            style={styles.buttonRight}
            onPress={onPressIconRight1}>
            <FastImage
              source={icon.telephone}
              style={[styles.styleiconRightMessage]}
              tintColor={'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonRight}
            onPress={onPressIconRight1}>
            <FastImage
              source={icon.videocall}
              style={[styles.styleiconRightMessage]}
              tintColor={'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonRight, {paddingEnd: 0}]}
            onPress={onPressIconRight1}>
            <FastImage
              source={icon.menu}
              style={[styles.styleiconRightMessage]}
              tintColor={'white'}
            />
          </TouchableOpacity>
        </View>
      );
    case IHeaderEnum.Home:
      return (
        <View
          style={[
            styles.headerHome,
            {paddingTop: Platform.OS === 'ios' ? inset.top * 1.15 : 3},
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
            <FastImage
              source={nameIconRight1}
              style={styles.styleiconRight}
              tintColor={'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonRight,
              {paddingLeft: nameIconRight2 === undefined ? 0 : 5},
            ]}
            onPress={onPressIconRight2}>
            {typeOption === IPeronalEnum.AddFriend ? (
              <Menu
                onOpen={() => setSelect(!isSelect)}
                onClose={() => setSelect(!isSelect)}>
                <MenuTrigger>
                  <FastImage
                    tintColor={'white'}
                    source={nameIconRight2}
                    style={styles.styleiconRight}
                  />
                </MenuTrigger>
                <MenuOptions style={styles.menu}>
                  {menu.map((item: any) => (
                    <MenuOption
                      onSelect={() => {
                        if (item.id === 1) {
                          navigation.navigate(RouterName.AddFriend);
                        }
                      }}
                      style={{flexDirection: 'row', alignItems: 'center'}}
                      key={item.id}>
                      <FastImage
                        source={item.icon}
                        style={styles.icon}
                        tintColor={'gray'}
                      />
                      <Text style={styles.text}>{item.text}</Text>
                      {item.id === 1 && (
                        <FastImage
                          source={Icon.triangle}
                          style={styles.triangle}
                          tintColor={'white'}
                        />
                      )}
                    </MenuOption>
                  ))}
                </MenuOptions>
              </Menu>
            ) : (
              <FastImage
                tintColor={'white'}
                source={nameIconRight2}
                style={styles.styleiconRight}
              />
            )}
          </TouchableOpacity>
          {!isSelect && (
            <FastImage
              tintColor={'white'}
              style={{
                width: windowWidth,
                height: windowHeight,
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
              }}
            />
          )}
        </View>
      );
    case IHeaderEnum.Search:
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
            <FastImage
              tintColor={'white'}
              source={icon.qrcode}
              style={styles.styleiconRight}
            />
          </TouchableOpacity>
        </View>
      );
    case IHeaderEnum.PostStatus:
      return (
        <View
          style={[
            styles.headerPostStatus,
            {paddingTop: Platform.OS === 'ios' ? inset.top * 1.15 : 10},
          ]}>
          <TouchableOpacity style={[styles.back]} onPress={onPressExit}>
            <IconEvilIcons name="close" size={30} color={'black'} />
          </TouchableOpacity>

          <TouchableOpacity style={{flex: 1}} onPress={onPress}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <IconMaterial
                name={'account-multiple'}
                size={20}
                color={'black'}
              />
              <Text style={styles.title}>Tất cả bạn bè</Text>
              <Icons
                name={'caretdown'}
                size={10}
                color={Color.DimGray}
                style={{top: -2, left: -2}}
              />
            </View>
            <Text style={styles.depcription}>Xem bởi bạn bè trên Zalo</Text>
          </TouchableOpacity>
          <View style={styles.iconInPersonal}>
            <View style={styles.view1}>
              <Pressable
                style={{
                  backgroundColor: isSelect ? 'white' : Color.primary,
                  margin: 1,
                  borderRadius: 20,
                }}
                onPress={() => setSelect(!isSelect)}>
                <Text
                  style={{
                    color: isSelect ? Color.primary : Color.Gainsboro,
                    paddingVertical: 6,
                    paddingHorizontal: 8,
                    fontFamily: fontFamily.RobotoMedium,
                  }}>
                  Aa
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: !isSelect ? 'white' : Color.primary,
                  margin: 1,
                  paddingVertical: 7.5,
                  paddingHorizontal: 9,
                  borderRadius: 20,
                }}
                onPress={() => setSelect(!isSelect)}>
                <FastImage
                  source={Icon.paintbrush}
                  tintColor={!isSelect ? Color.primary : Color.Gainsboro}
                  style={{
                    width: 15,
                    height: 15,
                  }}
                />
              </Pressable>
            </View>
            <TouchableOpacity style={{}} onPress={onPostStatus}>
              <IconIonicons
                name={'send'}
                size={24}
                color={isPost ? Color.primary : Color.disable}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    default:
      return <View />;
  }
};
export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.primary,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerHome: {
    backgroundColor: Color.primary,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 10 : 3,
  },
  headerPostStatus: {
    backgroundColor: 'rgb(247, 249, 255)',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: Color.Darkgray,
  },
  back: {
    justifyContent: 'center',
    paddingRight: 20,
  },
  label: {
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h4 * 1.1,
    color: 'white',
    alignSelf: 'center',
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

    marginLeft: 10,
  },
  styleiconRightMessage: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  iconInPersonal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  triangle: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: -13,
    right: 10,
  },
  icon: {
    width: 17,
    height: 17,
    tintColor: 'gray',
    marginVertical: 8,
    marginHorizontal: 15,
  },
  menu: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 40,
    left: -30,
    borderRadius: 10,
  },
  text: {
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
    marginRight: 20,
  },
  title: {
    fontFamily: fontFamily.RobotoMedium,
    color: Color.DimGray,
    marginHorizontal: 7,
  },
  depcription: {
    fontFamily: fontFamily.primaryFont,
    color: 'gray',
    fontSize: FontSize.h6,
  },
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Color.primary,
    width: 70,
    height: 32,
    borderRadius: 20,
    marginRight: 25,
  },
});

/* <MenuOption onSelect={() => {}} style={{flexDirection: 'row'}}>
                  <Image
                    source={icon.addUser}
                    style={{width: 20, height: 20, tintColor: Color.Darkgray}}
                  />
                 <Text>Thêm bạn </Text>
                </MenuOption>
                <MenuOption>
                  <Image
                    source={icon.addgroup}
                    style={{width: 20, height: 20, tintColor: Color.Darkgray}}
                  />
                </MenuOption>
                <MenuOption>
                  <Image
                    source={icon.cloud}
                    style={{width: 20, height: 20, tintColor: Color.Darkgray}}
                  />
                </MenuOption>
                <MenuOption>
                  <Image
                    source={icon.calendar}
                    style={{width: 20, height: 20, tintColor: Color.Darkgray}}
                  />
                </MenuOption>
                <MenuOption>
                  <Image
                    source={icon.videocall}
                    style={{width: 20, height: 20, tintColor: Color.Darkgray}}
                  />
                </MenuOption>
                <MenuOption>
                  <Image
                    source={icon.monitor}
                    style={{width: 20, height: 20, tintColor: Color.Darkgray}}
                  />
                </MenuOption> */
