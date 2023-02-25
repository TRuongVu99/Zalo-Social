import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@store/index';
import {windowHeight, windowWidth} from '@utils/Dimensions';
import {Color, FontSize, image} from '@constants';
import {fontFamily} from '@fonts/Font';
import Icons from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RouterName} from '@navigation/rootName';
import {
  addFrendByPhoneNumber,
  addOption,
  getUserProfile,
  handleConfirm,
  handleUnFriend,
} from '@store/slice/user/userSlice';
import {IPeronalEnum} from '@model/handelConfig';

const PersonalFriendRequest = ({route}: {route: any}) => {
  const navigation = useNavigation<any>();
  const {profile} = route?.params;
  const dispatch = useDispatch<any>();
  const inset = useSafeAreaInsets();
  const {profileUser} = useSelector((state: RootState) => state.user);
  const data = profileUser?.listFriend?.filter(
    (item: any) => item.status === 2,
  );
  setTimeout(() => {
    dispatch(addOption('none'));
  }, 100);

  const profileFriend = {
    ...profileUser,
    status: 3,
  };
  delete profileFriend?.listFriend;
  delete profileFriend?.listFriendInvitations;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            paddingLeft: 10,
            paddingTop: Platform.OS === 'ios' ? inset.top : 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icons name={'close'} size={25} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <FlatList
          data={data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View
                style={[
                  styles.view,
                  {
                    paddingLeft: index === 0 ? 20 : 0,
                    paddingRight: index === data.length - 1 ? 20 : 0,
                  },
                ]}>
                <Image
                  resizeMode="cover"
                  source={{uri: profile?.background}}
                  style={styles.background}
                />

                <View style={styles.body2}>
                  <View style={styles.borderRadius}>
                    <Pressable
                      onPress={async () => {
                        // try {
                        //   navigation.pop();
                        //   navigation.navigate(RouterName.Personal, {
                        //     profile: item,
                        //     type: IPeronalEnum.Confirm,
                        //   });
                        // } catch (error) {
                        //   console.log(error);
                        // }
                        console.log({item});
                      }}>
                      <Image
                        source={{uri: item.avatar}}
                        style={styles.avatar}
                      />
                    </Pressable>
                  </View>
                  <Text style={styles.userName}>{item.username}</Text>
                  <Text style={[styles.userName, styles.depcription]}>
                    Từ số điện thoại
                  </Text>
                  <View style={[styles.row]}>
                    <TouchableOpacity
                      style={[styles.button, styles.message]}
                      onPress={() => {}}>
                      <Text style={styles.labelButton}>Nhắn Tin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.confirm]}
                      onPress={() => {
                        const profileUserRecall = {
                          ...profileUser,
                          status: 4,
                          timeStamp: item.timeStamp,
                        };
                        delete profileUserRecall?.listFriend;
                        delete profileUserRecall?.listFriendInvitations;

                        dispatch(
                          handleConfirm({
                            numberPhone: profile.numberPhone,
                            profileUser: profileUser,
                            UserId: profileUser.UserId,
                          }),
                        );
                        dispatch(
                          addFrendByPhoneNumber({
                            UserIdFriend: item?.UserId,
                            friend: profileFriend,
                          }),
                        );
                        dispatch(
                          handleUnFriend({
                            UserId: item?.UserId,
                            profileUnFriend: profileUserRecall,
                          }),
                        );
                        dispatch(
                          getUserProfile({
                            uid: profileUser?.uid,
                          }),
                        );
                        navigation.navigate(RouterName.Phonebook);
                      }}>
                      <Text style={[styles.labelButton, {color: 'white'}]}>
                        Đồng ý
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.uid}
        />
      </View>
    </View>
  );
};

export default PersonalFriendRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  body: {
    flex: 1,
  },
  header: {
    flex: 0.3,
  },
  view: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.53,
    marginHorizontal: 7,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
  },
  background: {
    width: windowWidth * 0.85,
    height: windowHeight / 5,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  body2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    width: windowWidth * 0.85,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  borderRadius: {
    top: -85,
    borderWidth: 3,
    borderRadius: 150 / 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  userName: {
    top: -80,
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
    fontSize: FontSize.h4,
  },
  depcription: {fontSize: FontSize.h5, color: 'gray'},
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  labelButton: {
    fontFamily: fontFamily.RobotoMedium,
    color: Color.DimGray,
    fontSize: FontSize.h5,
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  message: {
    backgroundColor: Color.reject,
  },
  confirm: {
    backgroundColor: 'rgb(18, 149, 255)',
  },
});
