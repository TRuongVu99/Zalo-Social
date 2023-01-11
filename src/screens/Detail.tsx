import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {keySaveData} from './OnBoarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '@components/Header';
import {IHeaderEnum} from '@model/handelConfig';
import {UserConText} from '@navigation';

const Detail: React.FC = () => {
  const stateUser = useContext(UserConText);
  const navigation = useNavigation();
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(keySaveData);
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };
  console.log(stateUser.user);
  return (
    <View style={styles.container}>
      <Header type={IHeaderEnum.Home} />
      <TouchableOpacity
        onPress={() => {
          removeValue(), stateUser.setUser(null);
        }}>
        <Text style={styles.text}>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
  },
});
export default Detail;
