import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import React from 'react';
import {FontSize, Color} from '../constants';
import {IButtonEnum} from '@model/handelConfig';
interface IUIButton {
  onPress: (event: GestureResponderEvent) => void;
  label: string;
  styleUIButton?: StyleProp<TextStyle>;
  type?: string | undefined;
  styleUIButtonDisable?: ViewStyle;
  styleLabel?: TextStyle;
  disabled?: boolean;
}
const UIButton = ({
  label,
  onPress,
  styleUIButton,
  type,
  styleUIButtonDisable,
  styleLabel,
  disabled,
}: IUIButton) => {
  if (type === IButtonEnum.disable) {
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.buttondisable, styleUIButtonDisable]}
        onPress={onPress}>
        <Text style={[styles.textdisable, styleLabel]}>{label}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, styleUIButton]}
      onPress={onPress}>
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
    backgroundColor: Color.Gainsboro,
    borderRadius: 50 / 2,
    marginVertical: 10,
  },
  text: {color: 'white', fontSize: FontSize.h6},
  textdisable: {color: 'black', fontSize: FontSize.h6},
});
export default UIButton;
