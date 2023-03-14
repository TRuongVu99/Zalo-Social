import {View, Text, Keyboard, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import {TouchableNativeFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@icon/index';
import {IHeaderEnum} from '@model/handelConfig';
import Header from '@components/Header';
import ResultSearch from '@components/ResultSearch';
import UserData from '@data/UserData';
import {useSelector} from 'react-redux';
import {RootState} from '@store/index';
export const searchbyName = (items: any, key: string) => {
  return items.filter((item: any) =>
    item.username.toLowerCase().trim().includes(key.toLowerCase().trim()),
  );
};
const SearchScreen = () => {
  const navigation = useNavigation<any>();
  const [keyword, setKeyword] = useState<string>('');
  const {profileUser} = useSelector((state: RootState) => state?.user);
  const ListFriend = profileUser?.listFriend?.filter(
    (item: any) => item.status === 3,
  );
  if (keyword.length > 0) {
    return (
      <View style={styles.container}>
        <Header
          type={IHeaderEnum.Search}
          onPress={() => navigation.goBack()}
          placeholder={'Tìm kiếm'}
          onChangeText={text => setKeyword(text)}
        />
        {searchbyName(ListFriend, keyword).length > 0
          ? keyword.length > 0 && (
              <ResultSearch
                listTitle={['TẤT CẢ', 'LIÊN HỆ', 'TIN NHẮN', 'KHÁM PHÁ']}
                data={searchbyName(ListFriend, keyword)}
                index={searchbyName(ListFriend, keyword).length}
                profileUser={profileUser}
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
