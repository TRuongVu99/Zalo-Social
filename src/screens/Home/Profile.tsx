import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {IHeaderEnum} from '@model/handelConfig';
import Header from '@components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {UserNumberPhone} from '../../hook/UserNumberPhone';
import {keySaveNumberPhone} from '@screens/Login';
import {UserContext} from '../../hook/UserContext';
import {keySaveUser} from '@screens/ConfirmOTP';

const Profile = () => {
  const stateNumber = useContext<any>(UserNumberPhone);
  const stateUser = useContext<any>(UserContext);
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(keySaveNumberPhone);
      stateNumber.setNumberPhone(null);
    } catch (e) {
      // remove error
    }

    // console.log('Done.');
  };
  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem(keySaveUser);
      stateUser.setUser(null);
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };
  return (
    <View style={styles.container}>
      <Header type={IHeaderEnum.Home} />
      <TouchableOpacity
        onPress={async () => {
          await removeValue();
          removeUser();
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
