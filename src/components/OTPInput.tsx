import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';
import React, {ReactNode, RefAttributes, useState} from 'react';
import {FontSize} from '../constants';

interface RenderCellOptions {
  symbol: string;
  index: number;
  isFocused: boolean;
}
type OmitStyle<T extends {style?: any}> = Omit<T, 'style'>;

interface IOTPInput
  extends OmitStyle<TextInputProps>,
    RefAttributes<TextInput> {
  value: string;
  codeCount: number;
  renderValue: (options: RenderCellOptions) => ReactNode;
}

const OTPInput = ({value, codeCount, renderValue, ...rest}: IOTPInput) => {
  const [isFoucse, setIsFocuse] = useState<boolean>(false);

  const onFocuseInput = () => {
    setIsFocuse(true);
  };
  const onBlurInput = () => {
    setIsFocuse(false);
  };

  const truncateString = (
    codeValue: string,
    codeLength: number,
  ): Array<string> => codeValue.substr(0, codeLength).split('');

  const emptySymbols = (codeLength: number) =>
    new Array<string>(codeLength).fill('');

  const getSymbols = (codeValue: string, codeLength: number) =>
    new Array<string>()
      .concat(truncateString(codeValue, codeLength))
      .concat(emptySymbols(codeLength))
      .slice(0, codeLength);
  const cells = getSymbols(value || '', codeCount).map(
    (symbol, index, symbols) => {
      const isFirstEmptySymbol = symbols.indexOf('') === index;

      return renderValue({
        index,
        symbol,
        isFocused: isFoucse && isFirstEmptySymbol,
      });
    },
  );
  return (
    <View style={styles.codeFiledRoot}>
      <Text>{cells}</Text>

      <TextInput
        disableFullscreenUI
        caretHidden={true}
        spellCheck={false}
        autoCorrect={false}
        blurOnSubmit={false}
        clearButtonMode="never"
        autoCapitalize="characters"
        underlineColorAndroid="transparent"
        maxLength={codeCount}
        onBlur={onBlurInput}
        onFocus={onFocuseInput}
        value={value}
        style={styles.textInput}
        {...rest}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  textInput: {
    ...StyleSheet.absoluteFillObject,
    // Hide <TextInput/> to simulate that user will press into a cell
    opacity: 0.01,
    // Each user press into <TextInput/> should always set the cursor on the end of a text value
    fontSize: 1,
  },
  codeFiledRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
export default OTPInput;
