import Header from '@components/Header';
import StatusBar, {Constants} from '@components/StatusBar';
import {Color, FontSize} from '@constants';
import {fontFamily} from '@fonts/Font';
import {
  IHeaderEnum,
  IPeronalEnum,
  IPreviewImageEnum,
} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '@store/index';
import {endLoading, startLoading} from '@store/slice/app/appSlice';
import {
  addImagetoList,
  getStatus,
  resetListImages,
} from '@store/slice/contents/contentsSlice';
import {getMessage, sentMessage} from '@store/slice/message/messageSlice';
import {addProfileFriend} from '@store/slice/profileFriend/profileFriendSlice';
import Platform from '@utils/Platform';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import {useDispatch, useSelector} from 'react-redux';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';
import {windowHeight, windowWidth} from '@utils/Dimensions';

const Message = ({route}: {route: any}) => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const inset = useSafeAreaInsets();
  const {name, profileFriend, type} = route?.params;
  const {profileUser} = useSelector((state: RootState) => state?.user);
  const {Messages} = useSelector((state: RootState) => state?.message);
  const [paddingBottom, setPaddingBottom] = useState<boolean>(true);
  const [messageApp, setMessage] = useState<string>('');
  const data = Messages?.message?.filter(
    (item: any) =>
      item.phoneOfSender === profileFriend.numberPhone ||
      item.phoneOfReceive === profileFriend.numberPhone,
  );

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
      setPaddingBottom(false);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setPaddingBottom(true);
    });
  }, []);
  useEffect(() => {
    dispatch(getMessage({numberPhone: profileUser.numberPhone}));
  }, []);
  const onGetStatus = async () => {
    dispatch(startLoading());
    await dispatch(
      getStatus({
        numberPhone: profileFriend.numberPhone,
      }),
    ).unwrap();
    dispatch(endLoading());
  };
  const onSentMessage = (message: string) => {
    setMessage('');
    dispatch(
      sentMessage({
        numberPhone: profileFriend.numberPhone,
        message: {
          phoneOfSender: profileUser.numberPhone,
          isReceive: true,
          message: message,
          timeReceive: {
            hour: moment().format('LT'),
            day: moment().format('L'),
          },
        },
      }),
    );
    dispatch(
      sentMessage({
        numberPhone: profileUser.numberPhone,
        message: {
          phoneOfReceive: profileFriend.numberPhone,
          isSender: true,
          message: message,
          timeSent: {
            hour: moment().format('LT'),
            day: moment().format('L'),
          },
        },
      }),
    );
    dispatch(getMessage({numberPhone: profileUser.numberPhone}));
  };
  const GetURLMediaToStorage = (image: string) => {
    storage()
      .ref(image.substring(image.lastIndexOf('/') + 1))
      .getDownloadURL()
      .then((imageURL: string) => {
        onSentMessage(imageURL);
        console.log('Tải URL thành công');
      })
      .catch(() => console.log('Tải URL thất bại'));
  };
  const UploadMediaToStorage = (image: any) => {
    storage()
      .ref(image.substring(image.lastIndexOf('/') + 1))
      .putFile(Platform.isIos ? image.replace('file://', '') : image)
      .then(() => {
        console.log('Đăng ảnh thành công');
        GetURLMediaToStorage(image);
      })
      .catch(() => console.log('Đăng ảnh thất bại'));
  };

  const getImagesInAlbum = () => {
    ImagePicker.openPicker({
      width: 700,
      height: 700,
      cropping: true,
    }).then((images: any) => {
      const dataImg = images.path;
      UploadMediaToStorage(dataImg);
    });
  };
  const renderUI = (item: any) => {
    return (
      <View
        style={{
          flexDirection: item.isSender ? 'row-reverse' : 'row',
          alignItems: 'center',
          marginBottom: 5,
        }}>
        {item.isReceive &&
          (item.isReceive ? (
            <Image style={styles.avatar} source={{uri: profileFriend.avatar}} />
          ) : (
            <View style={{width: 30}} />
          ))}
        {item.message.includes('firebasestorage') ? (
          <Pressable
            onPress={() => {
              navigation.navigate(RouterName.PreViewImage, {
                UrlImage: item.message,
                type: IPreviewImageEnum.Photoshop,
              });
            }}>
            <FastImage source={{uri: item.message}} style={styles.image}>
              <View style={styles.hd}>
                <Text style={styles.textHd}>HD</Text>
              </View>
            </FastImage>
            <TouchableOpacity>
              <View style={styles.heart}>
                <IconEvilIcons name={'heart'} size={24} color={Color.icon} />
              </View>
            </TouchableOpacity>
          </Pressable>
        ) : (
          <TouchableOpacity
            style={[
              styles.viewMessage,
              {backgroundColor: item.isReceive ? 'white' : Color.message},
            ]}>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.message}>
              {item.isReceive ? item.timeReceive?.hour : item.timeSent?.hour}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.isIos ? 'padding' : undefined}
      style={styles.container}>
      <View style={styles.container}>
        <Header
          onPress={() => {
            type === IHeaderEnum.Phonebook
              ? navigation.goBack()
              : navigation.navigate(RouterName.HomeMessage);
            dispatch(resetListImages());
          }}
          type={IHeaderEnum.Message}
          label={name ? name : profileFriend.username}
          onPressUser={async () => {
            dispatch(addProfileFriend(profileFriend));
            onGetStatus();
            navigation.navigate(RouterName.Personal, {
              profile: profileFriend,
              type: IPeronalEnum.Friend,
            });
          }}
          onPressIconRight3={() => {
            navigation.navigate(RouterName.Optional, {
              profile: profileFriend,
            });
          }}
        />
        <FlatList
          inverted
          contentContainerStyle={styles.contentContainerStyle}
          data={data?.reverse()}
          renderItem={({item}) => renderUI(item)}
        />

        <View
          style={[
            styles.viewTextInput,
            {paddingBottom: paddingBottom ? inset.bottom : 0},
          ]}>
          <TouchableOpacity>
            <IconSimple name={'emotsmile'} size={26} color={Color.DimGray} />
          </TouchableOpacity>
          <TextInput
            value={messageApp}
            multiline={true}
            placeholder="Tin nhắn"
            onChangeText={(text: string) => setMessage(text)}
            style={styles.textInput}
          />
          {messageApp !== '' ? (
            <TouchableOpacity
              onPress={() => {
                onSentMessage(messageApp.trim());
              }}>
              <IconIonicons name={'send'} size={24} color={Color.primary} />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity>
                <IconSimple name={'options'} size={26} color={Color.DimGray} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconR}>
                <IconSimple
                  name={'microphone'}
                  size={26}
                  color={Color.DimGray}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dispatch(resetListImages());

                  getImagesInAlbum();
                }}>
                <IconSimple name={'picture'} size={26} color={Color.DimGray} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <StatusBar
        mode={Constants.statusBar.light}
        navigation={navigation}
        backgroundColor={Color.primary}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  avatar: {
    width: 30,
    height: 30,
    marginVertical: 10,
    borderRadius: 60 / 2,
  },
  viewMessage: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Color.Darkgray,
  },
  userName: {
    fontSize: FontSize.h4,
    fontFamily: fontFamily.primaryFont,
  },
  message: {
    fontSize: FontSize.h5,
    fontFamily: fontFamily.primaryFont,
  },
  iconR: {
    paddingHorizontal: 20,
  },
  textInput: {
    flex: 1,
    paddingVertical: Platform.isIos ? 5 : 10,
    fontSize: FontSize.h4,
    paddingHorizontal: 10,
  },
  viewTextInput: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Platform.isIos ? 10 : 0,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  heart: {
    bottom: 5,
    right: 0,
    width: 27,
    height: 27,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  contentContainerStyle: {
    marginHorizontal: 15,
    paddingBottom: 20,
  },
  image: {
    width: windowWidth / 1.5,
    height: windowHeight / 3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 20,
  },
  hd: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    margin: 10,
    width: 30,
    alignItems: 'center',
    borderRadius: 10,
  },
  textHd: {
    fontFamily: fontFamily.fontZalo,
    fontSize: FontSize.h6 * 0.9,
  },
});
export default Message;
