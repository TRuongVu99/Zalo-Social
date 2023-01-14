import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Header from '@components/Header';
import {IHeaderEnum} from '@model/handelConfig';
import {useNavigation} from '@react-navigation/native';
import UiValidate from '@components/UiValidate';
import OTPInput from '@components/OTPInput';
import {Color, FontSize} from '@constants';
import {RouterName} from '@navigation/rootName';
import {useClearByFocusCell} from '@utils/useClearByFocusCell';
import {Cursor, UIButton} from '@components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../hook/UserContext';
export const keySaveUser = 'keySaveUser';

const ConfirmOTP = () => {
  const navigation = useNavigation<any>();
  const {user, setUser} = useContext(UserContext);

  const [otp, setOTP] = useState<string>('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOTP,
  });
  const saveNumber = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(keySaveUser, jsonValue);
      setUser(value);
    } catch (e) {
      throw e;
    }
  };
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header
          type={IHeaderEnum.Register}
          label={'Kích hoạt tài khoản'}
          onPress={() => navigation.goBack()}
        />
        <UiValidate
          isValid={true}
          notification={
            'Vui lòng không chia sẻ mã xác thực để tránh mất tài khoản'
          }
        />
        <View style={styles.body}>
          <Text style={styles.text1}>
            Đang gọi đến số (84) {user.userName} {user.numberPhone}
            {/* {stateNumber.numberPhone} */}
          </Text>

          <Text style={styles.text2}>Vui lòng bắt máy để nghe mã</Text>
          <OTPInput
            codeCount={4}
            value={otp}
            onChangeText={text => setOTP(text)}
            keyboardType={'number-pad'}
            renderValue={({index, symbol, isFocused}) => (
              <View
                // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}>
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
          <View style={{flexDirection: 'row', paddingVertical: 30}}>
            <Text>Gửi lại mã</Text>
            <TouchableOpacity>
              <Text style={styles.time}>00:25</Text>
            </TouchableOpacity>
          </View>
          <UIButton
            disabled={otp.length !== 4}
            styleUIButton={[
              styles.button,
              {
                backgroundColor:
                  otp.length === 4 ? Color.primary : Color.Darkgray,
              },
            ]}
            onPress={() => navigation.navigate(RouterName.BottomTabBar)}
            label={'Tiếp tục'}
          />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    color: Color.primary,
    paddingLeft: 5,
  },
  text1: {
    fontSize: FontSize.h4,
    padding: 5,
  },
  text2: {
    fontSize: FontSize.h5 * 0.9,
  },
  button: {
    width: '50%',
    height: 40,
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
});
export default ConfirmOTP;
