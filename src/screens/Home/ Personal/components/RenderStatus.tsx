import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {windowWidth} from '@utils/Dimensions';
import FastImage from 'react-native-fast-image';
import FontSize from '@constants/FontSize';
import Color from '@constants/Color';
import {fontFamily} from '@fonts/Font';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '@store/index';
import {
  deleteStatus,
  getStatus,
  likeStatus,
  setLikePost,
} from '@store/slice/contents/contentsSlice';
import {IUser} from '@store/slice/user/userSlice';
import {Icon} from '@icon/index';
interface IRenderStatus {
  data: {
    comments: any | undefined;
    likes: any | undefined;
    media: Array<string> | undefined;
    dayOfPostStatus: {
      day: any | undefined;
      hour: any | undefined;
    };
    stylesText: {
      fontFamily: string;
      color: string;
    };
    textContent: string;
  };
  numberPhone: string | undefined;
  profile: any;
  onPressLike: () => void;
  onPressUnLike: () => void;
  like?: boolean;
  indexApp?: boolean;
  newLikes?: any;
  dataContents?: any;
  newProfileUser?: any;
}
const RenderStatus = ({
  data,
  numberPhone,
  profile,
  onPressLike,
  onPressUnLike,
  like,
  indexApp,
  newLikes,
  dataContents,
  newProfileUser,
}: IRenderStatus) => {
  const [isLike, setLike] = useState<any>();
  const dispatch = useDispatch();
  // data?.likes?.map((items: any, index: number) => {
  //   if (
  //     items?.numberPhone !== numberPhone ||
  //     items?.numberPhone === numberPhone
  //   ) {
  //     console.log({items});
  //   }
  // });
  const isLikeUser = data?.likes?.some(
    (item: any) => item?.uid === profile?.uid,
  );
  console.log({
    isLikeUser,
    data: data?.likes,
    uid: profile,
  });
  return (
    <View style={styles.container}>
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
      <View style={{flexDirection: 'row'}}>
        {data?.media?.map((item: string, index: number, key: any) => (
          <TouchableOpacity
            key={index}
            style={[styles.photo, {marginLeft: index === 0 ? 10 : 5}]}>
            {index < 3 && (
              <FastImage
                source={{uri: item, priority: FastImage.priority.normal}}
                style={styles.image}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.iconLeft}>
          <TouchableOpacity
            key={data.dayOfPostStatus.hour}
            onPress={() => {
              dispatch(
                setLikePost({
                  isLike: isLikeUser,
                  data: data,
                  uid: profile?.uid,
                  newProfileUser,
                }),
              );
              isLikeUser ? onPressUnLike() : onPressLike();
            }}
            style={styles.heart}>
            {!isLikeUser ? (
              <IconFontAwesome name={'heart-o'} size={20} color={'black'} />
            ) : (
              <IconAntDesign name={'heart'} size={20} color={Color.heart} />
            )}
          </TouchableOpacity>

          <Text style={styles.like}>{data.likes.length}</Text>

          <TouchableOpacity>
            <FastImage source={Icon.comments} style={styles.comments} />
          </TouchableOpacity>
          <Text style={styles.like}>{data.comments.length}</Text>
        </View>
        <TouchableOpacity>
          <IconMaterial
            name={'account-multiple'}
            size={18}
            color={'gray'}
            style={styles.iconRight}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <IconIonicons
            name={'ellipsis-horizontal'}
            size={20}
            color={'gray'}
            style={styles.iconRight}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RenderStatus;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 5,
  },
  iconRight: {
    marginHorizontal: 5,
  },
  textContent: {
    fontSize: FontSize.h4,
    marginLeft: 10,
  },
  photo: {marginVertical: 10},
  image: {width: windowWidth * 0.28, height: windowWidth * 0.28},
  iconLeft: {flexDirection: 'row', flex: 1, alignItems: 'center'},
  comments: {width: 21, height: 21, marginLeft: 20},
  heart: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  like: {
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
    fontSize: FontSize.h4 * 0.9,
    marginHorizontal: 5,
  },
});
// () => {
//   setTimeout(() => {
//     dispatch(
//       likeStatus({
//         numberPhone: numberPhone,
//         contents: data,
//         likeStatus: likes,
//         newLikes,
//       }),
//     );
//     dispatch(getStatus({numberPhone: numberPhone}));
//   });
// }
