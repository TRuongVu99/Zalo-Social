import CustumInput from '@components/CustumInput';
import Header from '@components/Header';
import UIButton from '@components/UIButton';
import UiValidate from '@components/UiValidate';
import {Color, FontSize} from '@constants';
import {fontFamily} from '@fonts/Font';
import {IButtonEnum, IHeaderEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '@store/index';
import React, {useState} from 'react';

import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
const Login = () => {
  // const [state, setState] = useState<number>(0);
  // const [showPassword, setShowPassword] = useState<boolean>(true);
  // const [account, setAccount] = useStateCallback<any>({
  //   numberPhone: '',
  //   password: '',
  // });
  // const [user, setUser] = useState<string>(account.numberPhone);
  // const [password, setPassword] = useState<string>(account.password);
  // const isOke =
  //   (user !== '' && password.length > 5) ||
  //   (account.numberPhone !== '' && password.length !== 0);
  // console.log(isOke);

  // const stateUser = useContext(UserContext);
  // const saveUser = async (value: any) => {
  //   try {
  //     const jsonValue = JSON.stringify(value);
  //     await AsyncStorage.setItem(keySaveUser, jsonValue);
  //     stateUser.setUser(value);
  //   } catch (e) {
  //     throw e;
  //   }
  // };
  // const getAccount = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem(keySaveAccount);
  //     return jsonValue !== null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     throw e;
  //   }
  // };
  // useEffect(() => {
  //   async function getData() {
  //     const data = await getAccount();
  //     setAccount(data);
  //     setUser(data.numberPhone);
  //   }
  //   getData();
  // }, []);

  // const handelAlert = () => {
  //   if (account.numberPhone !== user) {
  //     return Alert.alert(
  //       `Số điện thoại ${user} chưa được đăng ký`,
  //       'Đăng ký ngay',
  //       [
  //         {
  //           text: 'Huỷ',
  //         },
  //         {
  //           text: 'Xác Nhận',
  //           onPress: () => navigation.navigate(RouterName.Register),
  //         },
  //       ],
  //     );
  //   } else if (account.numberPhone === user && account.password !== password) {
  //     if (state >= 2) {
  //       Alert.alert('Sai mật khẩu', 'Lấy lại mật khẩu ngay?', [
  //         {
  //           text: 'Huỷ',
  //         },
  //         {
  //           text: 'Xác Nhận',
  //           onPress: () => navigation.push(RouterName.ForgetPassword),
  //         },
  //       ]);
  //     } else if (password.length === 0) {
  //       Alert.alert('Thông báo', 'Chưa nhập mật khẩu', [
  //         {
  //           text: 'Cancel',
  //         },
  //       ]);
  //     } else {
  //       Alert.alert('Thông báo', 'Sai mật khẩu', [
  //         {
  //           text: 'Cancel',
  //         },
  //       ]);
  //     }
  //   }
  // };
  const navigation = useNavigation<any>();
  const [focus, setFocus] = useState<boolean>(true);
  const [confirm, setConfirm] = useState<any>(null);
  const [numberPhone, setNumber] = useState<string>('');
  const {profileUser} = useSelector((state: RootState) => state.user);
  console.log(profileUser.username);
  const formartNumberPhone: string =
    numberPhone[0] === '0'
      ? `+84 ${numberPhone.slice(1, numberPhone.length)}`
      : `+84 ${numberPhone}`;
  async function signInWithPhoneNumber(phoneNumber: string) {
    try {
      const confirmation = await auth()
        .signInWithPhoneNumber(phoneNumber)
        .then(a => {
          navigation.navigate(RouterName.ConfirmOTP, {
            numberPhone: numberPhone,
            confirm: a,
            isLogin: true,
          });
        });
      setConfirm(confirmation);
    } catch {}
  }
  console.log(Keyboard);
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
