import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import {FontSize, Color} from '../constants';
import {IButtonEnum} from '@model/handelConfig';
interface IUIButton {
  onPress: (event: GestureResponderEvent) => void;
  label: string;
  styleUIButton?: ViewStyle;
  type?: string;
  styleUIButtonDisable?: ViewStyle;
  styleLabel?: TextStyle;
}
const UIButton = ({
  label,
  onPress,
  styleUIButton,
  type,
  styleUIButtonDisable,
  styleLabel,
}: IUIButton) => {
  if (type === IButtonEnum.disable) {
    return (
      <TouchableOpacity
        style={[styles.buttondisable, styleUIButtonDisable]}
        onPress={onPress}>
        <Text style={[styles.textdisable, styleLabel]}>{label}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={[styles.button, styleUIButton]} onPress={onPress}>
      <Text style={[styles.text, styleLabel]}>{label}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: Color.primary,
    borderRadius: 50 / 2,
    marginVertical: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttondisable: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Color.notificationValidate,
    borderRadius: 50 / 2,
    marginVertical: 10,
  },
  text: {color: 'white', fontSize: FontSize.h6},
  textdisable: {color: 'black', fontSize: FontSize.h6},
});
export default UIButton;
