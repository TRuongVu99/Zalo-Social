import {View, Text, Keyboard, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableNativeFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@icon/index';
import {IHeaderEnum} from '@model/handelConfig';
import Header from '@components/Header';

const SearchScreen = () => {
  const navigation = useNavigation();
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header
          placeholder={'Tìm kiếm'}
          type={IHeaderEnum.Home}
          nameIconRight2={Icon.qrcode}
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
export default SearchScreen;
