import Color from '@constants/Color';
import FontSize from '@constants/FontSize';
import {fontFamily} from '@fonts/Font';
import {IPreviewImageEnum} from '@model/handelConfig';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '@store/index';
import {
  addImagetoList,
  removeImageInList,
} from '@store/slice/contents/contentsSlice';
import {windowWidth} from '@utils/Dimensions';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import ImageView from 'react-native-image-viewing';
const PreViewImage = ({route}: {route: any}) => {
  const {listImages} = useSelector((state: RootState) => state.contents);
  const newListImage = listImages.filter((item: any, index: number) => {
    return listImages.indexOf(item) === index;
  });
  const {UrlImage, type, data} = route?.params;
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const [visible, setIsVisible] = useState<boolean>(false);
  const getImagesInAlbum = () => {
    ImagePicker.openPicker({
      multiple: true,
      includeBase64: true,
      maxFiles: 20,
    }).then((images: any) => {
      const dataImages = images.map((image: any) => {
        return `data:${image.mime};base64,${image.data}`;
      });
      dispatch(addImagetoList(dataImages));
    });
  };
  console.log({
    data: data.media.map((item: any) => {
      return {uri: item};
    }),
  });
  switch (type) {
    case IPreviewImageEnum.Photoshop:
      return (
        <View style={[styles.container, {paddingTop: inset.top}]}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => navigation.goBack()}>
            <IconAntDesign
              name="close"
              size={30}
              color={'white'}
              style={{padding: 5}}
            />
          </TouchableOpacity>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{uri: UrlImage}}
          />
        </View>
      );
    case IPreviewImageEnum.More:
      return (
        <View style={[styles.view2, {paddingTop: inset.top}]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.textHeader}>Huỷ</Text>
            </TouchableOpacity>
            <Text
              style={
                styles.textHeader
              }>{`Ảnh đã chọn: ${newListImage.length}`}</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.textHeader}>Xong</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.view1}>
            <FlatList
              data={newListImage}
              numColumns={3}
              renderItem={({item, index}) => (
                <View>
                  <Image
                    borderRadius={5}
                    style={styles.imageMore}
                    source={{uri: item}}
                  />
                  <TouchableOpacity
                    onPress={() => dispatch(removeImageInList(index))}
                    style={styles.viewAbsolute}>
                    <IconAntDesign
                      name="closecircleo"
                      size={24}
                      color={Color.white}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity
              style={[styles.addImages, {marginBottom: inset.bottom}]}
              onPress={() => getImagesInAlbum()}>
              <IconAntDesign name="plus" size={28} color={Color.DimGray} />
            </TouchableOpacity>
          </View>
        </View>
      );
    case IPreviewImageEnum.ImageOfStatus:
      return (
        <ImageView
          images={data.media.map((item: any) => {
            return {uri: item};
          })}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => {
            setIsVisible(false);
          }}
        />
      );
    default:
      return (
        <View style={[styles.container, {paddingTop: inset.top}]}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => navigation.goBack()}>
            <IconAntDesign name="close" size={30} color={'white'} />
          </TouchableOpacity>
          <Image
            resizeMode="contain"
            style={{width: '100%', height: '90%'}}
            source={{uri: UrlImage}}
          />
        </View>
      );
  }
};

export default PreViewImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 5,
  },
  textHeader: {
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h4,
    color: Color.DimGray,
  },
  addImages: {
    backgroundColor: Color.reject,
    paddingVertical: 7,
    borderRadius: 5,
    paddingHorizontal: 150,
  },
  viewAbsolute: {
    position: 'absolute',
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    right: 5,
    top: 5,
  },
  imageMore: {
    width: windowWidth / 3.1,
    height: windowWidth / 3.1,
    margin: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 0.2,
    marginBottom: 5,
    borderBottomColor: Color.Darkgray,
  },
  view2: {
    flex: 1,
    backgroundColor: 'white',
  },
  view1: {flex: 1, alignItems: 'center', backgroundColor: 'white'},
  image: {width: '100%', height: '80%'},
});
