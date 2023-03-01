import Header from '@components/Header';
import {Color, FontSize, image} from '@constants';
import {fontFamily} from '@fonts/Font';
import {Icon} from '@icon/index';
import {
  IHeaderEnum,
  IOptionEnum,
  IPeronalEnum,
  IPreviewImageEnum,
} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/core';
import {AppDispatch, RootState} from '@store/index';
import {windowHeight, windowWidth} from '@utils/Dimensions';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  GestureResponderEvent,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {
  data,
  optionChangeAvatar,
  optionChangeBackground,
  optionStatus,
} from '../data';
import Opstion from './Opstion';
import isIos from '@utils/Platform';
import isAndroid from '@utils/Platform';
import RenderStatus from './RenderStatus';
import FastImage from 'react-native-fast-image';
import {getUserProfile, IUser} from '@store/slice/user/userSlice';
import {
  deletePost,
  deleteStatus,
  getStatus,
  likeStatus,
  setLikePost,
} from '@store/slice/contents/contentsSlice';
import {AnimatedScrollView} from '@kanelloc/react-native-animated-header-scroll-view';
import HeaderNavbar from './HeaderNavbar';
import TopNavBar from './TopNavBar';
import moment from 'moment';
import ImageView from 'react-native-image-viewing';
import {startLoading} from '@store/slice/app/appSlice';
interface IRenderUserUI {
  urlAvatar: string | undefined;
  name: string | undefined;
  urlBackground?: string;
  onPressImage?: (event: GestureResponderEvent) => void;
  type?: string;
  onPressMessage?: (event: GestureResponderEvent) => void;
  loading?: {
    status?: boolean | undefined;
    timeOut?: number | undefined;
  };
  profile?: any;
  profileFriend?: any;
}

