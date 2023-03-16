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
import {useNavigation} from '@react-navigation/native';
import {RootState} from '@store/index';
import {
  getAllStatus,
  getStatus,
  likeStatus,
  sentComment,
  updateComment,
  updateComment2,
} from '@store/slice/contents/contentsSlice';
import Platform from '@utils/Platform';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
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
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import HeaderViewing from '../ Personal/components/HeaderViewing';
import CustomInput from './components/CustomInput';

const CommentScreen = ({route}: {route: any}) => {
  const dispatch = useDispatch<any>();
  const {dataContents, dataComments, indexImg} = useSelector(
    (state: RootState) => state.contents,
  );
  const {profileUser} = useSelector((state: RootState) => state.user);
  const {profile, newProfileUser, profileFriend, type, index, items} =
    route?.params;
  const arrs = [...dataContents?.listStatusContents]
    ?.reverse()
    .filter((a: any, i: number) => index === i);
  const data = items ? items : arrs[0];
  const numberPhoneCmt =
    type === IPeronalEnum.Friend
      ? profileFriend.numberPhone
      : profile.numberPhone;
  const navigation = useNavigation<any>();
  const {bottom} = useSafeAreaInsets();
  const isLikeUser = data?.likes?.some(
    (item: any) => item?.uid === profile?.uid,
  );
  const [like, setLike] = useState<boolean>(isLikeUser);
  const [quantity, setQuantity] = useState<number>(
    data?.likes?.length !== undefined
      ? data?.likes?.length
      : items?.likes.length,
  );
  const [visible, setIsVisible] = useState(false);
  const [commentApp, setComment] = useState<string>('');
  useEffect(() => {
    dispatch(
      getStatus({
        numberPhone:
          type === IPeronalEnum.Friend
            ? profileFriend.numberPhone
            : profile.numberPhone,
      }),
    );
    dispatch(updateComment2([...data?.comments]));
  }, []);
  const onPressUnLike = async () => {
    const newLike = [...data?.likes];
    const arr2 = newLike.filter(
      (item1: any) => item1.numberPhone !== profile.numberPhone,
    );
    await dispatch(
      likeStatus({
        dataContents,
        numberPhone:
          type === IPeronalEnum.Friend
            ? profileFriend.numberPhone
            : profile.numberPhone,
        contents: data,
        likeStatus: false,
        profile: newProfileUser,
        newLikes: arr2,
      }),
    ).unwrap();
    dispatch(
      getStatus({
        numberPhone:
          type === IPeronalEnum.Friend
            ? profileFriend.numberPhone
            : profile.numberPhone,
      }),
    );
  };
  const onPressLike = async () => {
    const newLikes = [...data?.likes];
    newLikes.push(newProfileUser);

    await dispatch(
      likeStatus({
        dataContents,
        numberPhone:
          type === IPeronalEnum.Friend
            ? profileFriend.numberPhone
            : profile.numberPhone,
        contents: data,
        likeStatus: true,
        profile: newProfileUser,
        newLikes,
      }),
    ).unwrap();
    dispatch(
      getStatus({
        numberPhone:
          type === IPeronalEnum.Friend
            ? profileFriend.numberPhone
            : profile.numberPhone,
      }),
    );
  };
  const onComments = async () => {
    const newComment = [...data?.comments];
    const dataComment = {...newProfileUser, comment: commentApp.trim()};
    newComment.push(dataComment);
    dispatch(updateComment(dataComment));

    await dispatch(
      sentComment({
        dataContents,
        numberPhone: numberPhoneCmt,
        contents: data,
        profile: newProfileUser,
        newComment: newComment,
      }),
    ).unwrap();
    dispatch(
      getStatus({
        numberPhone:
          type === IPeronalEnum.Friend
            ? profileFriend.numberPhone
            : profile.numberPhone,
      }),
    );
  };
  const datas = data?.media?.map((img: any) => {
    return {uri: img};
  });
  // console.log({dataComments});
  return (
    <KeyboardAvoidingView
      behavior={Platform.isIos ? 'padding' : undefined}
      enabled
      style={styles.container}>
      <View style={styles.container}>
        <Header
          label={'Bình luận'}
          type={IHeaderEnum.Register}
          typePersonal={IHeaderEnum.Comment}
          onPressExit={async () => {
            await dispatch(
              getStatus({
                numberPhone:
                  type === IPeronalEnum.Friend
                    ? profileFriend.numberPhone
                    : profile.numberPhone,
              }),
            ).unwrap();
            await dispatch(getAllStatus({profileUser})).unwrap();
            navigation.goBack();
          }}
          onPress={() => {
            navigation.navigate(RouterName.SearchScreen);
          }}
          StyleHeaderSetting={{
            paddingVertical: Platform.isAndroid ? 14 : 10,
          }}
        />

        <ImageView
          images={datas}
          imageIndex={indexImg}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
          HeaderComponent={() => (
            <HeaderViewing onPressClose={() => setIsVisible(false)} />
          )}
          FooterComponent={() => (
            <>
              <View style={styles.content}>
                <Text style={styles.textContents}>{data?.textContent}</Text>
              </View>
              <View
                style={[
                  styles.iconLeft,
                  {paddingBottom: Platform.isIos ? bottom * 1.2 : 20},
                ]}>
                <TouchableOpacity
                  key={data.dayOfPostStatus.hour}
                  onPress={() => {
                    setLike(!like);
                    setQuantity(like ? quantity - 1 : quantity + 1);
                    like ? onPressUnLike() : onPressLike();
                  }}
                  style={styles.heart}>
                  {!isLikeUser ? (
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
                  <Text style={styles.likes}>{quantity}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.row}>
                  <FastImage
                    source={Icon.comments}
                    style={styles.comment}
                    tintColor={'white'}
                  />
                  <Text style={styles.likes}>{data.comments?.length}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        />

        <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.view1}>
            <Pressable
              onPress={() => {
                navigation.navigate(RouterName.Personal, {
                  profile: profileFriend,
                  type: IPeronalEnum.Friend,
                });
              }}>
              <FastImage
                source={{
                  uri:
                    type === IPeronalEnum.Friend
                      ? profileFriend.avatar
                      : profile?.avatar,
                }}
                style={styles.avatar}
              />
            </Pressable>
            <View style={{paddingLeft: 20}}>
              <Text style={styles.labelStyle}>
                {type === IPeronalEnum.Friend
                  ? profileFriend.username
                  : profile.username}
              </Text>
              <View style={styles.row}>
                <Text style={styles.description}>
                  {data?.dayOfPostStatus?.day}
                </Text>
                <IconAntDesign
                  name={'minus'}
                  size={16}
                  color={Color.icon}
                  style={styles.minus}
                />
                <IconMaterial
                  name={'account-multiple'}
                  size={16}
                  color={Color.Darkgray}
                />
                <Text style={styles.description}>Tất cả bạn bè</Text>
              </View>
            </View>
          </View>
          <Text
            style={[
              styles.textContent,
              {
                fontFamily: data?.stylesText?.fontFamily,
                color: data?.stylesText?.color,
              },
            ]}>
            {data?.textContent}
          </Text>

          <View
            style={{
              alignItems: 'center',
              paddingVertical: 15,
            }}>
            {data?.media.length === 1 ? (
              <RenderImage1
                ListImage={data?.media}
                onPressImg={() => {
                  setIsVisible(true);
                }}
              />
            ) : data?.media.length === 2 ? (
              <RenderImage2
                ListImage={data?.media}
                onPressImg={() => setIsVisible(true)}
              />
            ) : data?.media.length > 2 && data?.media.length < 5 ? (
              <RenderImage3
                ListImage={data?.media}
                onPressImg={() => setIsVisible(true)}
              />
            ) : data?.media.length > 4 ? (
              <RenderImage4
                ListImage={data?.media}
                onPressImg={() => setIsVisible(true)}
              />
            ) : (
              <View />
            )}
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                setLike(!like);
                setQuantity(like ? quantity - 1 : quantity + 1);
                like ? onPressUnLike() : onPressLike();
              }}
              style={[styles.heart, styles.heart2]}>
              {!like ? (
                <IconFontAwesome name={'heart-o'} size={22} color={'black'} />
              ) : (
                <IconAntDesign name={'heart'} size={22} color={Color.heart} />
              )}
              <Text style={styles.like}>{quantity}</Text>
            </TouchableOpacity>
          </View>
          <View>
            {dataComments?.map((comment: any) => (
              <View style={{flexDirection: 'row', paddingBottom: 10}}>
                <TouchableOpacity>
                  <FastImage
                    source={{uri: comment.avatar}}
                    style={styles.avatar2}
                  />
                </TouchableOpacity>
                <View style={[styles.container, {marginRight: 20}]}>
                  <View style={styles.row}>
                    <Text style={[styles.userName, {flex: 1}]}>
                      {comment.username}
                    </Text>
                    <TouchableOpacity>
                      <IconFontAwesome
                        name={'heart-o'}
                        size={19}
                        color={Color.icon}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.commentText}>{comment.comment}</Text>
                  <View style={styles.row}>
                    <Text style={styles.description}>{comment.timeStamp}</Text>
                    {comment.UserId !== profile.UserId && (
                      <TouchableOpacity>
                        <Text
                          style={[
                            styles.userName,
                            {fontSize: FontSize.h5 * 0.9, marginLeft: 20},
                          ]}>
                          Trả lời
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <CustomInput
          onChangeText={(text: string) => setComment(text)}
          onPress={() => {
            setComment('');
            onComments();
            Keyboard.dismiss();
          }}
          commentApp={commentApp}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    backgroundColor: 'white',
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
  userName: {
    fontSize: FontSize.h5,
    fontFamily: fontFamily.RobotoMedium,
    color: Color.DimGray,
  },
  commentText: {
    fontSize: FontSize.h5,
    fontFamily: fontFamily.PoppinsRegular,
    color: Color.textComment,
    marginRight: 30,
    paddingVertical: 5,
  },
  icon: {
    width: 25,
    height: 25,

    marginHorizontal: 18,
    alignSelf: 'center',
  },
  item: {
    paddingVertical: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  view1: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
  },
  heart: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  like: {
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
    fontSize: FontSize.h4,
    marginHorizontal: 5,
  },
  minus: {paddingHorizontal: 5},
  textContent: {
    fontSize: FontSize.h4,
    marginLeft: 10,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  likes: {
    fontFamily: fontFamily.primaryFont,
    color: 'white',
    fontSize: FontSize.h4,
    marginHorizontal: 8,
  },
  content: {
    marginVertical: 30,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Color.DimGray,
    marginHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  comment: {width: 28, height: 28, marginLeft: 20},
  textContents: {
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h4 * 0.9,
    color: 'white',
  },
  iconLeft: {flexDirection: 'row', flex: 1, alignItems: 'center'},
  textInput: {
    flex: 1,
    paddingVertical: Platform.isIos ? 5 : 10,
    fontSize: FontSize.h5,
    paddingHorizontal: 10,
  },
  viewTextInput: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Platform.isIos ? 10 : 0,
    borderTopWidth: 0.2,
    paddingHorizontal: 10,
    borderTopColor: Color.Darkgray,
  },
  heart2: {marginLeft: 20, marginBottom: 20, marginTop: 5},
  avatar2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 20,
  },
});
