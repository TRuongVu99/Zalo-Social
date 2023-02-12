import {IButtonEnum, IPeronalEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '@store/index';
import {addOption} from '@store/slice/user/userSlice';
import {windowHeight} from '@utils/Dimensions';
import moment from 'moment';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addFrendByPhoneNumber,
  handleConfirm,
  handleReject,
} from '../ FriendRequest';
import RenderFriendUI from './components/RenderFriendUI';
import RenderUserUI from './components/RenderUserUI';
interface IPersonal {
  route: any;
}
export const handleUnFriend = async (
  UserId: string | undefined,
  profileUnFriend: any,
) => {
  try {
    await firestore()
      .collection('Users')
      .doc(UserId)
      .update({
        listFriendInvitations:
          firestore.FieldValue.arrayRemove(profileUnFriend),
      });
  } catch (err) {
    console.log(err);
  }
};
const Personal = ({route}: IPersonal) => {
  const {profileUser} = useSelector((state: RootState) => state.user);
  const {profile, type, UserId, typeUnFriend} = route?.params;
  const [typeEnum, setTypeEnum] = useState<string>(IPeronalEnum.Confirm);
  const [typeUnFriendApp, setTypeUnFriend] = useState<string>(typeUnFriend);
  console.log(UserId !== profileUser.UserId);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  dispatch(addOption('fade'));
  const {profileFriend} = useSelector(
    (state: RootState) => state.profileFriend,
  );
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

  const addFrendByPhoneNumbers = async () => {
    firestore()
      .collection('Users')
      .doc(profileFriend?.UserId)
      .update({
        listFriend: firestore.FieldValue.arrayUnion(newProfileUser),
      })
      .then(() => {
        console.log('User updated!');
      });
  };
  const sendFriendInvitations = async () => {
    try {
      firestore()
        .collection('Users')
        .doc(profileUser?.UserId)
        .update({
          listFriendInvitations:
            firestore.FieldValue.arrayUnion(newprofileFriend),
        })
        .then(() => {
          console.log(`Đã gửi lời mời kết bạn tới ${profileFriend.username}`);
        });
    } catch (error) {
      console.log({error});
    }
  };

  switch (type) {
    case IPeronalEnum.AddFriend:
      return (
        <RenderFriendUI
          typeUnFriend={typeUnFriendApp}
          type={IPeronalEnum.AddFriend}
          urlAvatar={profile.avatar}
          name={profile.username}
          onPressAddFriend={() => {
            addFrendByPhoneNumbers();
            sendFriendInvitations();
            setTypeUnFriend(IPeronalEnum.UnFriend);
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
            handleUnFriend(profileUser.UserId, profile);
            handleReject(profileFriend.UserId, profileRecall);
          }}
        />
      );
    case IPeronalEnum.Confirm:
      return (
        <RenderFriendUI
          urlAvatar={profile.avatar}
          name={profile.username}
          type={typeEnum}
          timeStamp={profile.timeStamp}
          onPressConfirm={() => {
            const Friend = {
              ...profileUser,
              status: 3,
            };
            delete Friend?.listFriend;
            delete Friend?.listFriendInvitations;
            handleConfirm(profile.numberPhone, profileUser, profileUser.UserId);
            handleUnFriend(profile.UserId, profileUserRecall);
            addFrendByPhoneNumber(profileFriend.UserId, Friend);

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
            handleReject(profileUser.UserId, profile);
            handleUnFriend(profileFriend.UserId, profileRecall);

            setTypeEnum(IButtonEnum.disable);
          }}
          onPressMessage={() => {
            navigation.navigate(RouterName.Message, {
              name: profile.username,
              type: IPeronalEnum.Confirm,
            });
          }}
        />
      );
    case IPeronalEnum.Friend:
      return (
        <RenderUserUI urlAvatar={profile?.avatar} name={profile?.username} />
      );
    default:
      return (
        <RenderUserUI
          urlAvatar={profileUser?.avatar}
          name={profileUser?.username}
        />
      );
  }
};

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
export default Personal;
