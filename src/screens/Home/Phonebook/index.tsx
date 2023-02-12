import Header from '@components/Header';
import Color from '@constants/Color';
import FontSize from '@constants/FontSize';
import {fontFamily} from '@fonts/Font';
import {Icon} from '@icon/index';
import {IHeaderEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '@store/index';
import {windowWidth} from '@utils/Dimensions';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import UIButton from './components/UIButton';
const data = [
  {
    icon: Icon.adduser,
    label: 'Lời mời kết bạn',
    description: null,
  },
  {
    icon: Icon.danhba,
    label: 'Danh bạ máy',
    description: 'Liên hệ có dùng Zalo',
  },
];
const Phonebook = () => {
  const navigation = useNavigation<any>();
  const {profileUser} = useSelector((state: RootState) => state.user);
  let status: any = '';
  profileUser?.listFriend?.map((user: any) => {
    if (user?.status === 2) {
      status = user.status;
    }
  });
  const listTitle = ['BẠN BÈ', 'NHÓM', 'OA'];
  const [selected, setSelected] = useState<string>('BẠN BÈ');

  return (
    <View style={styles.container}>
      <Header
        placeholder={'Tìm kiếm'}
        type={IHeaderEnum.Home}
        nameIconRight2={Icon.addfriend}
        onPressIconRight2={() => {
          navigation.navigate(RouterName.AddFriend);
        }}
      />
      <View style={styles.listTitle}>
        {listTitle.map(title => (
          <TouchableOpacity
            key={title}
            onPress={() => {
              // if (title !== 'BẠN BÈ') {
              //   Alert.alert('Thông báo', 'Chức năng chưa phát triển', [
              //     {text: 'Đóng'},
              //   ]);
              // }
              setSelected(title);
            }}
            style={styles.listTitle}>
            <Text style={styles.title}>{title}</Text>
            {selected === title && <View style={styles.line} />}
          </TouchableOpacity>
        ))}
      </View>
      {data.map(item => (
        <UIButton
          item={item}
          onPress={() =>
            navigation.navigate(RouterName.FriendRequest, {
              label: item.label,
            })
          }
          notification={status === 2}
        />
      ))}
      <FlatList
        data={profileUser?.listFriend?.filter((item: any) => item.status === 3)}
        renderItem={({item}) => (
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: item.avatar,
              }}
              style={styles.avatar}
            />
            <Text>{item.username}</Text>
          </View>
        )}
        extraData={(item: any) => item.uid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    marginHorizontal: 18,
  },
  listTitle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 0.2,
    borderBottomColor: Color.Darkgray,
  },
  icon: {
    width: 35,
    height: 35,
    marginHorizontal: 18,
    alignSelf: 'center',
  },
  item: {
    paddingVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
  },
  description: {
    fontFamily: fontFamily.primaryFont,
    fontWeight: '300',
    color: Platform.OS === 'ios' ? Color.DimGray : Color.Darkgray,
    // fontSize: Platform.OS === 'android' ? FontSize.h6 : null,
  },
  userName: {fontSize: FontSize.h4 * 0.95, marginBottom: 5},
  title: {
    textAlign: 'center',
    width: windowWidth / 3,
    paddingVertical: 10,
  },
  line: {
    borderBottomColor: Color.blue,
    borderBottomWidth: 1,
    width: windowWidth / 4,
    position: 'absolute',
    bottom: 0,
    left: 20,
  },
});
export default Phonebook;
