import {
  CustomInput,
  Header,
  Option,
  StatusBar,
  UIBottom,
  UiValidate,
} from '@components';
import {IHeaderEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../../../store';
import {Color} from '../../../constants';
import {addUser} from '../../../store/slice/user/userSlice';
import {Constants} from '@components/StatusBar';

export default function CreateCustomer({route}: {route: any}) {
  const navigation = useNavigation<any>();
  const {profileUser} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [numberPhone, setNumber] = useState<string>('');
  const [confirm, setConfirm] = useState<any>(null);
  const [focus, setFocus] = useState<boolean>(true);

  const disable = numberPhone.length < 10;

  const formartNumberPhone: string =
    numberPhone[0] === '0'
      ? `+84 ${numberPhone.slice(1, numberPhone.length)}`
      : `+84 ${numberPhone}`;
  async function signInWithPhoneNumber(phoneNumber: string) {
    try {
      const confirmation = await auth()
        .signInWithPhoneNumber(phoneNumber)
        .then(a => {
          dispatch(addUser({...profileUser, phoneNumber: numberPhone}));
          navigation.navigate(RouterName.ConfirmOTP, {
            numberPhone: numberPhone,
            confirm: a,
          });
        });
      setConfirm(confirmation);
    } finally {
    }
  }

  return (
    <View style={styles.container}>
      <Header type={IHeaderEnum.Register} label={'Nhập thông tin'} />
      <UiValidate
        notification={'Nhập số điện thoại để tạo tài khoản mới'}
        isValid={true}
      />
      <View style={styles.row}>
        <Option onPress={() => Alert.alert('option')} />
        <CustomInput
          onChangText={(text: string) => {
            setNumber(text);
          }}
          placeholder={'Số điện thoại'}
          containerTextInput={{
            borderBottomColor: Color.lineColor,
            flex: 1,
          }}
          keyboardType={'number-pad'}
          maxLength={10}
          onFocus={() => setFocus(false)}
          onBlur={() => setFocus(true)}
        />
      </View>
      <View style={{flex: 1}} />
      {focus && (
        <UIBottom
          disabled={disable}
          color={disable ? Color.Darkgray : Color.primary}
          onPress={() => {
            signInWithPhoneNumber(formartNumberPhone);
          }}
        />
      )}
      <StatusBar
        mode={Constants.statusBar.light}
        navigation={navigation}
        backgroundColor={Color.primary}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text1: {
    color: Color.lineColor,
  },
  row: {
    flexDirection: 'row',
  },
});
