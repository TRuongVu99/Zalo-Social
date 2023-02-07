import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Color, FontSize} from '../constants';
import {fontFamily} from '../assets/fonts/Font';
interface IUIBottom {
  onPress: () => void;
  disabled?: boolean;
  color?: string;
}
const UIBottom = ({onPress, disabled, color}: IUIBottom) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingBottom: 20,
        justifyContent: 'space-between',
        marginHorizontal: 20,
      }}>
      <View>
        <Text
          style={{
            fontSize: FontSize.h5,
            fontFamily: fontFamily.primaryFont,
            color: Color.DimGray,
          }}>
          Tiếp tục nghĩa là bạn đồng ý với các
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: Color.primary,
              fontSize: FontSize.h5,
              fontFamily: fontFamily.primaryFont,
            }}>
            điều khoản sử dụng Zalo
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Icon name={'arrow-right'} size={26} color={color} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({});
export default UIBottom;
