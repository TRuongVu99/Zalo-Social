import Header from '@components/Header';
import {Color, FontSize, image} from '@constants';
import {fontFamily} from '@fonts/Font';
import {IButtonEnum, IHeaderEnum, IPeronalEnum} from '@model/handelConfig';
import {windowHeight} from '@utils/Dimensions';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon} from '@icon/index';
interface IRenderFriendUI {
  urlAvatar: string | undefined;
  name: string | undefined;
  onPressAddFriend?: (event: GestureResponderEvent) => void;
  onPressReject?: (event: GestureResponderEvent) => void;
  onPressConfirm?: (event: GestureResponderEvent) => void;
  onPressMessage?: (event: GestureResponderEvent) => void;
  onPressUnFriend?: (event: GestureResponderEvent) => void;
  type: string;
  timeStamp?: string;
  typeUnFriend?: string;
}
const RenderFriendUI = ({
  urlAvatar,
  name,
  onPressAddFriend,
  onPressConfirm,
  onPressReject,
  type,
  timeStamp,
  onPressMessage,
  typeUnFriend,
  onPressUnFriend,
}: IRenderFriendUI) => {
  const inset = useSafeAreaInsets();
  const types = type === IPeronalEnum.Confirm || type === IButtonEnum.disable;
  return (
    <View style={styles.container}>
      {types && (
        <TouchableOpacity
          style={[styles.button, styles.message, {marginBottom: inset.bottom}]}
          onPress={onPressMessage}>
          <IconAntDesign name={'message1'} size={20} color={Color.blue} />
          <Text style={styles.textMessage}>Nhắn tin</Text>
        </TouchableOpacity>
      )}
      <ImageBackground
        source={image.background}
        resizeMode="cover"
        style={styles.background}>
        <Header
          StyleHeaderSetting={{
            backgroundColor: 'transparent',
            paddingVertical: 40,
            paddingTop: Platform.OS === 'android' ? 40 : inset.top * 1.15,
          }}
          type={IHeaderEnum.Register}
          typePersonal={IHeaderEnum.Personal}
        />
      </ImageBackground>
      <View style={[styles.body]}>
        <View style={styles.borderAvatar}>
          <Image source={{uri: urlAvatar}} style={styles.avatar} />
        </View>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Text style={styles.userName}>{name}</Text>
          <IconAntDesign name={'edit'} size={22} style={styles.edit} />
        </TouchableOpacity>
        {type === IPeronalEnum.Confirm && (
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
        )}
        {type === IPeronalEnum.Confirm && (
          <Text style={styles.depcription}>
            Chưa có hoạt động nào. Hãy trò chuyện để hiểu nhau hơn!
          </Text>
        )}
        {type === IPeronalEnum.AddFriend && (
          <View style={[styles.row, {top: -70}]}>
            <TouchableOpacity
              style={[
                styles.message2,
                {
                  paddingHorizontal:
                    typeUnFriend === IPeronalEnum.UnFriend ? 70 : 100,
                },
              ]}
              onPress={onPressMessage}>
              <IconAntDesign name={'message1'} size={20} color={Color.blue} />

              <Text style={[styles.textMessage, {color: Color.blue}]}>
                Nhắn tin
              </Text>
            </TouchableOpacity>
            {typeUnFriend === IPeronalEnum.AddFriend && (
              <TouchableOpacity
                style={styles.addFriend}
                onPress={onPressAddFriend}>
                <Image source={Icon.addUser} style={{width: 18, height: 18}} />
              </TouchableOpacity>
            )}
            {typeUnFriend === IPeronalEnum.UnFriend && (
              <TouchableOpacity
                style={styles.addFriend}
                onPress={onPressUnFriend}>
                <Text>Huỷ kết bạn</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
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
    paddingHorizontal: 55,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  FontFamily: {
    fontFamily: fontFamily.PoppinsRegular,
    // fontSize: FontSize.h5,
  },
  reject: {
    backgroundColor: '#E6E6E6',
  },
  textReject: {
    color: 'black',
  },
  confirm: {
    backgroundColor: Color.confirm,
  },
  textConfirm: {
    color: 'rgb(0,108,254)',
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
    marginBottom: 30,
  },
  text: {
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: FontSize.h6 * 1.1,
    color: 'gray',
    paddingBottom: 10,
  },
  depcription: {
    fontFamily: fontFamily.PoppinsRegular,
    textAlign: 'center',
    paddingHorizontal: 20,
    top: -65,
    color: 'gray',
  },
  borderAvatar: {
    position: 'relative',
    borderWidth: 3,
    borderRadius: 150 / 2,
    borderColor: 'white',
    alignSelf: 'center',
    top: -85,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
  },
  edit: {top: -80, position: 'absolute', right: -25},
  message: {
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 10 : 30,
    right: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 50,
  },
  textMessage: {
    fontFamily: fontFamily.SanFranciscoDisplayMedium,
    color: Color.DimGray,
    fontWeight: '500',
    paddingLeft: 5,
  },
  message2: {
    flexDirection: 'row',
    backgroundColor: Color.confirm,
    paddingHorizontal: 100,
    alignItems: 'center',
    borderRadius: 40,
  },
  addFriend: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 11,
    marginLeft: 10,
    borderRadius: 40,
  },
});
