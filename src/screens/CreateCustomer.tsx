import {CustumInput, Header, Option, UIBottom, UiValidate} from '@components';
import {IHeaderEnum} from '@model/handelConfig';
import {UserNumberPhone} from '@navigation/index';
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
  const navigation = useNavigation<any>();
  const [numberPhone, setNumber] = useState<string>('');
  const {setNumberPhone} = useContext(UserNumberPhone);
  const saveNumber = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('customerNumber', jsonValue).then(async () => {
        // await setNumberPhone({value});
      });
    } catch (e) {
      console.log(e);
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
          isValid={true}
        />
        <View style={styles.row}>
          <Option onPress={() => Alert.alert('option')} />
          <CustumInput
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
          />
        </View>
        <View style={{flex: 1}} />
        <UIBottom
          disabled={numberPhone === ''}
          onPress={() => {
            setNumberPhone({numberPhone});
            navigation.navigate(RouterName.AuthenStack, {
              screen: RouterName.ConfirmOTP,
            });
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
