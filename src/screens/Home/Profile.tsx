import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {RouterName} from '@navigation/rootName';
import {IHeaderEnum} from '@model/handelConfig';
import Header from '@components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {UserNumberPhone} from '@navigation/index';

const Profile = () => {
  const stateNumber = useContext<any>(UserNumberPhone);
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('customerNumber');
      stateNumber.setNumberPhone(null);
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };
  return (
    <View style={styles.container}>
      <Header type={IHeaderEnum.Home} />
      <TouchableOpacity
        onPress={() => {
          removeValue();
        }}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Profile;
