import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Keyboard,
  Alert,
  TouchableNativeFeedbackBase,
} from 'react-native';
import React from 'react';
import Header from '@components/Header';
import {IHeaderEnum} from '@model/handelConfig';
import {Icon} from '@icon/index';
import {RouterName} from '@navigation/rootName';
interface IPhoneBook {
  navigation: any;
}
const Phonebook = ({navigation}: IPhoneBook) => {
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header
          placeholder={'Tìm Kiếm'}
          type={IHeaderEnum.Home}
          nameIconRight2={Icon.addfriend}
          onFocus={() => navigation.navigate(RouterName.OnBoarding)}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Phonebook;
