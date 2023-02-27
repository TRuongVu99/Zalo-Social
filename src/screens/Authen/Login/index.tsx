import CustumInput from '@components/CustumInput';
import Header from '@components/Header';
import UIButton from '@components/UIButton';
import UiValidate from '@components/UiValidate';
import {Color, FontSize} from '@constants';
import {fontFamily} from '@fonts/Font';
import {IButtonEnum, IHeaderEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';

import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
const Login = ({route}: {route: any}) => {
  console.log(route.params);
  const navigation = useNavigation<any>();
  const [focus, setFocus] = useState<boolean>(true);
  const [numberPhone, setNumber] = useState<string>('');
  const formartNumberPhone: string =
    numberPhone[0] === '0'
      ? `+84${numberPhone.slice(1, numberPhone.length)}`
      : `+84${numberPhone}`;
  async function signInWithPhoneNumber(phoneNumber: string) {
    try {
      await auth()
        .signInWithPhoneNumber(phoneNumber)
        .then(a => {
          navigation.navigate(RouterName.ConfirmOTP, {
            numberPhone: numberPhone,
            confirm: a,
            isLogin: true,
          });
          console.log('Success');
        });
    } catch (err) {
      Alert.alert(`Số điện thoại ${numberPhone} chưa đăng ký`, 'Đăng ký ngay', [
        {
          text: 'Huỷ',
        },
        {
          text: 'Đăng ký',
        },
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <Header type={IHeaderEnum.Register} label={'Đăng nhập'} />
      <UiValidate
        isValid={true}
        notification={'Vui lòng nhập số điện thoại và mật khẩu để đăng nhập'}
      />
      <View style={styles.textInput}>
        <CustumInput
          onChangText={text => setNumber(text)}
          containerTextInput={styles.line}
          placeholder={'Số điện thoại'}
          keyboardType="number-pad"
          onFocus={() => setFocus(false)}
          onBlur={() => setFocus(true)}
          maxLength={10}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate(RouterName.ForgetPassword)}>
        <Text style={styles.text}>Lấy lại mật khẩu</Text>
      </TouchableOpacity>
      <UIButton
        onPress={() => signInWithPhoneNumber(formartNumberPhone)}
        disabled={!numberPhone}
        type={numberPhone ? undefined : IButtonEnum.disable}
        styleUIButton={styles.button}
        styleUIButtonDisable={styles.button}
        label={'Gửi OTP'}
      />
      <View style={{flex: 1}} />
      {focus && (
        <TouchableOpacity style={styles.question}>
          <Text style={styles.textBottom}>Các câu hỏi thường gặp</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    borderBottomColor: 'gray',
  },
  textInput: {
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontFamily: fontFamily.primaryFont,
    paddingLeft: 10,
    color: Color.primary,
    fontSize: FontSize.h5,
  },
  button: {height: 40, marginTop: 20, marginHorizontal: 140},
  textBottom: {
    paddingBottom: 30,
    textDecorationLine: 'underline',
    borderBottomWidth: 1,
    textAlign: 'center',
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
  },
  view: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  question: {},
});
export default Login;
