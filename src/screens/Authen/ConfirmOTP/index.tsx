import {Cursor, UIButton} from '@components';
import Header from '@components/Header';
import OTPInput from '@components/OTPInput';
import UiValidate from '@components/UiValidate';
import {Color, FontSize} from '@constants';
import {IHeaderEnum} from '@model/handelConfig';
import {useNavigation} from '@react-navigation/native';
import {useClearByFocusCell} from '@utils/useClearByFocusCell';
import React, {useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {RootState} from '@store';
export const keySaveUser = 'keySaveUser';
export const keySaveAccount = 'keySaveAccount';
import auth from '@react-native-firebase/auth';

// export const {addUser} = counterSlice.actions;
const ConfirmOTP = ({route}: {route: any}) => {
  const navigation = useNavigation<any>();
  const [otp, setOTP] = useState<string>('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOTP,
  });
  const {confirm, numberPhone, isLogin} = route.params;
  const {profileUser} = useSelector((state: RootState) => state.user);
  const {username} = profileUser;

  async function confirmCode(code: string) {
    try {
      const result = await confirm?.confirm(code).then(async (user: any) => {
        if (!isLogin) {
          await firestore()
            .collection('Users')
            .add({
              numberPhone,
              username,
              uid: auth().currentUser?.uid,
            })
            .catch((error: any) => {
              console.log(error);
            });
        }
      });
    } catch (error: any) {
      console.log(error);
      Alert.alert('Thông báo', 'Mã OTP không đúng', [
        {
          text: 'Cancel',
        },
      ]);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header
          type={IHeaderEnum.Register}
          label={'Kích hoạt tài khoản'}
          onPressExit={() => navigation.goBack()}
        />
        <UiValidate
          isValid={true}
          notification={
            'Vui lòng không chia sẻ mã xác thực để tránh mất tài khoản'
          }
        />
        <View style={styles.body}>
          <Text style={styles.text1}>Đang gọi đến số (+84) {numberPhone}</Text>

          <Text style={styles.text2}>Vui lòng bắt máy để nghe mã</Text>
          <OTPInput
            codeCount={6}
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
            <Text style={{color: Color.DimGray}}>Gửi lại mã</Text>
            <TouchableOpacity>
              <Text style={styles.time}>00:25</Text>
            </TouchableOpacity>
          </View>
          <UIButton
            disabled={otp.length !== 6}
            styleUIButton={[
              styles.button,
              {
                backgroundColor:
                  otp.length === 6 ? Color.primary : Color.Darkgray,
              },
            ]}
            onPress={() => {
              confirmCode(otp);
            }}
            label={'Tiếp tục'}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    color: Color.DimGray,
  },
  text2: {
    fontSize: FontSize.h5 * 0.9,
    color: Color.DimGray,
  },
  button: {
    width: '50%',
    height: 40,
  },
  cellRoot: {
    width: 50,
    height: 50,
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
});
export default ConfirmOTP;
