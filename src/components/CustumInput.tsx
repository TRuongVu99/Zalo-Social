import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
} from 'react-native';
import React from 'react';
type ICustomInput = {
  onChangText: (value?: any) => void;
  placeholder?: string;
  textInputStyle?: StyleProp<TextStyle>;
  containerTextInput?: ViewStyle;
  keyboardType?: KeyboardTypeOptions | undefined;
  value?: string;
};
const CustumInput: React.FC<ICustomInput> = ({
  onChangText,
  placeholder,
  textInputStyle,
  containerTextInput,
  keyboardType,
  value,
}) => {
  return (
    <View style={[styles.customInput, containerTextInput]}>
      <TextInput
        onChangeText={onChangText}
        style={[styles.textInput, textInputStyle]}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  customInput: {
    flex: 1,
    height: 50,
    borderBottomWidth: 0.5,
    // borderBackgroundColor: 'green',
    marginHorizontal: 10,
  },
  textInput: {
    paddingTop: 19,
  },
});
export default CustumInput;
