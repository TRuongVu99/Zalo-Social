import {Color, FontSize} from '@constants';
import {fontFamily} from '@fonts/Font';

import React from 'react';
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
interface IRenderSelectFont {
  onPress: (event: GestureResponderEvent) => void;
  item: any;
  isSelectFont: number;
}
const RenderSelectFont = ({onPress, item, isSelectFont}: IRenderSelectFont) => {
  return (
    <TouchableOpacity
      style={[
        styles.touch,
        {
          borderColor:
            isSelectFont === item.id
              ? Color.primary
              : Color.notificationValidate,
        },
      ]}
      onPress={onPress}>
      <Text
        style={{
          fontFamily: item.font,
          fontSize: FontSize.h6,
          color: item.colorText,
        }}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

export default RenderSelectFont;
const styles = StyleSheet.create({
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 8 : 5,
    borderWidth: 1,
    borderColor: Color.Darkgray,
    borderRadius: 10,
  },
});
