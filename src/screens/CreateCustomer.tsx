import {CustumInput, Header, Option, UIBottom, UiValidate} from '@components';
import {IHeaderEnum} from '@model/handelConfig';
import {UserNumber} from '@navigation';
import {RouterName} from '@navigation/rootName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Color} from '../constants';

export default function CreateCustomer() {
  const navigation = useNavigation();
  const [number, setNumber] = useState<string>('');
  const isValid = number.length < 10 && number.length > 0;
  const stateNumber = useContext(UserNumber);

  const saveNumber = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('customerNumber', jsonValue);
    } catch (e) {
      // saving error
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header
          type={IHeaderEnum.Register}
          label={'Nhập thông tin'}
          onPress={() => navigation.goBack()}
        />
        <UiValidate
          notification={'Nhập số điện thoại để tạo tài khoản mới'}
          isValid={isValid ? true : false}
        />
        <View style={styles.row}>
          <Option onPress={() => Alert.alert('option')} />
          <CustumInput
            onChangText={(text: string) => {
              setNumber(text);
            }}
            placeholder={'Số điện thoại'}
            containerTextInput={{borderBottomColor: Color.lineColor}}
            keyboardType={'number-pad'}
          />
        </View>
        <View style={{flex: 1}} />
        <UIBottom
          onPress={() => {
            navigation.navigate(RouterName.ConfirmOTP);
            saveNumber({number});
            stateNumber.setNumber({number});
          }}
        />
      </View>
    </TouchableWithoutFeedback>
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
