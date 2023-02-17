import Cursor from '@components/Cursor';
import Header from '@components/Header';
import Color from '@constants/Color';
import FontSize from '@constants/FontSize';
import {fontFamily} from '@fonts/Font';
import {IHeaderEnum} from '@model/handelConfig';
import React, {useCallback, useEffect, useState} from 'react';
import {
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
  useWindowDimensions,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {arr, listFontFamily, listIcon} from '../data';
import RenderSelectFont from './RenderSelectFont';
import Touch from './Touch';

const minCols = 3;

const calcNumColumns = (width: number) => {
  const cols = width / 100;
  const colsFloor = Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
  const colsMinusMargin = cols - 2 * colsFloor * 10;
  if (colsMinusMargin < colsFloor && colsFloor > minCols) {
    return colsFloor - 1;
  } else return colsFloor;
};
const formatData = (data: any, numColumns: number) => {
  const amountFullRows = Math.floor(data.length / numColumns);
  let amountItemsLastRow = data.length - amountFullRows * numColumns;

  while (amountItemsLastRow !== numColumns && amountItemsLastRow !== 0) {
    data.push({key: `empty-${amountItemsLastRow}`, empty: true});
    amountItemsLastRow++;
  }
  return data;
};

const PostStatus = () => {
  const inset = useSafeAreaInsets();
  const [isSelect, setIsSelect] = useState<number>(0);
  const [isSelectFont, setSelectFont] = useState<number>(0);
  const [font, setFont] = useState<any>(listFontFamily[0]);
  const [text, setText] = useState<string>('');
  const [paddingBottom, setPaddingBottom] = useState<boolean>(true);
  const [listImages, setListImages] = useState<any>([]);
  const {width} = useWindowDimensions();

  const [numColumns, setNumColumns] = useState(calcNumColumns(width));

  useEffect(() => {
    setNumColumns(calcNumColumns(width));
  }, [width]);
  console.log(listImages);
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
      maxFiles: 10,
    }).then((images: any) => {
      setListImages([]);
      const dataImages = images.map((image: any) => {
        return `data:${image.mime};base64,${image.data}`;
      });
      setListImages(dataImages);
    });
  };

  const length = listImages.length;
  const FlatListImage = useCallback(() => {
    return (
      <FlatList
        key={numColumns}
        data={formatData(listImages, numColumns)}
        numColumns={numColumns}
        renderItem={({item}) => {
          if (item?.empty) {
            return <></>;
          }
          return (
            <TouchableOpacity>
              <Image source={{uri: item}} style={{width: 100, height: 100}} />
            </TouchableOpacity>
          );
        }}
      />
    );
  }, [listImages?.length]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <View style={styles.container}>
        <Header type={IHeaderEnum.PostStatus} />

        <ScrollView>
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
            style={{
              position: 'absolute',
              marginHorizontal: 15,
              paddingTop: 25,
              fontSize: FontSize.h4,
              fontFamily: font.font,
              color: text.length !== 0 ? font.colorText : 'transparent',
            }}>
            {text}
            <Cursor />
          </Text>
          <View style={{flex: 1, marginTop: 10}}>{FlatListImage()}</View>
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

        <View style={[styles.view1, {position: 'relative'}]}>
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
          <TouchableOpacity style={{marginRight: 100}}>
            <Image source={listIcon[0].icon} style={{width: 27, height: 27}} />
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
                <Image source={items.icon} style={{width: 30, height: 30}} />
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
  },
  view1: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  view2: {
    borderTopWidth: 0.2,
    borderTopColor: Color.Darkgray,
    justifyContent: 'space-between',
    marginBottom: Platform.OS === 'android' ? 5 : 0,
  },
});
