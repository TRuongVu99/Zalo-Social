import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Keyboard,
  Alert,
  GestureResponderEvent,
} from 'react-native';
import React, {useState} from 'react';
import Header from '@components/Header';
import {IButtonEnum, IHeaderEnum} from '@model/handelConfig';
import UiValidate from '@components/UiValidate';
import CustumInput from '@components/CustumInput';
import UIButton from '@components/UIButton';
interface IForgetPassword {
  navigation: any;
}
export const createButtonAlert = (
  title: string,
  message: string | undefined,
  handelCancel?: (event: GestureResponderEvent) => void,
  handelConfirm?: (event: GestureResponderEvent) => void,
) =>
  Alert.alert(title, message, [
    {
      text: 'Huỷ',
      onPress: () => handelCancel,
    },
    {
      text: 'Xác Nhận',
      onPress: () => handelConfirm,
    },
  ]);
const ForgetPassword = ({navigation}: IForgetPassword) => {
  const [numberPhone, setNumberPhone] = useState<string>('');
  const isOke = numberPhone.length > 9;
  const title = 'Xác nhận số điện thoại';
  const message = 'Mã kích hoạt sẽ được gửi tới số điện thoại này';
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header
          type={IHeaderEnum.Register}
          label={'Lấy lại mật khẩu'}
          onPress={() => navigation.goBack()}
        />
        <UiValidate
          isValid={true}
          notification={'Nhập số điện thoại để nhận mã xác nhận '}
        />
        <CustumInput
          onChangText={text => setNumberPhone(text)}
          placeholder={'Số điện thoại'}
          keyboardType="number-pad"
          containerTextInput={{marginTop: 20}}
        />
        <UIButton
          onPress={() => createButtonAlert(title, message)}
          disabled={!isOke}
          label={'Tiếp tục'}
          type={isOke ? undefined : IButtonEnum.disable}
          styleUIButton={styles.UIButton}
          styleUIButtonDisable={styles.UIButton}
        />
      </View>
    </TouchableNativeFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  UIButton: {
    marginHorizontal: 100,
    height: 40,
    marginVertical: 20,
  },
});
export default ForgetPassword;