const RenderUserUI = ({
  urlBackground,
  urlAvatar,
  name,
  onPressImage,
  type,
  onPressMessage,
  loading,
  profile,
  profileFriend,
}: IRenderUserUI) => {
  const navigation = useNavigation<any>();
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const {profileUser} = useSelector((state: RootState) => state.user);
  const {dataContents} = useSelector((state: RootState) => state.contents);
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [opstion, setOpstion] = useState<any>([]);
  const [itemApp, setItem] = useState<any>();
  const [Loading, setLoading] = useState<boolean | undefined>(loading?.status);
  const [typeOpstion, setTypeOpstion] = useState<string>('');
  const newProfileUser = {
    ...profileUser,
    timeStamp: moment().format('L'),
    status: 2,
  };
  delete newProfileUser?.listFriendInvitations;
  delete newProfileUser?.listFriend;
  useLayoutEffect(() => {
    if (type === IPeronalEnum.Friend) {
      dispatch(getStatus({numberPhone: profileFriend.numberPhone}));
    }
  }, []);
  const dataStatus = [...dataContents?.listStatusContents];
  if (Loading) {
    setTimeout(() => {
      dispatch(getStatus({numberPhone: profileUser.numberPhone}));
      setLoading(false);
    }, loading?.timeOut);
  }
  const updateAvatar = async (avatar: string) => {
    try {
      await firestore()
        .collection('Users')
        .doc(profileUser.UserId)
        .update({avatar});
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(getUserProfile({uid: profileUser?.uid}));
    }
  };
  const updateBackground = async (background: string) => {
    try {
      await firestore()
        .collection('Users')
        .doc(profileUser.UserId)
        .update({background});
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(getUserProfile({uid: profileUser?.uid}));
    }
  };
  const getImageInAlbum = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((images: any) => {
      updateAvatar(`data:${images.mime};base64,${images.data}`);
      setIsSelect(false);
    });
  };
  const getBackgroundInAlbum = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 400,
      includeBase64: true,
      cropping: true,
    }).then((images: any) => {
      updateBackground(`data:${images.mime};base64,${images.data}`);
      setIsSelect(false);
    });
  };
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 200,
      includeBase64: true,
      cropping: true,
    }).then((images: any) => {
      updateAvatar(`data:${images.mime};base64,${images.data}`);
    });
  };

  return (
    <View style={styles.container}>
      <AnimatedScrollView
        headerMaxHeight={270}
        topBarHeight={Platform.OS === 'ios' ? 90 : 70}
        HeaderNavbarComponent={<HeaderNavbar />}
        TopNavBarComponent={
          <>
            <TopNavBar
              avatar={urlAvatar ? urlAvatar : image.background}
              userName={
                type === IPeronalEnum.Friend
                  ? profileFriend?.username
                  : profileUser?.username
              }
            />
            {isSelect && (
              <FastImage
                style={{
                  width: windowWidth,
                  height: Platform.OS === 'android' ? 70 : 90,
                  position: 'absolute',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                }}
              />
            )}
          </>
        }
        showsVerticalScrollIndicator={false}
        HeaderComponent={
          type !== IPeronalEnum.Friend && (
            <Pressable
              style={styles.backgroundChange}
              onPress={() => {
                setIsSelect(true);
                setOpstion(optionChangeBackground);
                setTypeOpstion(IOptionEnum.Avatar);
              }}
            />
          )
        }
        headerImage={{uri: urlBackground ? urlBackground : image.background}}>
        <View>
          {type !== IPeronalEnum.Friend && (
            <Opstion
              type={typeOpstion}
              isSelect={isSelect}
              data={opstion}
              onPressCancel={() => setIsSelect(false)}
              onRequestClose={() => setIsSelect(false)}
              onPress3={() => {
                if (opstion === optionChangeBackground) {
                  getBackgroundInAlbum();
                } else {
                  getImageInAlbum();
                }
              }}
              onPress2={() => openCamera()}
              onDeleteStatus={async () => {
                await setIsSelect(false);
                Alert.alert(
                  'Xoá bài đăng này',
                  'Bạn có thể chỉnh sửa nội dung bài viết này thay vì xoá nó',
                  [
                    {
                      text: 'Xoá',
                      style: 'destructive',

                      onPress: async () => {
                        await dispatch(
                          deleteStatus({
                            numberPhone: profileUser.numberPhone,
                            contents: itemApp.item,
                          }),
                        ).unwrap();
                        dispatch(
                          getStatus({
                            numberPhone: profileUser.numberPhone,
                          }),
                        );
                      },
                    },
                    {
                      text: 'Chỉnh sửa',
                    },
                    {
                      text: 'Huỷ',
                    },
                  ],
                );
              }}
            />
          )}

          <View style={styles.body}>
            <Pressable
              onPress={async () => {
                if (type !== IPeronalEnum.Friend) {
                  setIsSelect(true);
                  setOpstion(optionChangeAvatar);
                  setTypeOpstion(IOptionEnum.Avatar);
                }
              }}
              style={styles.borderAvatar}>
              <FastImage
                source={{
                  uri: urlAvatar ? urlAvatar : image.background,
                }}
                style={styles.avatar}
              />
            </Pressable>
            <Text style={styles.userName}>{name}</Text>
            {(type === IPeronalEnum.Friend &&
              dataContents?.listStatusContents?.length === 0) ||
              (dataContents?.listStatusContents === undefined &&
                type === IPeronalEnum.Friend && (
                  <Text
                    style={[styles.depcription, styles.textDepcriptionFriend]}>
                    Chưa có hoạt động nào. Hãy trò chuyện để hiểu nhau hơn!
                  </Text>
                ))}
            {type !== IPeronalEnum.Friend && (
              <>
                <TouchableOpacity style={styles.depcription}>
                  <IconAntDesign name={'edit'} size={18} color={Color.blue2} />
                  <Text style={styles.textDepcription}>
                    Cập nhật giới thiệu bản thân
                  </Text>
                </TouchableOpacity>
                <FlatList
                  data={data}
                  style={{top: -40}}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  extraData={(item: any) => item.id}
                  renderItem={({item}) => (
                    <TouchableOpacity style={styles.buttom}>
                      <FastImage source={item.icon} style={styles.iconLabel} />
                      <Text style={styles.label}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
                <Pressable
                  style={styles.textInput1}
                  onPress={() =>
                    navigation.navigate(RouterName.PostStatus, {
                      numberPhone: profileUser.numberPhone,
                    })
                  }>
                  <View style={styles.textInput}>
                    <Text style={styles.text}>Bạn đang nghĩ gì?</Text>
                  </View>

                  <TouchableOpacity onPress={onPressImage}>
                    <FastImage
                      source={Icon.photo}
                      style={styles.iconPhoto}
                      tintColor={'rgb(120, 190, 29)'}
                    />
                  </TouchableOpacity>
                </Pressable>
              </>
            )}
          </View>
          {dataContents?.listStatusContents?.length > 0 &&
            dataStatus?.reverse()?.map((item: any, key: any, index: any) => (
              <View
                key={item.dayOfPostStatus.hour}
                style={{marginLeft: 25, marginRight: 10}}>
                <View style={styles.day}>
                  <Text
                    style={{
                      fontSize: FontSize.h5,
                      color: 'black',
                      paddingHorizontal: 10,
                    }}>
                    {`${item?.dayOfPostStatus?.day.slice(
                      3,
                      5,
                    )} tháng ${item?.dayOfPostStatus?.day.slice(
                      0,
                      2,
                    )}, ${item?.dayOfPostStatus?.day.slice(6, 10)}`}
                  </Text>
                </View>
                <RenderStatus
                  data={item}
                  profile={profile}
                  newProfileUser={newProfileUser}
                  onPressLike={() => {
                    const newLikes = [...item?.likes];
                    newLikes.push(newProfileUser);

                    setTimeout(() => {
                      dispatch(
                        likeStatus({
                          dataContents,
                          numberPhone:
                            type === IPeronalEnum.Friend
                              ? profileFriend.numberPhone
                              : profileUser.numberPhone,
                          contents: item,
                          likeStatus: true,
                          profile: profile,
                          newLikes,
                        }),
                      );
                      dispatch(
                        getStatus({
                          numberPhone:
                            type === IPeronalEnum.Friend
                              ? profileFriend.numberPhone
                              : profileUser.numberPhone,
                        }),
                      );
                    }, 500);
                  }}
                  onPressUnLike={async () => {
                    const newLike = [...item?.likes];
                    const arr = newLike.filter(
                      (item1: any) =>
                        item1.numberPhone !== profileUser.numberPhone,
                    );
                    await dispatch(
                      likeStatus({
                        dataContents,
                        numberPhone:
                          type === IPeronalEnum.Friend
                            ? profileFriend.numberPhone
                            : profileUser.numberPhone,
                        contents: item,
                        likeStatus: false,
                        profile: profile,
                        newLikes: arr,
                      }),
                    ).unwrap();
                    dispatch(
                      getStatus({
                        numberPhone:
                          type === IPeronalEnum.Friend
                            ? profileFriend.numberPhone
                            : profileUser.numberPhone,
                      }),
                    );
                  }}
                  onPressOption={() => {
                    setIsSelect(true);
                    setOpstion(optionStatus);
                    setTypeOpstion(IOptionEnum.HandleStatus);
                    setItem({item, index});
                  }}
                  onPressComments={() => {
                    navigation.navigate(RouterName.CommentScreen, {
                      data: item,
                      profile: profileUser,
                      newProfileUser,
                      profileFriend,
                      type,
                      dataContents,
                    });
                  }}
                />
              </View>
            ))}
        </View>
        {isSelect && (
          <FastImage
            style={{
              width: windowWidth,
              height: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}
          />
        )}
      </AnimatedScrollView>
      {type === IPeronalEnum.Friend && (
        <TouchableOpacity
          style={[styles.button, styles.message, {marginBottom: inset.bottom}]}
          onPress={onPressMessage}>
          <IconAntDesign name={'message1'} size={20} color={Color.blue} />
          <Text style={styles.textMessage}>Nhắn tin</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RenderUserUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: windowHeight / 3,
  },
  body: {
    alignItems: 'center',
  },
  borderAvatar: {
    top: -85,
    borderWidth: 3,
    borderRadius: 150 / 2,
    borderColor: 'white',
    alignItems: 'center',
    position: 'relative',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
  },
  userName: {
    top: -80,
    fontFamily: fontFamily.RobotoMedium,
    color: Color.DimGray,
    fontSize: FontSize.h4,
  },
  depcription: {flexDirection: 'row', top: -60},
  textDepcription: {
    color: Color.blue2,
    fontFamily: fontFamily.primaryFont,
    marginLeft: 5,
  },
  textDepcriptionFriend: {width: 300, textAlign: 'center', color: 'gray'},
  iconLabel: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  buttom: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 15,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 10,
  },
  label: {
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
  },
  iconPhoto: {
    width: 22,
    height: 22,

    margin: 15,
  },
  textInput: {
    flex: 1,
    borderRightWidth: 0.5,
    borderRightColor: Color.Darkgray,
    paddingVertical: Platform.OS === 'ios' ? 7 : 2,
    paddingLeft: 15,
  },
  textInput1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 10,
    borderRadius: 5,
    top: -30,
  },
  text: {
    color: Color.DimGray,
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h4 * 0.9,
  },
  backgroundChange: {
    flex: 1,
    height: 100,
    marginTop: 100,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 55,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  message: {
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 7,
    position: 'absolute',
    right: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 50,
    bottom: Platform.OS === 'ios' ? 10 : 30,
  },
  textMessage: {
    fontFamily: fontFamily.SanFranciscoDisplayMedium,
    color: Color.DimGray,
    fontWeight: '500',
    paddingLeft: 5,
  },
  day: {
    backgroundColor: Color.Gainsboro,
    borderRadius: 5,
    width: 150,
    alignItems: 'center',
    paddingVertical: 4,
    marginBottom: 10,
  },
});
