import StatusBar, {Constants} from '@components/StatusBar';
import Color from '@constants/Color';
import {IButtonEnum, IPeronalEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '@store/index';
import {getStatus} from '@store/slice/contents/contentsSlice';
import {getMessage} from '@store/slice/message/messageSlice';
import {
  addFrendByPhoneNumber,
  addOption,
  getUserProfile,
  handleConfirm,
  handleReject,
  handleUnFriend,
  sendFriendInvitation,
} from '@store/slice/user/userSlice';
import {windowHeight} from '@utils/Dimensions';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import RenderFriendUI from './components/RenderFriendUI';
import RenderUserUI from './components/RenderUserUI';
interface IPersonal {
  route: any;
}

const Personal = ({route}: IPersonal) => {
  const {profileUser} = useSelector((state: RootState) => state.user);
  const {profile, type, typeUnFriend, loading, isFromQRcode} = route?.params;
  const [typeEnum, setTypeEnum] = useState<string>(IPeronalEnum.Confirm);
  const [typeUnFriendApp, setTypeUnFriend] = useState<string>(typeUnFriend);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  useEffect(() => {
    if (type === IPeronalEnum.Confirm) {
      dispatch(addOption('fade'));
    }
  }, []);
  const {profileFriend} = useSelector(
    (state: RootState) => state.profileFriend,
  );
  useEffect(() => {
    dispatch(
      getStatus({
        numberPhone:
          type === IPeronalEnum.Friend
            ? profile?.numberPhone
            : profileUser.numberPhone,
      }),
    );
  }, []);
  const newProfileUser = {
    ...profileUser,
    timeStamp: moment().format('L'),
    status: 2,
  };
  delete newProfileUser?.listFriendInvitations;
  delete newProfileUser?.listFriend;

  const profileUserRecall = {
    ...profileUser,
    timeStamp: moment().format('L'),
    status: 4,
  };
  delete profileUserRecall?.listFriend;
  delete profileUserRecall?.listFriendInvitations;

  const newprofileFriend = {
    ...profileFriend,
    timeStamp: moment().format('L'),
    status: 4,
  };
  delete newprofileFriend?.listFriend;
  delete newprofileFriend?.listFriendInvitations;
  switch (type) {
    case IPeronalEnum.AddFriend:
      return (
        <>
          <StatusBar mode={Constants.statusBar.dark} navigation={navigation} />
          <RenderFriendUI
            urlBackground={profile.background}
            typeUnFriend={typeUnFriendApp}
            type={IPeronalEnum.AddFriend}
            urlAvatar={profile.avatar}
            name={profile.username}
            isFromQRcode={isFromQRcode}
            onPressAddFriend={() => {
              dispatch(
                addFrendByPhoneNumber({
                  UserIdFriend: profileFriend?.UserId,
                  friend: newProfileUser,
                }),
              );
              dispatch(
                sendFriendInvitation({
                  UserId: profileUser?.UserId,
                  newprofileFriend,
                }),
              );
              setTypeUnFriend(IPeronalEnum.UnFriend);
              dispatch(
                getUserProfile({
                  uid: profileUser?.uid,
                }),
              );
            }}
            onPressMessage={() => {
              navigation.navigate(RouterName.Message, {
                name: profile.username,
                type: IPeronalEnum.AddFriend,
              });
            }}
            onPressUnFriend={() => {
              const profileRecall = {
                ...profileUser,
                status: 2,
                timeStamp: newProfileUser?.timeStamp,
              };
              delete profileRecall?.listFriend;
              delete profileRecall?.listFriendInvitations;
              setTypeUnFriend(IPeronalEnum.AddFriend);
              dispatch(
                handleUnFriend({
                  UserId: profileUser?.UserId,
                  profileUnFriend: profile,
                }),
              );
              dispatch(
                handleReject({
                  UserId: profileFriend?.UserId,
                  profileReject: profileRecall,
                }),
              );
              dispatch(
                getUserProfile({
                  uid: profileUser?.uid,
                }),
              );
            }}
          />
        </>
      );
    case IPeronalEnum.Confirm:
      return (
        <>
          <StatusBar mode={Constants.statusBar.dark} navigation={navigation} />
          <RenderFriendUI
            urlBackground={profile.background}
            urlAvatar={profile.avatar}
            name={profile.username}
            type={typeEnum}
            timeStamp={profile.timeStamp}
            isFromQRcode={isFromQRcode}
            onPressConfirm={() => {
              const Friend = {
                ...profileUser,
                status: 3,
              };
              delete Friend?.listFriend;
              delete Friend?.listFriendInvitations;

              dispatch(
                handleConfirm({
                  numberPhone: profile.numberPhone,
                  profileUser: profileUser,
                  UserId: profileUser.UserId,
                }),
              );
              dispatch(
                handleUnFriend({
                  UserId: profile?.UserId,
                  profileUnFriend: profileUserRecall,
                }),
              );
              dispatch(
                addFrendByPhoneNumber({
                  UserIdFriend: profileFriend?.UserId,
                  friend: Friend,
                }),
              );

              navigation.navigate(RouterName.Phonebook);
            }}
            onPressReject={() => {
              const profileRecall = {
                ...profileUser,
                status: 4,
                timeStamp: newProfileUser?.timeStamp,
              };
              delete profileRecall?.listFriend;
              delete profileRecall?.listFriendInvitations;
              dispatch(
                handleReject({
                  UserId: profileUser?.UserId,
                  profileReject: profile,
                }),
              );
              dispatch(
                handleUnFriend({
                  UserId: profileFriend?.UserId,
                  profileUnFriend: profileRecall,
                }),
              );

              setTypeEnum(IButtonEnum.disable);
            }}
            onPressMessage={() => {
              navigation.navigate(RouterName.Message, {
                name: profile.username,
                type: IPeronalEnum.Confirm,
              });
            }}
          />
        </>
      );
    case IPeronalEnum.Friend:
      return (
        <>
          <StatusBar mode={Constants.statusBar.dark} navigation={navigation} />
          <RenderUserUI
            urlAvatar={profile?.avatar}
            name={profile?.username}
            urlBackground={profile?.background}
            type={IPeronalEnum.Friend}
            profileFriend={profile}
            profile={newProfileUser}
            isFromQRcode={isFromQRcode}
            onPressMessage={async () => {
              await dispatch(
                getMessage({numberPhone: profileUser.numberPhone}),
              ).unwrap();

              navigation.navigate(RouterName.Message, {
                profileFriend: profile,
              });
            }}
          />
        </>
      );
    default:
      return (
        <>
          <RenderUserUI
            urlAvatar={profileUser?.avatar}
            name={profileUser?.username}
            urlBackground={profileUser.background}
            loading={loading}
            profile={newProfileUser}
            isFromQRcode={isFromQRcode}
          />
          <StatusBar mode={Constants.statusBar.dark} navigation={navigation} />
        </>
      );
  }
};

export default Personal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: windowHeight / 3,
    alignItems: 'center',
  },
  body: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
