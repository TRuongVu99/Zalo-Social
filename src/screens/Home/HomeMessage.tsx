import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Keyboard,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '@components/Header';
import {IHeaderEnum} from '@model/handelConfig';
// import {UserNumberPhone} from '@navigation/index';
import {Icon} from '@icon/index';
import UserData from '@data/UserData';
import {FontSize} from '@constants';
import {fontFamily} from '@fonts/Font';
import {useNavigation} from '@react-navigation/native';
import {RouterName} from '@navigation/rootName';
import {UserNumberPhone} from '../../hook/useUserNumberPhone';
const renderUI = (item: any) => {
  return (
    <TouchableOpacity style={{flexDirection: 'row'}}>
      <Image style={styles.avatar} source={{uri: item.url}} />
      <View style={styles.viewMessage}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Home: React.FC = () => {
  const navigation = useNavigation<any>();
  const {setNumberPhone, numberPhone} = useContext(UserNumberPhone);
  const getNumber = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('customerNumber');
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    async function getCustomerNumber() {
      const data = await getNumber();
      if (data && Object.keys(data).length > 0) {
        setNumberPhone(data);
      }
    }
    getCustomerNumber();
  }, []);
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header
          placeholder={'Tìm kiếm'}
          type={IHeaderEnum.Home}
          nameIconRight1={Icon.qrcode}
          nameIconRight2={Icon.plus}
          onFocusTextInput={() => navigation.navigate(RouterName.SearchScreen)}
        />
        <FlatList
          data={UserData}
          renderItem={({item}) => renderUI(item)}
          // keyExtractor={}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  avatar: {
    width: 60,
    height: 60,
    marginVertical: 10,
    marginHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 60 / 2,
  },
  viewMessage: {
    borderBottomWidth: 0.2,
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: FontSize.h4,
    fontFamily: fontFamily.primaryFont,
  },
  message: {
    fontSize: FontSize.h5,
    fontFamily: fontFamily.primaryFont,
  },
});
export default Home;
