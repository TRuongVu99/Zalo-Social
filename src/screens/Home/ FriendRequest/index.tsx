import Header from '@components/Header';
import Color from '@constants/Color';
import {fontFamily} from '@fonts/Font';
import {IHeaderEnum, IPeronalEnum, IRequestEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/native';
import {AppDispatch, RootState} from '@store/index';
import {addProfileFriend} from '@store/slice/profileFriend/profileFriendSlice';
import {
  addFrendByPhoneNumber,
  getUserProfile,
  handleConfirm,
  handleReject,
  handleUnFriend,
} from '@store/slice/user/userSlice';
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
import RenderUI from './components/RenderUI';
interface IFriendRequest {
  route: any;
}

const FriendRequest = ({route}: IFriendRequest) => {
  const {label} = route?.params;
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
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
  console.log({profileUser});
  return (
    <View style={styles.container}>
      <Header
        type={IHeaderEnum.Register}
        name={'setting'}
        label={label}
        onPressExit={() => navigation.goBack()}
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
              console.log({item});
              dispatch(
                handleConfirm({
                  numberPhone: item.numberPhone,
                  profileUser: profileUser,
                  UserId: profileUser.UserId,
                }),
              );
              dispatch(
                handleUnFriend({
                  UserId: item?.UserId,
                  profileUnFriend: profileUserRecall,
                }),
              );
              dispatch(
                addFrendByPhoneNumber({
                  UserIdFriend: item?.UserId,
                  friend,
                }),
              );
              setTimeout(() => {
                dispatch(
                  getUserProfile({
                    uid: profileUser?.uid,
                  }),
                );
              }, 500);
            }}
            onPressUser={() => {
              dispatch(addProfileFriend(item));
              navigation.navigate(RouterName.PersonalFriendRequest, {
                profile: item,
              });
            }}
            onPressReject={() => {
              const profileRecall = {
                ...profileUser,
                status: 4,
                timeStamp: item?.timeStamp,
              };
              delete profileRecall?.listFriend;
              delete profileRecall?.listFriendInvitations;

              dispatch(
                handleReject({
                  UserId: profileUser?.UserId,
                  profileReject: item,
                }),
              );
              dispatch(
                handleUnFriend({
                  UserId: item?.UserId,
                  profileUnFriend: profileRecall,
                }),
              );

              setTimeout(() => {
                dispatch(
                  getUserProfile({
                    uid: profileUser?.uid,
                  }),
                );
              }, 500);
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

              dispatch(
                handleReject({
                  UserId: item?.UserId,
                  profileReject: newprofileUsers,
                }),
              );
              // handleReject(item.UserId, newprofileUsers),
              dispatch(
                handleUnFriend({
                  UserId: profileUser?.UserId,
                  profileUnFriend: item,
                }),
              );
              // handleUnFriend(profileUser.UserId, item),
              setTimeout(() => {
                dispatch(
                  getUserProfile({
                    uid: profileUser?.uid,
                  }),
                );
              }, 500);
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
