import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Color, FontSize} from '../constants';
interface IUIBottom {
  onPress: () => void;
}
const UIBottom = ({onPress}: IUIBottom) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingBottom: 20,
        justifyContent: 'space-between',
        marginHorizontal: 20,
      }}>
      <View>
        <Text style={{fontSize: FontSize.h5}}>
          Tiếp tục nghĩa là bạn đồng ý với các
        </Text>
        <TouchableOpacity>
          <Text style={{color: Color.lineColor, fontSize: FontSize.h5}}>
            điều khoản sử dụng Zalo
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Icon name={'arrow-right'} size={26} color={Color.primary} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({});
export default UIBottom;
