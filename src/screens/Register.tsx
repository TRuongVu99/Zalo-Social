import {UIBottom} from '@components';
import CustumInput from '@components/CustumInput';
import Header from '@components/Header';
import {IHeaderEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Color, FontSize} from '../constants';

const Register = () => {
  const navigation = useNavigation<any>();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header
          type={IHeaderEnum.Register}
          label={'Tạo tài khoản'}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.view1}>
          <Text style={styles.label}>Tên Zalo</Text>
          <CustumInput
            onChangText={() => {}}
            placeholder={'Gồm 2-40 ký tự'}
            textInputStyle={{fontSize: FontSize.h5, paddingLeft: 10}}
          />
        </View>
        <View style={styles.view2}>
          <Text style={styles.text}>Lưu ý khi đặt tên</Text>
          <View style={styles.row}>
            <Icon name={'circle'} size={8} />
            <Text style={styles.text}>Không vi phạm</Text>
            <TouchableOpacity>
              <Text style={styles.text2}>Quy định đặt tên trên Zalo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Icon name={'circle'} size={8} />
            <Text style={styles.text}>
              Nên sử dụng tên thật giúp bạn bè dễ nhận ra bạn
            </Text>
          </View>
        </View>
        <View style={{flex: 1}} />
        <UIBottom
          onPress={() => {
            navigation.navigate(RouterName.CreateCustomer);
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: FontSize.h3,
    paddingLeft: 10,
    paddingTop: 20,
  },
  view1: {
    height: 100,
  },
  text: {
    fontSize: FontSize.h5,
    paddingLeft: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  text2: {
    color: Color.primary,
    fontSize: FontSize.h5,
    paddingLeft: 5,
  },
  view2: {
    paddingTop: 10,
    paddingLeft: 15,
  },
});
export default Register;
