import {StatusBar, UIBottom} from '@components';
import CustomInput from '@components/CustomInput';
import Header from '@components/Header';
import {IHeaderEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {addUser} from '../../../store/slice/user/userSlice';
import {fontFamily} from '../../../assets/fonts/Font';
import {Color, FontSize} from '../../../constants';
import {Constants} from '@components/StatusBar';

const Register = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState<string>('');
  const [focus, setFocus] = useState<boolean>(true);

  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Header type={IHeaderEnum.Register} label={'Tạo tài khoản'} />
      <View style={styles.view1}>
        <Text style={styles.label}>Tên Zalo</Text>
        <CustomInput
          onChangText={text => setName(text)}
          placeholder={'Gồm 2-40 ký tự'}
          textInputStyle={{
            fontSize: FontSize.h5,
            paddingLeft: 10,
            fontFamily: fontFamily.primaryFont,
          }}
          onFocus={() => setFocus(false)}
          onBlur={() => setFocus(true)}
        />
      </View>
      <View style={styles.view2}>
        <Text style={styles.text}>Lưu ý khi đặt tên</Text>
        <View style={styles.row}>
          <Icon name={'circle'} size={8} color={Color.DimGray} />
          <Text style={styles.text}>Không vi phạm</Text>
          <TouchableOpacity>
            <Text style={styles.text2}>Quy định đặt tên trên Zalo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Icon name={'circle'} size={8} color={Color.DimGray} />
          <Text style={styles.text}>
            Nên sử dụng tên thật giúp bạn bè dễ nhận ra bạn
          </Text>
        </View>
      </View>
      <View style={{flex: 1}} />
      {focus && (
        <UIBottom
          color={Color.primary}
          onPress={() => {
            dispatch(addUser({username: name}));
            navigation.navigate(RouterName.CreateCustomer);
          }}
        />
      )}
      <StatusBar
        mode={Constants.statusBar.dark}
        navigation={navigation}
        backgroundColor={Color.primary}
      />
    </View>
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
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
  },
  view1: {
    height: 100,
  },
  text: {
    fontSize: FontSize.h5,
    paddingLeft: 5,
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
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
    fontFamily: fontFamily.primaryFont,
  },
  view2: {
    paddingTop: 10,
    paddingLeft: 15,
  },
});
export default Register;
