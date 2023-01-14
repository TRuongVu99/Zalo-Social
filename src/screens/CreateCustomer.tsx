import {CustumInput, Header, Option, UIBottom, UiValidate} from '@components';
import {IHeaderEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {UserContext} from '../hook/UserContext';
import {Color} from '../constants';

export default function CreateCustomer() {
  const navigation = useNavigation<any>();
  const [numberPhone, setNumber] = useState<string>('');
  const {setUser} = useContext(UserContext);

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
            setUser({numberPhone: numberPhone});
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
