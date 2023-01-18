import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Header from '@components/Header';
import {IButtonEnum, IHeaderEnum} from '@model/handelConfig';
import UiValidate from '@components/UiValidate';
import CustumInput from '@components/CustumInput';
import {fontFamily} from '@fonts/Font';
import {Color, FontSize} from '@constants';
import UIButton from '@components/UIButton';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {account} from '@navigation/index';
import {UserNumberPhone} from '../hook/UserNumberPhone';
export const keySaveNumberPhone = 'keySaveNumberPhone';
const Login = () => {
  const navigation = useNavigation<any>();
  const [state, setState] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const isOke = user !== '' && password.length > 5;
  const stateNumber = useContext(UserNumberPhone);
  const saveUser = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(keySaveNumberPhone, jsonValue);
      stateNumber.setNumberPhone(value);
    } catch (e) {
      // throw e;
    }
  };
  const handelAlert = () => {
    if (account.numberPhone !== user) {
      return Alert.alert('Số điện thoại chưa được đăng ký', 'Đăng ký ngay', [
        {
          text: 'Huỷ',
        },
        {
          text: 'Xác Nhận',
          onPress: () =>
            navigation.navigate(RouterName.AuthenStack, {
              screen: RouterName.Register,
            }),
        },
      ]);
    } else if (account.numberPhone === user && account.password !== password) {
      if (state === 2) {
        Alert.alert('Sai mật khẩu', 'Lấy lại mật khẩu ngay?', [
          {
            text: 'Huỷ',
          },
          {
            text: 'Xác Nhận',
            onPress: () =>
              navigation.navigate(RouterName.AuthenStack, {
                screen: RouterName.ForgetPassword,
              }),
          },
        ]);
      } else {
        Alert.alert('Thông báo', 'Sai mật khẩu', [
          {
            text: 'Cancel',
          },
        ]);
      }
    }
  };
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header
          type={IHeaderEnum.Register}
          label={'Đăng nhập'}
          onPress={() => navigation.goBack()}
        />
        <UiValidate
          isValid={true}
          notification={'Vui lòng nhập số điện thoại và mật khẩu để đăng nhập'}
        />
        <View style={styles.textInput}>
          <CustumInput
            onChangText={text => setUser(text)}
            containerTextInput={styles.line}
            placeholder={'Số điện thoại'}
            keyboardType="number-pad"
          />
          <CustumInput
            type={IButtonEnum.disable}
            text={showPassword ? 'HIỆN' : 'ẨN'}
            onChangText={text => setPassword(text)}
            containerTextInput={styles.line}
            onPress={() => setShowPassword(!showPassword)}
            secureTextEntry={showPassword}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(RouterName.AuthenStack, {
              screen: RouterName.ForgetPassword,
            })
          }>
          <Text style={styles.text}>Lấy lại mật khẩu</Text>
        </TouchableOpacity>
        <UIButton
          onPress={() => {
            if (account.numberPhone !== user && account.password !== password) {
              handelAlert();
            } else if (
              account.numberPhone === user &&
              account.password !== password
            ) {
              handelAlert();
              setState(state + 1);
            } else {
              saveUser({
                numberPhone: user,
                password: password,
              });
            }
          }}
          disabled={!isOke}
          type={isOke ? undefined : IButtonEnum.disable}
          styleUIButton={styles.button}
          styleUIButtonDisable={styles.button}
          label={'Đăng Nhập'}
        />
        <View style={{flex: 1}} />
        <TouchableOpacity style={styles.question}>
          <Text style={styles.textBottom}>Các câu hỏi thường gặp</Text>
        </TouchableOpacity>
      </View>
    </TouchableNativeFeedback>
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
  button: {height: 40, marginTop: 20, marginHorizontal: 100},
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