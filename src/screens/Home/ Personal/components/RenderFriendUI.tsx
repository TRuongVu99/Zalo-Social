import Header from '@components/Header';
import {Color, FontSize, image} from '@constants';
import {fontFamily} from '@fonts/Font';
import {IHeaderEnum, IPeronalEnum} from '@model/handelConfig';
import {windowHeight} from '@utils/Dimensions';
import Icon from 'react-native-vector-icons/AntDesign';

import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
interface IRenderFriendUI {
  urlAvatar: string | undefined;
  name: string | undefined;
  onPressAddFriend?: (event: GestureResponderEvent) => void;
  onPressReject?: (event: GestureResponderEvent) => void;
  onPressConfirm?: (event: GestureResponderEvent) => void;
  type: string;
  timeStamp?: string;
}
const RenderFriendUI = ({
  urlAvatar,
  name,
  onPressAddFriend,
  onPressConfirm,
  onPressReject,
  type,
  timeStamp,
}: IRenderFriendUI) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={image.background}
        resizeMode="cover"
        style={styles.background}>
        <Header
          StyleHeaderSetting={{
            backgroundColor: 'transparent',
            position: 'absolute',
          }}
          type={IHeaderEnum.Register}
          typePersonal={IHeaderEnum.Personal}
        />
      </ImageBackground>
      <View
        style={[
          styles.body,
          {
            backgroundColor:
              type === IPeronalEnum.Confirm ? 'transparent' : 'white',
          },
        ]}>
        <View style={styles.borderAvatar}>
          <Image source={{uri: urlAvatar}} style={styles.avatar} />
        </View>
        <Text style={styles.userName}>
          {`${name}  `}
          <Icon name={'edit'} size={22} />
        </Text>
        {type === IPeronalEnum.Confirm ? (
          <View style={styles.view}>
            <Text style={styles.text}>
              {`Từ số điện thoại - ${moment(
                timeStamp,
                'MM/DD/YYYY',
              ).fromNow()}`}
            </Text>

            <View style={styles.row}>
              <TouchableOpacity style={[styles.button, styles.reject]}>
                <Text
                  style={[styles.FontFamily, styles.textReject]}
                  onPress={onPressReject}>
                  Từ chối
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirm]}
                onPress={onPressConfirm}>
                <Text style={[styles.FontFamily, styles.textConfirm]}>
                  Đồng ý
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity onPress={onPressAddFriend}>
            <Text>Add frend</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.depcription}>
        Chưa có hoạt động nào. Hãy trò chuyện để hiểu nhau hơn!
      </Text>
    </View>
  );
};

export default RenderFriendUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: windowHeight / 3,
    alignItems: 'center',
  },
  body: {
    alignItems: 'center',
  },
  userName: {
    top: -80,

    fontFamily: fontFamily.RobotoMedium,
    color: Color.DimGray,
    fontSize: FontSize.h4,
  },
  row: {flexDirection: 'row'},
  button: {
    paddingVertical: 8,
    paddingHorizontal: 50,
    marginHorizontal: 5,
    borderRadius: 13,
  },
  FontFamily: {
    fontFamily: 'Poppins-Regular',
    // fontSize: FontSize.h5,
  },
  reject: {
    backgroundColor: '#E6E6E6',
  },
  textReject: {
    color: 'black',
    fontWeight: '500',
  },
  confirm: {
    backgroundColor: Color.confirm,
  },
  textConfirm: {
    color: 'rgb(0,108,254)',
    fontWeight: '500',
  },
  view: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    top: -70,
    borderRadius: 10,
    shadowOffset: {
      width: 5,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: FontSize.h6 * 1.1,
    color: 'gray',
    paddingBottom: 10,
  },
  depcription: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  borderAvatar: {
    position: 'relative',
    top: -85,
    borderWidth: 3,
    borderRadius: 150 / 2,
    borderColor: 'white',
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
  },
});
