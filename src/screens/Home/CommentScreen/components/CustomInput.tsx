import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Color from '@constants/Color';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import Platform from '@utils/Platform';
import {fontFamily} from '@fonts/Font';
import FontSize from '@constants/FontSize';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface ICustomInput {
  onPress: () => void;
  onChangeText: (text: string) => void;
  commentApp: string;
  paddingBottom: boolean;
}
const CustomInput = ({
  onChangeText,
  onPress,
  commentApp,
  paddingBottom,
}: ICustomInput) => {
  const {bottom} = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.viewTextInput,
        {paddingBottom: !paddingBottom ? bottom * 1.2 : bottom * 0.3},
      ]}>
      <TouchableOpacity>
        <IconSimple name={'emotsmile'} size={26} color={Color.DimGray} />
      </TouchableOpacity>
      <TextInput
        value={commentApp}
        multiline={true}
        placeholder="Nhập bình luận"
        onChangeText={onChangeText}
        style={styles.textInput}
      />
      <TouchableOpacity style={{marginHorizontal: 20}}>
        <IconSimple name={'picture'} size={26} color={Color.DimGray} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <IconIonicons
          name={'send'}
          size={26}
          color={commentApp !== '' ? Color.primary : Color.disable}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  textContents: {
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h4 * 0.9,
    color: 'white',
  },
  iconLeft: {flexDirection: 'row', flex: 1, alignItems: 'center'},
  textInput: {
    flex: 1,
    paddingVertical: Platform.isIos ? 5 : 10,
    fontSize: FontSize.h5,
    paddingHorizontal: 10,
  },
  viewTextInput: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Platform.isIos ? 10 : 0,
    borderTopWidth: 0.2,
    paddingHorizontal: 10,
    borderTopColor: Color.Darkgray,
  },
});
