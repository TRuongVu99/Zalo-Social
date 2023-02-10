import Header from '@components/Header';
import Color from '@constants/Color';
import {fontFamily} from '@fonts/Font';
import {IHeaderEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '@store/index';
import {addProfileFriend} from '@store/slice/profileFriend/profileFriendSlice';
import {addOption} from '@store/slice/user/userSlice';
import {windowWidth} from '@utils/Dimensions';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RenderUI from './components/RenderUI';
interface IFriendRequest {
  route: any;
}
export const addListFrends = async (numberPhone: string, profileUser: any) => {
  const newUserData = profileUser.listFriend.map((user: any) => {
    if (user.numberPhone === numberPhone) {
      return {...user, status: 3};
    }
    return user;
  });
  try {
    await firestore().collection('Users').doc(profileUser.UserId).update({
      listFriend: newUserData,
    });
  } catch (err) {
    console.log(err);
  }
};
export const handleReject = async (profileReject: any, profileUser: any) => {
  try {
    await firestore()
      .collection('Users')
      .doc(profileUser.UserId)
      .update({
        listFriend: firestore.FieldValue.arrayRemove(profileReject),
      });
  } catch {}
};
const FriendRequest = ({route}: IFriendRequest) => {
  const {label} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const listTitle = ['ĐÃ NHẬN  ', 'ĐÃ GỬI'];
  const [selected, setSelected] = useState<string>('ĐÃ NHẬN  ');
  const {profileUser} = useSelector((state: RootState) => state.user);

  return (
    <View style={styles.container}>
      <Header type={IHeaderEnum.Register} name={'setting'} label={label} />
      <View style={styles.listTitle}>
        {listTitle.map(title => (
          <TouchableOpacity
            key={title}
            onPress={() => {
              //   if (title !== 'ĐÃ NHẬN') {
              //     Alert.alert('Thông báo', 'Chức năng chưa phát triển', [
              //       {text: 'Đóng'},
              //     ]);
              //   }
              setSelected(title);
            }}>
            <Text style={styles.title}>
              {title}
              {title === 'ĐÃ NHẬN  ' &&
                profileUser?.listFriend?.filter(
                  (item: any) => item.status === 2,
                ).length > 0 && (
                  <Text>
                    {
                      profileUser?.listFriend?.filter(
                        (item: any) => item.status === 2,
                      ).length
                    }
                  </Text>
                )}
            </Text>
            {selected === title && <View style={styles.line} />}
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={profileUser?.listFriend?.filter((item: any) => item.status === 2)}
        renderItem={({item}) => (
          <RenderUI
            item={item}
            onPressConfirm={() => {
              addListFrends(item.numberPhone, profileUser);
            }}
            onPressUser={() => {
              // navigation.navigate(RouterName.TabbarFriend);
              dispatch(addProfileFriend(item));
              navigation.navigate(RouterName.PersonalFriendRequest);
            }}
            onPressReject={() => {
              handleReject(item, profileUser);
            }}
          />
        )}
        extraData={(item: any) => item.uid}
      />
    </View>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    borderBottomColor: Color.Darkgray,
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    width: windowWidth / 2,
    paddingVertical: 10,
    color: Color.DimGray,
  },
  line: {
    borderBottomColor: Color.blue,
    borderBottomWidth: 1,
    width: windowWidth / 3,
    position: 'absolute',
    bottom: 0,
    left: 30,
  },
  fontFamily: {
    fontFamily: fontFamily.primaryFont,
  },
});
