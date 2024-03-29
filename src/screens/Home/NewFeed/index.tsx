import Header from '@components/Header';
import {
  RenderImage1,
  RenderImage2,
  RenderImage3,
  RenderImage4,
} from '@components/RenderImage';
import Color from '@constants/Color';
import FontSize from '@constants/FontSize';
import {fontFamily} from '@fonts/Font';
import {Icon} from '@icon/index';
import {IHeaderEnum, IPeronalEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {RootState} from '@store/index';
import {endLoading, startLoading} from '@store/slice/app/appSlice';
import {
  getAllStatus,
  getStatus,
  likeStatus,
  setLikePost,
} from '@store/slice/contents/contentsSlice';
import Platform from '@utils/Platform';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import HeaderViewing from '../ Personal/components/HeaderViewing';
import {OpstionHeader} from './data';

const NewFeed = () => {
  const navigation = useNavigation<any>();
  const {bottom} = useSafeAreaInsets();
  const {profileUser} = useSelector((state: RootState) => state.user);
  const {AllStatus} = useSelector((state: RootState) => state.contents);
  const {dataContents, indexImg} = useSelector(
    (state: RootState) => state.contents,
  );
  const dispatch = useDispatch<any>();
  const [visible, setIsVisible] = useState(false);
  const [itemApp, setItem] = useState<any>([]);
  const [quantity, setQuantity] = useState<any>();
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
    dispatch(getAllStatus({profileUser}));
    setTimeout(() => {
      dispatch(endLoading());
    }, 1500);
  };
  useEffect(() => {
    onGetAllStatus();
  }, []);
  useFocusEffect(
    useCallback(() => {
      dispatch(getAllStatus({profileUser}));
    }, []),
  );
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
  const renderUI = (item: any, index: number) => {
    const isLikeUser = item?.likes?.some(
      (items: any) => items?.uid === profileUser?.uid,
    );
    const isLikeUsers = itemApp?.likes?.some(
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
      <>
        <ImageView
          images={itemApp?.media?.map((img: any) => {
            return {uri: img};
          })}
          imageIndex={indexImg}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
          HeaderComponent={() => (
            <HeaderViewing
              onPressClose={() => {
                setIsVisible(false);
                dispatch(getAllStatus({profileUser}));
              }}
            />
          )}
          FooterComponent={() => (
            <>
              <View style={styles.content}>
                <Text style={styles.textContents}>{itemApp?.textContent}</Text>
              </View>
              <View
                style={[
                  styles.iconLeft,
                  {paddingBottom: Platform.isIos ? bottom * 1.2 : 20},
                ]}>
                <TouchableOpacity
                  key={itemApp.dayOfPostStatus.hour}
                  onPress={() => {
                    setLike(!like);
                    setQuantity(
                      !like
                        ? itemApp?.likes?.length - 1
                        : itemApp?.likes?.length + 1,
                    );
                    !like ? onPressUnLike(itemApp) : onPressLike(itemApp);
                  }}
                  style={styles.heart}>
                  {!isLikeUsers ? (
                    <IconFontAwesome
                      name={'heart-o'}
                      size={24}
                      color={'white'}
                    />
                  ) : (
                    <IconAntDesign
                      name={'heart'}
                      size={24}
                      color={Color.heart}
                    />
                  )}
                  <Text style={[styles.likes, {color: 'white'}]}>
                    {itemApp?.likes?.length}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={() => {}}>
                  <FastImage
                    source={Icon.comments}
                    style={styles.comment}
                    tintColor={'white'}
                  />
                  <Text style={[styles.likes, {color: 'white'}]}>
                    {itemApp.comments?.length}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        />

        <Pressable
          style={styles.renderUI}
          onPress={() => onPressComments(item)}>
          <View style={[styles.view1]}>
            <Pressable
              onPress={() => {
                navigation.navigate(RouterName.Personal, {
                  profile: item.profile,
                  type: IPeronalEnum.Friend,
                });
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
                  setItem(item);
                  setQuantity(itemApp?.likes?.length);
                  setIsVisible(true);
                }}
              />
            ) : item?.media.length === 2 ? (
              <RenderImage2
                ListImage={item?.media}
                onPressImg={() => {
                  setItem(item);
                  setQuantity(itemApp?.likes?.length);
                  setIsVisible(true);
                }}
              />
            ) : item?.media.length > 2 && item?.media.length < 5 ? (
              <RenderImage3
                ListImage={item?.media}
                onPressImg={() => {
                  setItem(item);
                  setQuantity(itemApp?.likes?.length);
                  setIsVisible(true);
                }}
              />
            ) : item?.media.length > 4 ? (
              <RenderImage4
                ListImage={item?.media}
                onPressImg={() => {
                  setItem(item);
                  setQuantity(itemApp?.likes?.length);
                  setIsVisible(true);
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
                // console.log({isLikeUser});
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
      </>
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
