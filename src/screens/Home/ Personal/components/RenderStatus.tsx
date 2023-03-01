import Color from '@constants/Color';
import FontSize from '@constants/FontSize';
import {fontFamily} from '@fonts/Font';
import {Icon} from '@icon/index';
import {setLikePost} from '@store/slice/contents/contentsSlice';
import {windowWidth} from '@utils/Dimensions';
import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';

import ImageView from 'react-native-image-viewing';
import HeaderViewing from './HeaderViewing';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Platform from '@utils/Platform';

interface IRenderStatus {
  data: {
    comments: any | undefined;
    likes: any | undefined;
    media: Array<string>;
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
  profile: any;
  onPressLike: () => void;
  onPressUnLike: () => void;
  onPressOption: () => void;
  onPressComments: () => void;
  newProfileUser?: any;
}
const RenderStatus = ({
  data,
  profile,
  onPressLike,
  onPressUnLike,
  newProfileUser,
  onPressOption,
  onPressComments,
}: IRenderStatus) => {
  const dispatch = useDispatch();
  const inset = useSafeAreaInsets();
  const [indexs, setIndex] = useState<any>();
  const [visible, setIsVisible] = useState(false);
  const isLikeUser = data?.likes?.some(
    (item: any) => item?.uid === profile?.uid,
  );
  const datas = data?.media?.map((img: any) => {
    return {uri: img};
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
            onPress={() => {
              setIsVisible(true);
              setIndex(index);
            }}
            key={index}
            style={[styles.photo, {marginLeft: index === 0 ? 10 : 5}]}>
            {index < 3 && (
              <FastImage
                source={{uri: item, priority: FastImage.priority.normal}}
                style={styles.image}
              />
            )}
            {data?.media?.length > 3 && index === 2 && (
              <View style={styles.viewAbsolute}>
                <Text style={styles.textAbsolute}>
                  {`+ ${data?.media?.length - 3}`}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <ImageView
        images={datas}
        imageIndex={indexs}
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
                {paddingBottom: Platform.isIos ? inset.bottom * 1.2 : 20},
              ]}>
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
                  <IconFontAwesome name={'heart-o'} size={24} color={'white'} />
                ) : (
                  <IconAntDesign name={'heart'} size={24} color={Color.heart} />
                )}
                <Text style={styles.likes}>{data.likes.length}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.row}>
                <FastImage
                  source={Icon.comments}
                  style={styles.comment}
                  tintColor={'white'}
                />
                <Text style={styles.likes}>{data.comments.length}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      />
      <View style={styles.row}>
        <View style={styles.iconLeft}>
          <TouchableOpacity
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
            <Text style={styles.like}>{data.likes.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onPressComments} style={styles.row}>
            <FastImage source={Icon.comments} style={styles.comments} />
            <Text style={styles.like}>{data.comments.length}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <IconMaterial
            name={'account-multiple'}
            size={18}
            color={'gray'}
            style={styles.iconRight}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressOption}>
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
    color: 'white',
  },
  textContents: {
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h4 * 0.9,
    color: 'white',
  },
  photo: {marginVertical: 10},
  image: {width: windowWidth * 0.28, height: windowWidth * 0.28},
  iconLeft: {flexDirection: 'row', flex: 1, alignItems: 'center'},
  comments: {width: 21, height: 21, marginLeft: 20},
  comment: {width: 28, height: 28, marginLeft: 20},
  heart: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  like: {
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
    fontSize: FontSize.h4 * 0.9,
    marginHorizontal: 5,
  },
  likes: {
    fontFamily: fontFamily.primaryFont,
    color: 'white',
    fontSize: FontSize.h4,
    marginHorizontal: 8,
  },
  content: {
    marginVertical: 30,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Color.DimGray,
    marginHorizontal: 10,
  },
  viewAbsolute: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',

    width: windowWidth * 0.28,
    height: windowWidth * 0.28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAbsolute: {
    color: 'white',
    fontSize: FontSize.h2,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
});
