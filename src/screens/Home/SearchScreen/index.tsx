import {View, Text, Keyboard, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import {TouchableNativeFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@icon/index';
import {IHeaderEnum} from '@model/handelConfig';
import Header from '@components/Header';
import ResultSearch from '@components/ResultSearch';
import UserData from '@data/UserData';
export const searchbyName = (items: any, key: string) => {
  return items.filter((item: any) =>
    item.name.toLowerCase().trim().includes(key.toLowerCase().trim()),
  );
};
const SearchScreen = () => {
  const navigation = useNavigation<any>();
  const [keyword, setKeyword] = useState<string>('');

  if (keyword.length > 0) {
    return (
      <View style={styles.container}>
        <Header
          type={IHeaderEnum.Search}
          onPress={() => navigation.goBack()}
          placeholder={'Tìm kiếm'}
          onChangeText={text => setKeyword(text)}
        />
        {searchbyName(UserData, keyword).length > 0
          ? keyword.length > 0 && (
              <ResultSearch
                listTitle={['TẤT CẢ', 'LIÊN HỆ', 'TIN NHẮN', 'KHÁM PHÁ']}
                data={searchbyName(UserData, keyword)}
                index={searchbyName(UserData, keyword).length}
              />
            )
          : keyword.length > 0 && (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text>Không tìm thấy kết quả phù hợp</Text>
              </View>
            )}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Header
          type={IHeaderEnum.Search}
          onPress={() => navigation.goBack()}
          placeholder={'Tìm kiếm'}
          onChangeText={text => setKeyword(text)}
        />
        <Text>Liện hệ đã tìm</Text>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default SearchScreen;
