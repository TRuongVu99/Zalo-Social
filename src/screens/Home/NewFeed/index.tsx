import Header from '@components/Header';
import {Icon} from '@icon/index';
import {IHeaderEnum} from '@model/handelConfig';
import React from 'react';
import {
  Keyboard,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
interface IPhoneBook {
  navigation: any;
}
const NewFeed = ({navigation}: IPhoneBook) => {
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header
          placeholder={'Tìm kiếm'}
          type={IHeaderEnum.Home}
          nameIconRight2={Icon.notification}
          nameIconRight1={Icon.create}
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
export default NewFeed;
