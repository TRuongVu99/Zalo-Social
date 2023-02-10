import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Keyboard,
  FlatList,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import Header from '@components/Header';
import {IHeaderEnum} from '@model/handelConfig';
import {FontSize} from '@constants';
import {fontFamily} from '@fonts/Font';
import {useNavigation} from '@react-navigation/native';
import DataMesseger from '@data/DataMesseger';

const renderUI = (item: any) => {
  const formatTime = (date: any) => {
    let dateFormat = new Date(date);
    var hours = dateFormat.getHours().toString();
    var minutes = dateFormat.getMinutes().toString();
    return hours + ':' + minutes;
  };
  return (
    <TouchableOpacity
      style={{
        flexDirection: item.isSender ? 'row' : 'row-reverse',
        alignItems: 'center',
      }}
      onPress={() => {}}>
      {item.isSender &&
        (item.showUrl ? (
          <Image style={styles.avatar} source={{uri: item.url}} />
        ) : (
          <View style={{width: 30}} />
        ))}
      <View style={styles.viewMessage}>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.message}>{formatTime(item.timestamp)}</Text>
      </View>
    </TouchableOpacity>
  );
};
const Message = ({route}: {route: any}) => {
  const navigation = useNavigation<any>();
  const {name} = route.params;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header
            onPress={() => navigation.pop()}
            type={IHeaderEnum.Message}
            label={name}
          />
          <FlatList
            style={{
              flexDirection: 'column-reverse',
              marginHorizontal: 15,
            }}
            data={DataMesseger}
            renderItem={({item}) => renderUI(item)}
            extraData={(item: any) => item.timestamp}
          />
          <TextInput
            style={{
              backgroundColor: 'green',
              paddingBottom: 40,
              paddingTop: 20,
              marginTop: 10,
            }}
          />
        </View>
      </TouchableNativeFeedback>
    </KeyboardAvoidingView>
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
    width: 30,
    height: 30,
    marginVertical: 10,
    borderWidth: 0.5,
    borderRadius: 60 / 2,
  },
  viewMessage: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 10,
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
