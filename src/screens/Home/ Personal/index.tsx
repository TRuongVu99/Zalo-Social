import {IPeronalEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '@store/index';
import {addOption} from '@store/slice/user/userSlice';
import {windowHeight} from '@utils/Dimensions';
import moment from 'moment';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addListFrends} from '../ FriendRequest';
import RenderFriendUI from './components/RenderFriendUI';
import RenderUserUI from './components/RenderUserUI';
interface IPersonal {
  route: any;
}
const Personal = ({route}: IPersonal) => {
  const {profile, type} = route?.params;
  const navigation = useNavigation<any>();

  const dispatch = useDispatch<any>();
  dispatch(addOption('fade'));
  const {profileFriend} = useSelector(
    (state: RootState) => state.profileFriend,
  );
  console.log(profileFriend);
  const {profileUser} = useSelector((state: RootState) => state.user);
  const newProfileUser = {
    ...profileUser,
    timeStamp: moment().format('L'),
    status: 2,
  };
  delete newProfileUser?.listFriend;
  const addFrendByPhoneNumber = async () => {
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
  switch (type) {
    case IPeronalEnum.AddFriend:
      return (
        <RenderFriendUI
          type={IPeronalEnum.AddFriend}
          urlAvatar={profile.avatar}
          name={profile.username}
          onPressAddFriend={() => addFrendByPhoneNumber()}
        />
      );
    case IPeronalEnum.Confirm:
      return (
        <RenderFriendUI
          urlAvatar={profile.avatar}
          name={profile.username}
          type={IPeronalEnum.Confirm}
          timeStamp={profile.timeStamp}
          onPressConfirm={() => {
            addListFrends(profile.numberPhone, profileUser);
            navigation.navigate(RouterName.Phonebook);
          }}
        />
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
