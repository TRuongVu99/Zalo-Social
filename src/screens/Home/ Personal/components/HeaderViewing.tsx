import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {fontFamily} from '@fonts/Font';
import FontSize from '@constants/FontSize';

interface IHeaderViewing {
  onPressClose?: (event: GestureResponderEvent) => void;
}

const HeaderViewing = ({onPressClose}: IHeaderViewing) => {
  const inset = useSafeAreaInsets();
  return (
    <View style={{paddingTop: inset.top}}>
      <TouchableOpacity onPress={onPressClose}>
        <Text
          style={{
            color: 'white',
            fontFamily: fontFamily.SanFranciscoDisplayMedium,
            fontSize: FontSize.h4 * 0.9,
            marginVertical: 10,
            marginHorizontal: 10,
          }}>
          Đóng
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderViewing;

const styles = StyleSheet.create({});
