import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
  TextInputProps,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React, {RefAttributes} from 'react';
import {IButtonEnum} from '@model/handelConfig';
import {fontFamily} from '../../assets/fonts/Font';
import {Color} from '../../constants';
type OmitStyle<T extends {style?: any}> = Omit<T, 'style'>;
interface ICustomInput
  extends OmitStyle<TextInputProps>,
    RefAttributes<TextInput> {
  onChangText: (value?: any) => void;
  textInputStyle?: StyleProp<TextStyle>;
  containerTextInput?: ViewStyle;
  type?: string;
  onPress?: (event: GestureResponderEvent) => void;
  text?: string;
}
const CustumInput: React.FC<ICustomInput> = ({
  onChangText,
  textInputStyle,
  containerTextInput,
  type,
  onPress,
  text,
  ...rest
}) => {
  return (
    <View style={[styles.customInput, containerTextInput]}>
      <TextInput
        onChangeText={onChangText}
        style={[styles.textInput, textInputStyle]}
        {...rest}
      />
      {type === IButtonEnum.disable && (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  customInput: {
    height: 50,
    borderBottomWidth: 0.5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  textInput: {
    flex: 1,
    // paddingTop: 15,
  },
  text: {fontFamily: fontFamily.primaryFont, color: Color.DimGray},
  button: {},
});
export default CustumInput;
