import Header from '@components/Header';
import Color from '@constants/Color';
import {fontFamily} from '@fonts/Font';
import {IHeaderEnum, IPeronalEnum, IRequestEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '@store/index';
import {addProfileFriend} from '@store/slice/profileFriend/profileFriendSlice';
import {windowWidth} from '@utils/Dimensions';
import React, {useState} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {handleUnFriend} from '../ Personal';
import RenderUI from './components/RenderUI';
interface IFriendRequest {
  route: any;
}
export const handleConfirm = async (
  numberPhone?: string | undefined,
  profileUser?: any,
  UserId?: string | undefined,
) => {
  const newUserData = profileUser.listFriend.map((user: any) => {
    if (user.numberPhone === numberPhone) {
      return {...user, status: 3};
    }
    return user;
  });
  try {
    await firestore().collection('Users').doc(UserId).update({
      listFriend: newUserData,
    });
  } catch (err) {
    console.log(err);
  }
};
export const handleReject = async (
  UserId: string | undefined,
  profileReject: any,
) => {
  try {
    await firestore()
      .collection('Users')
      .doc(UserId)
      .update({
        listFriend: firestore.FieldValue.arrayRemove(profileReject),
      });
  } catch (err) {
    console.log(err);
  }
};
export const handleReCall = async (
  numberPhone: string | undefined,
  profileUser: any,
  UserId: string | undefined,
) => {
  const newUserData = profileUser.listFriend.map((user: any) => {
    if (user.numberPhone === numberPhone) {
      return {...user, status: 5};
    }
    return user;
  });
  try {
    await firestore().collection('Users').doc(UserId).update({
      listFriend: newUserData,
    });
  } catch (err) {
    console.log(err);
  }
};
export const addFrendByPhoneNumber = async (
  UserIdFriend: string,
  friend: any,
) => {
  firestore()
    .collection('Users')
    .doc(UserIdFriend)
    .update({
      listFriend: firestore.FieldValue.arrayUnion(friend),
    })
    .then(() => {
      console.log('User updated!');
    });
};
const FriendRequest = ({route}: IFriendRequest) => {
  const {label} = route?.params;
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const listTitle = ['ĐÃ NHẬN  ', 'ĐÃ GỬI  '];
  const [selected, setSelected] = useState<string>('ĐÃ NHẬN  ');
  const {profileUser} = useSelector((state: RootState) => state.user);
  const profileFriend = {
    ...profileUser,
    status: 4,
  };
  delete profileFriend?.listFriend;
  delete profileFriend?.listFriendInvitations;
  const friend = {...profileFriend};
  friend.status = 3;

  const dataReceived = profileUser?.listFriend?.filter(
    (item: any) => item.status === 2,
  );
  const dataSent = profileUser?.listFriendInvitations?.filter(
    (item: any) => item.status === 4,
  );
  const listReceived = profileUser?.listFriend?.filter(
    (item: any) => item.status === 2,
  );
  const listSent = profileUser?.listFriendInvitations?.filter(
    (item: any) => item.status === 4,
  );

  return (
    <View style={styles.container}>
      <Header
        type={IHeaderEnum.Register}
        name={'setting'}
        label={label}
        StyleHeaderSetting={{
          paddingVertical: 15,
          paddingTop: Platform.OS === 'android' ? 15 : inset.top * 1.15,
        }}
      />
      <View style={styles.listTitle}>
        {listTitle.map(title => (
          <TouchableOpacity
            key={title}
            onPress={() => {
              setSelected(title);
            }}>
            <Text style={styles.title}>
              {title}
              {title === 'ĐÃ NHẬN  ' && listReceived?.length > 0 && (
                <Text>{listReceived.length}</Text>
              )}
              {title === 'ĐÃ GỬI  ' && listSent?.length > 0 && (
                <Text>{listSent.length}</Text>
              )}
            </Text>
            {selected === title && <View style={styles.line} />}
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={selected === 'ĐÃ GỬI  ' ? dataSent : dataReceived}
        renderItem={({item, index}) => (
          <RenderUI
            type={
              selected === 'ĐÃ GỬI  '
                ? IRequestEnum.Sent
                : IRequestEnum.Received
            }
            item={item}
            onPressConfirm={() => {
              const profileUserRecall = {
                ...profileUser,
                status: 4,
                timeStamp: item.timeStamp,
              };
              delete profileUserRecall?.listFriend;
              delete profileUserRecall?.listFriendInvitations;

              handleConfirm(item.numberPhone, profileUser, profileUser.UserId);
              handleConfirm(profileUser.numberPhone, item, item.UserId);
              handleUnFriend(item.UserId, profileUserRecall);
              addFrendByPhoneNumber(item.UserId, friend);
            }}
            onPressUser={() => {
              dispatch(addProfileFriend(item));
              navigation.navigate(RouterName.PersonalFriendRequest);
            }}
            onPressReject={() => {
              const profileRecall = {
                ...profileUser,
                status: 4,
                timeStamp: item?.timeStamp,
              };
              delete profileRecall?.listFriend;
              delete profileRecall?.listFriendInvitations;
              // console.log(profileRecall);
              // console.log(item);
              handleReject(profileUser.UserId, item);
              handleUnFriend(item.UserId, profileRecall);
            }}
            onPressUserRecall={() => {
              dispatch(addProfileFriend(item));
              navigation.navigate(RouterName.Personal, {
                profile: item,
                type: IPeronalEnum.AddFriend,
                typeUnFriend: IPeronalEnum.UnFriend,
              });
            }}
            onPressReCall={() => {
              const newprofileUsers = {
                ...profileUser,
                status: 2,
                timeStamp: item?.timeStamp,
              };
              delete newprofileUsers?.listFriend;
              delete newprofileUsers?.listFriendInvitations;

              // console.log(item);
              // console.log(newprofileUsers);
              handleReject(item.UserId, newprofileUsers);
              handleUnFriend(profileUser.UserId, item);
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
