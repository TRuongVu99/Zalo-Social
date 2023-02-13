import Header from '@components/Header';
import Color from '@constants/Color';
import {fontFamily} from '@fonts/Font';
import {Icon} from '@icon/index';
import {IHeaderEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '@store/index';
import React, {useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import UIButton from './components/UIButton';
import styles from './styles';
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
const label = [
  {
    title: 'Tất cả ',
    id: 1,
  },
  {
    title: 'Mới truy cập',
    id: 2,
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
  const [state, setState] = useState<string>(label[0].title);
  const ListFriend = profileUser?.listFriend?.filter(
    (item: any) => item.status === 3,
  );

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
      <View style={styles.phoneBook}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderBottomColor: Color.Gainsboro,
            borderBottomWidth: 0.5,
          }}>
          {label.map((item: any) => (
            <TouchableOpacity
              onPress={() => setState(item.title)}
              style={[
                styles.label,
                {
                  borderWidth: state === item.title ? 0 : 0.5,
                  backgroundColor:
                    state === item.title ? Color.reject : 'white',
                },
              ]}>
              <Text
                style={{
                  fontFamily: fontFamily.primaryFont,
                  color: state === item.title ? Color.DimGray : 'gray',
                }}>
                {item.title}
                {item.id === 1 && <Text>{ListFriend.length}</Text>}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={ListFriend}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.friend}>
              <Image
                source={{
                  uri: item.avatar,
                }}
                style={styles.avatar}
              />
              <View style={styles.name}>
                <Text style={styles.userName}>{item.username}</Text>
                <View style={{flex: 1}} />
                <Image source={Icon.telephone} style={styles.icons} />
                <Image source={Icon.videocall} style={styles.icons} />
              </View>
            </TouchableOpacity>
          )}
          extraData={(item: any) => item.uid}
        />
      </View>
    </View>
  );
};

export default Phonebook;
