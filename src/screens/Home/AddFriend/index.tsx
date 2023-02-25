import Header from '@components/Header';
import {Color, FontSize} from '@constants';
import {fontFamily} from '@fonts/Font';
import {Icon} from '@icon/index';
import {IHeaderEnum, IPeronalEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '@store/index';
import {getStatus} from '@store/slice/contents/contentsSlice';
import {addProfileFriend} from '@store/slice/profileFriend/profileFriendSlice';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {options} from './data/options';

const AddFriend = () => {
  const navigation = useNavigation<any>();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const dispatch = useDispatch<any>();
  const {profileUser} = useSelector((state: RootState) => state.user);

  const isFriendRequest =
    profileUser?.listFriend?.filter(
      (item: any) => item.numberPhone === phoneNumber && item.status === 2,
    ).length > 0;

  const isFriend =
    profileUser?.listFriend?.filter(
      (item: any) => item.numberPhone === phoneNumber && item.status === 3,
    ).length > 0;
  const isUser = profileUser.numberPhone === phoneNumber;

  const isSentInvitation =
    profileUser?.listFriendInvitations?.filter(
      (item: any) => item.numberPhone === phoneNumber,
    ).length > 0;
  // console.log(isUser);
  const getFrendByPhoneNumber = async () => {
    firestore()
      .collection('Users')
      .where('numberPhone', '==', phoneNumber)
      .get()
      .then(querySnapshot => {
        let profile: any = {};
        let UserId: string = '';
        if (querySnapshot.size === 0) {
          Alert.alert(
            'Thông báo',
            'Số điện thoại chưa đăng ký tài khoản hoặc không cho phép tìm kiếm',
            [{text: 'Đóng'}],
          );
        } else {
          querySnapshot.forEach(documentSnapshot => {
            profile = documentSnapshot.data();
            UserId = documentSnapshot.id;
          });
          // console.log(profile);
          dispatch(addProfileFriend({...profile, UserId}));
          navigation.navigate(RouterName.Personal, {
            profile,
            UserId,
            type: isFriendRequest
              ? IPeronalEnum.Confirm
              : isFriend
              ? IPeronalEnum.Friend
              : isUser
              ? null
              : IPeronalEnum.AddFriend,
            typeUnFriend: isSentInvitation
              ? IPeronalEnum.UnFriend
              : IPeronalEnum.AddFriend,
          });
        }
      });
  };
  return (
    <View style={styles.container}>
      <Header type={IHeaderEnum.Register} label={'Thêm bạn'} />

      <View style={styles.view1}>
        <Text style={[styles.fontFamily, styles.text]}>
          Thêm bạn bằng số điện thoại
        </Text>
        <TouchableOpacity style={styles.row}>
          <Text style={[styles.fontFamily, styles.text2]}>Việt Nam (+84)</Text>
          <TouchableOpacity>
            <IconEntypo name="chevron-right" size={20} color={Color.Darkgray} />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.textInput}>
          <TextInput
            style={styles.textInput}
            placeholder="Nhập số điện thoại"
            keyboardType={'numeric'}
            onChangeText={text => {
              setPhoneNumber(text);
            }}
          />
          <TouchableOpacity
            style={[
              styles.buttonSearch,
              {
                backgroundColor:
                  phoneNumber.length === 10
                    ? Color.primary
                    : 'rgb(180, 200, 220)',
              },
            ]}
            disabled={phoneNumber.length < 10}
            onPress={() => {
              getFrendByPhoneNumber();
              dispatch(getStatus({numberPhone: phoneNumber}));
            }}>
            <Text style={[styles.fontFamily, {color: 'white'}]}>Tìm</Text>
          </TouchableOpacity>
        </View>
      </View>
      {options.map(item => (
        <TouchableOpacity
          key={item.label}
          style={[
            styles.item,
            {
              marginBottom: item.label === 'Có thể bạn quen' ? 10 : 0,
            },
          ]}>
          <Image source={item.icon} style={styles.icon} />
          <View style={styles.container}>
            <Text style={[styles.labelStyle, styles.userName]}>
              {item.label}
            </Text>
            {item.descriptions !== null && (
              <Text style={styles.description}>{item.descriptions}</Text>
            )}
          </View>
          <TouchableOpacity style={{padding: 10}}>
            <IconEntypo name="chevron-right" size={20} color={Color.Darkgray} />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view1: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  fontFamily: {
    fontFamily: fontFamily.primaryFont,
  },
  labelStyle: {
    color: Color.DimGray,
  },
  description: {
    color: Color.Darkgray,
    marginBottom: 5,
  },
  text: {
    color: Color.DimGray,
    fontSize: FontSize.h6 * 1.1,
    paddingHorizontal: 15,
    paddingVertical: 18,
  },
  text2: {color: Color.DimGray, fontSize: FontSize.h5},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15,
    marginHorizontal: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: Color.Darkgray,
  },
  textInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Platform.OS === 'ios' ? 15 / 2 : 5,
    fontSize: FontSize.h5,
    paddingRight: 10,
    paddingLeft: 8,
  },
  buttonSearch: {
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 30,
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 15,
    alignSelf: 'center',
  },
  item: {
    paddingVertical: 7,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {fontSize: FontSize.h4 * 0.95, marginBottom: 6},
});
export default AddFriend;
