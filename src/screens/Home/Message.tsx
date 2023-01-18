import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Keyboard,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import Header from '@components/Header';
import {IHeaderEnum} from '@model/handelConfig';
import {Icon} from '@icon/index';
import UserData from '@data/UserData';
import {FontSize} from '@constants';
import {fontFamily} from '@fonts/Font';
import {useNavigation} from '@react-navigation/native';
import {RouterName} from '@navigation/rootName';

const Message = ({route}: {route: any}) => {
  const navigation = useNavigation<any>();
  const {name} = route.params;
  console.log(name);
  const renderUI = (item: any) => {
    return (
      <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => {}}>
        <Image style={styles.avatar} source={{uri: item.url}} />
        <View style={styles.viewMessage}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header
          onPress={() => navigation.pop()}
          type={IHeaderEnum.Message}
          label={name}
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
export default Message;
