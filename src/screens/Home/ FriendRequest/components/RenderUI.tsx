import Color from '@constants/Color';
import FontSize from '@constants/FontSize';
import {fontFamily} from '@fonts/Font';
import moment from 'moment';
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
  onPressReject?: (event: GestureResponderEvent) => void;
  onPressConfirm?: (event: GestureResponderEvent) => void;
  onPressUser?: (event: GestureResponderEvent) => void;
}
const RenderUI = ({
  item,
  onPressReject,
  onPressConfirm,
  onPressUser,
}: IRenderItem) => {
  console.log(moment('02/10/2023', 'MM/DD/YYYY').fromNow());

  return (
    <TouchableOpacity style={{flexDirection: 'row'}} onPress={onPressUser}>
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
            <Text style={[styles.FontFamily, styles.textConfirm]}>Đồng ý</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    marginHorizontal: 18,
  },
  row: {flexDirection: 'row'},
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
});
