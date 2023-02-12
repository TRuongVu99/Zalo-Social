import Color from '@constants/Color';
import FontSize from '@constants/FontSize';
import {fontFamily} from '@fonts/Font';
import {IRequestEnum} from '@model/handelConfig';

import React from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
interface IRenderItem {
  item: any;
  type: string;
  onPressReject?: (event: GestureResponderEvent) => void;
  onPressConfirm?: (event: GestureResponderEvent) => void;
  onPressUser?: (event: GestureResponderEvent) => void;
  onPressReCall?: (event: GestureResponderEvent) => void;
  onPressUserRecall: (event: GestureResponderEvent) => void;
}
const RenderUI = ({
  type,
  item,
  onPressReject,
  onPressConfirm,
  onPressUser,
  onPressReCall,
  onPressUserRecall,
}: IRenderItem) => {
  switch (type) {
    case IRequestEnum.Received: {
      return (
        <TouchableOpacity style={[styles.row]} onPress={onPressUser}>
          <Image
            source={{
              uri: item.avatar,
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={[styles.FontFamily, styles.userName]}>
              {item.username}
            </Text>
            <View style={styles.row}>
              <Text style={styles.text}>{item.timeStamp}</Text>
              <Text style={styles.text}> - Tìm kiếm số điện thoại</Text>
            </View>
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
        </TouchableOpacity>
      );
    }
    case IRequestEnum.Sent: {
      return (
        <TouchableOpacity
          style={styles.containerSent}
          onPress={onPressUserRecall}>
          <Image
            source={{
              uri: item.avatar,
            }}
            style={[styles.avatar]}
          />
          <View
            style={[styles.containerSent, {justifyContent: 'space-between'}]}>
            <View>
              <Text style={[styles.FontFamily, styles.userName]}>
                {item.username}
              </Text>
              <View>
                <Text style={styles.text}>Có thể bạn quen</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.buttonRecall}>
              <Text
                style={[styles.FontFamily, styles.textReject]}
                onPress={onPressReCall}>
                Thu Hồi
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
    default:
      return null;
  }
};

export default RenderUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerSent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    marginHorizontal: 18,
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 40,
    marginRight: 10,
    borderRadius: 13,
    marginBottom: 10,
  },
  FontFamily: {
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h5,
  },
  reject: {
    backgroundColor: '#E6E6E6',
  },
  textReject: {
    color: 'black',
    fontFamily: fontFamily.SanFranciscoDisplayMedium,
  },
  confirm: {
    backgroundColor: Color.confirm,
  },
  textConfirm: {
    color: 'rgb(0,108,254)',
    fontFamily: fontFamily.SanFranciscoDisplayMedium,
  },
  userName: {
    fontSize: FontSize.h5 * 1.15,
    color: Color.DimGray,
  },
  text: {
    fontFamily: fontFamily.primaryFont,
    paddingBottom: 10,
    color: 'gray',
  },
  buttonRecall: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#E6E6E6',
    marginRight: 18,
  },
});
