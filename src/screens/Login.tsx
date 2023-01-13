import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Keyboard,
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
// import {UserNumberPhone} from '@navigation/index';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation<any>();
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [user, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const isOke = user !== '' && password.length > 6;

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
          onPress={() => navigation.navigate(RouterName.ForgetPassword)}>
          <Text style={styles.text}>Lấy lại mật khẩu</Text>
        </TouchableOpacity>
        <UIButton
          onPress={() => {
            navigation.navigate(RouterName.BottomTabBar);
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
