import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  Pressable,
  ScrollView,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import Header from '@components/Header';
import {IHeaderEnum, IPeronalEnum} from '@model/handelConfig';
import {Icon} from '@icon/index';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {fontFamily} from '@fonts/Font';
import Color from '@constants/Color';
import FontSize from '@constants/FontSize';
import UIButton from '@components/UIButton';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllStatus,
  getStatus,
  likeStatus,
  sentComment,
  setLikePost,
} from '@store/slice/contents/contentsSlice';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {
  RenderImage1,
  RenderImage2,
  RenderImage3,
  RenderImage4,
} from '@components/RenderImage';
import ImageView from 'react-native-image-viewing';
import Platform from '@utils/Platform';
import HeaderViewing from '../ Personal/components/HeaderViewing';
import {RootState} from '@store/index';
import {OpstionHeader} from './data';
import moment from 'moment';
import {endLoading, startLoading} from '@store/slice/app/appSlice';

const NewFeed = () => {
  const navigation = useNavigation<any>();
  const {bottom} = useSafeAreaInsets();
  const {profileUser} = useSelector((state: RootState) => state.user);
  const {AllStatus} = useSelector((state: RootState) => state.contents);
  const {dataContents} = useSelector((state: RootState) => state.contents);
  const dispatch = useDispatch<any>();
  const [visible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  // const [indexs, setIndex] = useState<any>();
  // const [itemApp, setItem] = useState<any>();
  const [refreshing, setRefreshing] = useState(false);
  const [like, setLike] = useState<boolean>(true);
  const newProfileUser = {
    ...profileUser,
    timeStamp: moment().format('L'),
    status: 2,
  };
  delete newProfileUser?.listFriendInvitations;
  delete newProfileUser?.listFriend;
  const onGetAllStatus = async () => {
    dispatch(startLoading());
    await dispatch(getAllStatus({profileUser})).unwrap();
    dispatch(endLoading());
  };
  useEffect(() => {
    onGetAllStatus();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getAllStatus({profileUser}));
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, []);

  const onPressComments = async (item: any) => {
    const items = {...item};
    delete items.profile;
    if (item?.profile) {
      await dispatch(
        getStatus({
          numberPhone: item?.profile.numberPhone,
        }),
      );
    }

    navigation.navigate(RouterName.CommentScreen, {
      items,
      profile: profileUser,
      newProfileUser,
      profileFriend: item?.profile,
      type: item?.profile !== undefined ? IPeronalEnum.Friend : 'user',
    });
  };

  const onPressUnLike = async (item: any) => {
    const newLike = [...item?.likes];
    const arr = newLike.filter(
      (item1: any) => item1.numberPhone !== profileUser.numberPhone,
    );
    const items = {...item};
    delete items.profile;
    const arrs = await dispatch(
      getStatus({numberPhone: item.profile.numberPhone}),
    ).unwrap();
    dispatch(
      likeStatus({
        dataContents: arrs,
        numberPhone: item?.profile.numberPhone,
        contents: item,
        likeStatus: false,
        newLikes: arr,
      }),
    );
    console.log({dataContents});
  };
  const onPressLike = async (item: any) => {
    const newLikes = [...item?.likes];
    newLikes.push(newProfileUser);
    const arr = await dispatch(
      getStatus({numberPhone: item.profile.numberPhone}),
    ).unwrap();

    dispatch(
      likeStatus({
        dataContents: arr,
        numberPhone: item?.profile.numberPhone,
        contents: item,
        likeStatus: true,
        newLikes,
        profileUser,
      }),
    );
  };
  const datata = [...AllStatus].sort(function (a, b) {
    return b.id - a.id;
  });
  // console.log(datata);

  // console.log({moment: moment()});

  const renderUI = (item: any, index: number) => {
    const datas = item?.media?.map((img: any, id: number) => {
      return {uri: img};
    });
    const isLikeUser = item?.likes?.some(
      (items: any) => items?.uid === profileUser?.uid,
    );
    let m1 = moment(
      `${moment(
        `${item.dayOfPostStatus.day} ${item.dayOfPostStatus.hour}`,
        'MM/DD/YYYY HH:mm:ss A',
      ).format('MM/DD/YYYY HH:mm:ss A')}`,
      'MM/DD/YYYY HH:mm:ss A',
    );
    let m2 = moment(
      `${moment().format('MM/DD/YYYY HH:mm:ss A')}`,
      'MM/DD/YYYY HH:mm:ss A',
    );
    const diff = m2.diff(m1, 'minute');
    const resultTime =
      Math.floor(diff / 60) < 1
        ? diff + ' phút trước'
        : Math.floor(diff / 60) >= 1 && Math.floor(diff / 60) <= 24
        ? Math.floor(diff / 60) + ' giờ trước'
        : Math.floor(diff / 1440) + ' ngày trước';
    return (
      <Pressable style={styles.renderUI} onPress={() => onPressComments(item)}>
        <View style={[styles.view1]}>
          <Pressable
            onPress={() => {
              navigation.navigate(RouterName.Personal, {
                profile: item.profile,
                type: IPeronalEnum.Friend,
              });
              // console.log({item: item.profile});
            }}>
            <FastImage
              source={{
                uri: item.profile.avatar,
              }}
              style={styles.avatar}
            />
          </Pressable>
          <View>
            <TouchableOpacity>
              <Text style={styles.labelStyle}>{item.profile.username}</Text>
            </TouchableOpacity>
            <View style={styles.row}>
              <Text style={styles.description}>{resultTime}</Text>
            </View>
          </View>
        </View>
        {item?.textContent !== '' && (
          <Text
            style={[
              styles.textContent,
              {
                fontFamily: item?.stylesText?.fontFamily,
                color: item?.stylesText?.color,
              },
            ]}>
            {item?.textContent}
          </Text>
        )}
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 15,
          }}>
          {item.media.length === 1 ? (
            <RenderImage1
              ListImage={item?.media}
              onPressImg={() => {
                // setIsVisible(true);
                // setIndex(index);
                // setItem(item);
              }}
            />
          ) : item?.media.length === 2 ? (
            <RenderImage2
              ListImage={item?.media}
              onPressImg={() => {
                // setIsVisible(true);
                // setIndex(index);
              }}
            />
          ) : item?.media.length > 2 && item?.media.length < 5 ? (
            <RenderImage3
              ListImage={item?.media}
              onPressImg={() => {
                // setIsVisible(true);
                // setIndex(index);
              }}
            />
          ) : item?.media.length > 4 ? (
            <RenderImage4
              ListImage={item?.media}
              onPressImg={() => {
                // setIsVisible(true);
                // setIndex(index);
              }}
            />
          ) : (
            <View />
          )}
        </View>
        <View style={[styles.iconLeft]}>
          <TouchableOpacity
            onPress={async () => {
              const items = {...item};
              delete items.profile;
              console.log({isLikeUser});
              dispatch(
                setLikePost({
                  isLike: isLikeUser,
                  data: item,
                  uid: profileUser?.uid,
                  newProfileUser,
                  type: 'newFeed',
                }),
              );
              isLikeUser ? onPressUnLike(item) : onPressLike(item);
            }}
            style={styles.heart}>
            {!isLikeUser ? (
              <IconFontAwesome name={'heart-o'} size={24} color={'black'} />
            ) : (
              <IconAntDesign name={'heart'} size={24} color={Color.heart} />
            )}
            <Text style={styles.likes}>{item.likes.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              onPressComments(item);
            }}>
            <FastImage
              source={Icon.comments}
              style={styles.comment}
              tintColor={'black'}
            />
            <Text style={styles.likes}>{item.comments.length}</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <Header
        placeholder={'Tìm kiếm'}
        type={IHeaderEnum.Home}
        nameIconRight2={Icon.notification}
        nameIconRight1={Icon.create}
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            style={{backgroundColor: 'white'}}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={styles.header}>
          <View style={styles.row}>
            <FastImage
              source={{
                uri: profileUser?.avatar,
              }}
              style={styles.avatar}
            />
            {
              <Pressable
                onPress={() => {
                  navigation.navigate(RouterName.PostStatus, {
                    numberPhone: profileUser.numberPhone,
                  });
                }}>
                <Text style={styles.textInput}>Hôm nay bạn thế nào?</Text>
              </Pressable>
            }
          </View>
          <View style={[styles.row, styles.opstionHeader]}>
            {OpstionHeader.map((item: any) => (
              <TouchableOpacity style={[styles.row, styles.buttonheader]}>
                <FastImage source={item.icon} style={styles.iconHeader} />
                <Text style={styles.labelHeader}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={[styles.header, styles.story]}>
          <Text style={styles.labelStory}>Khoảnh khắc</Text>

          <FastImage
            source={{uri: profileUser?.avatar}}
            style={styles.imageStory}
          />
        </View>
        <FlatList
          data={datata}
          renderItem={({item, index}) => renderUI(item, index)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  textInput: {
    fontSize: FontSize.h4 * 0.9,
    color: Color.icon,
  },
  iconHeader: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
  labelHeader: {
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h5 * 0.86,
    color: Color.DimGray,
  },
  buttonheader: {
    backgroundColor: Color.reject,
    borderRadius: 30,
    paddingVertical: 7,
    paddingHorizontal: 15,
    marginHorizontal: 2.5,
  },
  header: {
    backgroundColor: 'white',
    marginBottom: 12,
  },
  opstionHeader: {
    justifyContent: 'center',
    paddingBottom: 10,
  },
  imageStory: {
    width: 100,
    height: 150,
    borderRadius: 6,
  },
  labelStory: {
    fontFamily: fontFamily.RobotoMedium,
    fontSize: FontSize.h5,
    color: Color.DimGray,
    paddingVertical: 10,
  },
  story: {paddingLeft: 20, paddingBottom: 12},
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  labelStyle: {
    fontFamily: fontFamily.RobotoMedium,
    color: Color.DimGray,
    fontSize: FontSize.h4 * 0.9,
    marginBottom: 5,
  },
  description: {
    fontFamily: fontFamily.primaryFont,
    color: Color.icon,
    fontSize: FontSize.h5 * 0.85,
  },
  renderUI: {
    backgroundColor: 'white',
    marginBottom: 12,
  },
  textContent: {
    fontSize: FontSize.h4,
    marginLeft: 10,
  },
  content: {
    marginVertical: 30,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Color.DimGray,
    marginHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  textContents: {
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h4 * 0.9,
    color: 'white',
  },
  heart: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  iconLeft: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  comment: {width: 28, height: 28, marginLeft: 20},
  likes: {
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
    fontSize: FontSize.h4,
    marginHorizontal: 8,
  },
  heart2: {marginLeft: 20, marginBottom: 20, marginTop: 5},
  like: {
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
    fontSize: FontSize.h4,
    marginHorizontal: 5,
  },
});
export default NewFeed;
