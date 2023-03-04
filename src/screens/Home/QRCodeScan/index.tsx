import StatusBar, {Constants} from '@components/StatusBar';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {RNCamera} from 'react-native-camera';

import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import IconEntypo from 'react-native-vector-icons/Entypo';
import {RouterName} from '@navigation/rootName';
import {useDispatch, useSelector} from 'react-redux';
import {addProfileFriend} from '@store/slice/profileFriend/profileFriendSlice';
import {RootState} from '@store/index';
import {IPeronalEnum} from '@model/handelConfig';

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const dispatch = useDispatch<any>();
  const {profileUser} = useSelector((state: RootState) => state.user);

  const getFriendByPhoneNumber = async (phoneNumber: string) => {
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
            [{text: 'Đóng', onPress: () => navigation.goBack()}],
          );
          navigation.goBack();
          return;
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
            isFromQRcode: true,
          });
        }
      });
  };
  return isFocused ? (
    <>
      <StatusBar mode={Constants.statusBar.dark} navigation={navigation} />

      <RNCamera
        // ref={ref => {
        //   this.camera = ref;
        // }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          if (barcodes[0]?.data && barcodes[0]?.data?.length === 10) {
            return getFriendByPhoneNumber(barcodes[0]?.data);
          }
        }}
      />
      <TouchableOpacity
        style={{position: 'absolute', top: 16, left: 16, zIndex: 99}}
        onPress={() => navigation.goBack()}>
        <IconEntypo name="chevron-thin-left" size={20} color={'white'} />
      </TouchableOpacity>

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0.2, 0.2, 0.2, 0.2)',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            width: 300,
            height: 300,
            backgroundColor: 'transparent',
            borderColor: 'white',
            borderWidth: 1,
          }}
        />
      </View>
    </>
  ) : (
    <View>
      <Text>kaka</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
