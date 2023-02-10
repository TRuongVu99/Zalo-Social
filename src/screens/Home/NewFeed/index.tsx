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
