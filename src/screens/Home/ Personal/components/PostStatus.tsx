import Cursor from '@components/Cursor';
import Header from '@components/Header';
import Color from '@constants/Color';
import FontSize from '@constants/FontSize';
import {fontFamily} from '@fonts/Font';
import {IHeaderEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '@store/index';
import {endLoading, startLoading} from '@store/slice/app/appSlice';
import {
  addImagetoList,
  getStatus,
  resetListImages,
  updateContent,
} from '@store/slice/contents/contentsSlice';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {arr, listFontFamily, listIcon} from '../data';
import {
  RenderImage1,
  RenderImage2,
  RenderImage3,
  RenderImage4,
} from './RenderImage';
import RenderSelectFont from './RenderSelectFont';
import Touch from './Touch';
const PostStatus = ({route}: {route: any}) => {
  const navigation = useNavigation<any>();
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch<any>();
  const {numberPhone} = route?.params;
  const [isSelect, setIsSelect] = useState<number>(0);
  const [isSelectFont, setSelectFont] = useState<number>(0);
  const [font, setFont] = useState<any>(listFontFamily[0]);
  const [text, setText] = useState<string>('');
  const [paddingBottom, setPaddingBottom] = useState<boolean>(true);
  const media: any = [];
  const {listImages} = useSelector((state: RootState) => state.contents);
  const newListImage = listImages.filter((item: any, index: number) => {
    return listImages.indexOf(item) === index;
  });
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
      setPaddingBottom(false);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setPaddingBottom(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const getImagesInAlbum = () => {
    ImagePicker.openPicker({
      multiple: true,
      includeBase64: true,
      maxFiles: 20,
    }).then((images: any) => {
      const dataImages = images.map((image: any) => {
        return image.path;
      });
      dispatch(addImagetoList(dataImages));
    });
  };

  const UploadMediaToStorage = () => {
    newListImage.forEach(async (image: string) => {
      await storage()
        .ref(image.substring(image.lastIndexOf('/') + 1))
        .putFile(Platform.OS === 'ios' ? image.replace('file://', '') : image)
        .then(() => console.log('Đăng ảnh thành công'))
        .catch(() => console.log('Đăng ảnh thất bại'));
    });
  };

  const GetURLMediaToStorage = () => {
    newListImage.map((image: string) => {
      storage()
        .ref(image.substring(image.lastIndexOf('/') + 1))
        .getDownloadURL()
        .then((imageURL: string) => {
          media.push(imageURL);
          console.log('Tải URL thành công');
        })
        .catch(() => console.log('Tải URL thất bại'));
    });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <View style={[styles.container, {backgroundColor: 'white'}]}>
        <Header
          isPost={text !== '' || newListImage.length > 0}
          onPostStatus={() => {
            dispatch(startLoading());
            UploadMediaToStorage();
            setTimeout(
              () => {
                GetURLMediaToStorage();
              },
              newListImage.length < 10 ? 15000 : 30000,
            );
            setTimeout(
              async () => {
                await dispatch(
                  updateContent({
                    numberPhone: numberPhone,
                    contents: {
                      media: media,
                      textContent: text?.trim(),
                      dayOfPostStatus: {
                        day: moment().format('L'),
                        hour: moment().format('LTS'),
                      },
                      stylesText: {
                        fontFamily: font?.font,
                        color: font?.colorText,
                      },
                      comments: [],
                      likes: [],
                    },
                  }),
                ).unwrap();
                dispatch(resetListImages());
                dispatch(getStatus({numberPhone: numberPhone}));
              },
              newListImage.length < 10 ? 20000 : 35000,
            );

            navigation.navigate(RouterName.Personal, {
              newListImage,
              font,
              text,
              loading: {
                status: true,
                timeOut: newListImage.length < 10 ? 16000 : 31000,
              },
            });
          }}
          onPressExit={() => {
            if (listImages.length !== 0 || text !== '') {
              Alert.alert(
                'Thông báo',
                'Chưa tạo bài đăng xong, thoát khỏi trang này',
                [
                  {
                    text: 'Ở lại',
                    style: 'cancel',
                  },
                  {
                    text: 'Thoát',
                    style: 'destructive',

                    onPress: () => {
                      navigation.goBack();
                      setTimeout(() => {
                        dispatch(resetListImages());
                      }, 200);
                    },
                  },
                ],
              );
            } else {
              navigation.goBack();
            }
          }}
          type={IHeaderEnum.PostStatus}
        />
        <ScrollView keyboardShouldPersistTaps="handled" style={{}}>
          <TextInput
            caretHidden={true}
            multiline={true}
            onChangeText={texts => setText(texts)}
            defaultValue={text}
            style={[
              styles.textInput,
              {
                fontFamily: font.font,
                color: 'transparent',
              },
            ]}
            placeholder="Bạn đang nghĩ gì?"
            placeholderTextColor={
              text.length !== 0 ? 'transparent' : font.colorPlaceholder
            }
          />
          <Text
            style={[
              styles.text,
              {
                color: text.length !== 0 ? font.colorText : 'transparent',
                fontFamily: font.font,
              },
            ]}>
            {text}
            <Cursor />
          </Text>

          <View
            style={{
              alignItems: 'center',
            }}>
            {newListImage.length === 1 ? (
              <RenderImage1 ListImage={newListImage} />
            ) : newListImage.length === 2 ? (
              <RenderImage2 ListImage={newListImage} />
            ) : newListImage.length > 2 && newListImage.length < 5 ? (
              <RenderImage3 ListImage={newListImage} />
            ) : newListImage.length > 4 ? (
              <RenderImage4 ListImage={newListImage} />
            ) : (
              <View />
            )}
            {newListImage.length !== 0 && (
              <TouchableOpacity
                style={styles.addImages}
                onPress={() => getImagesInAlbum()}>
                <IconAntDesign name="plus" size={26} color={'gray'} />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        <View style={styles.container} />
        <View style={styles.view1}>
          <FlatList
            data={listFontFamily}
            keyExtractor={(item: any) => item.key}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            renderItem={({item}) => (
              <RenderSelectFont
                onPress={() => {
                  setSelectFont(item.id);
                  setFont(item);
                }}
                item={item}
                isSelectFont={isSelectFont}
              />
            )}
          />
        </View>
        <View style={[styles.view1]}>
          {arr.map((items: any, key) => (
            <Touch
              key={key}
              types={true}
              onPress={() => setIsSelect(items.id)}
              items={items}
              isSelect={isSelect}
            />
          ))}
        </View>
        <View
          style={[
            styles.view1,
            styles.view2,
            {paddingBottom: paddingBottom ? inset.bottom : 5},
          ]}>
          <TouchableOpacity style={styles.iconBottomRight}>
            <Image
              source={listIcon[0].icon}
              style={styles.imageIconBottomRight}
            />
          </TouchableOpacity>
          {listIcon.map((items: any, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => {
                switch (items.id) {
                  case 1:
                    return null;
                  case 2:
                    return getImagesInAlbum();
                  case 3:
                    return getImagesInAlbum();
                  default:
                    return null;
                }
              }}>
              {items.id !== 1 && (
                <Image source={items.icon} style={styles.icon} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PostStatus;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
    paddingHorizontal: 7,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: Color.Darkgray,
    borderRadius: 10,
  },
  label: {
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h6,
    color: Color.DimGray,
    marginLeft: 5,
  },
  textInput: {
    fontSize: FontSize.h4,
    marginHorizontal: 15,
    paddingTop: 25,
    marginBottom: 10,
  },
  view1: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    position: 'relative',
  },
  view2: {
    borderTopWidth: 0.2,
    borderTopColor: Color.Darkgray,
    justifyContent: 'space-between',
    marginBottom: Platform.OS === 'android' ? 5 : 0,
  },
  text: {
    position: 'absolute',
    marginHorizontal: 15,
    paddingTop: 25,
    fontSize: FontSize.h4,
  },
  addImages: {
    backgroundColor: Color.reject,
    paddingVertical: 5,
    borderRadius: 5,
    paddingHorizontal: 100,
    marginTop: 10,
  },
  icon: {width: 30, height: 30},
  iconBottomRight: {paddingRight: 100},
  imageIconBottomRight: {width: 27, height: 27},
});
