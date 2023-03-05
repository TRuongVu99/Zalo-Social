import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {windowWidth} from '@utils/Dimensions';
import {useNavigation} from '@react-navigation/native';
import {RouterName} from '@navigation/rootName';
import FontSize from '@constants/FontSize';
import {IPreviewImageEnum} from '@model/handelConfig';
import {useDispatch} from 'react-redux';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Color from '@constants/Color';
import FastImage from 'react-native-fast-image';
import {removeImageInList} from '@store/slice/contents/contentsSlice';

interface IRenderImage {
  ListImage: any;
}
const IconDelete = () => {
  return <IconAntDesign name="closecircleo" size={24} color={Color.white} />;
};
export const RenderImage1 = ({ListImage}: IRenderImage) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  return (
    <FlatList
      data={ListImage}
      keyboardShouldPersistTaps="handled"
      renderItem={({item, index}: {item: any; index: number}) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(RouterName.PreViewImage, {
                UrlImage: item,
                type: IPreviewImageEnum.Photoshop,
              })
            }
            style={{
              margin: 10,
            }}>
            <FastImage
              source={{
                uri: item,
                priority: FastImage.priority.high,
              }}
              style={styles.image1}
            />
            <TouchableOpacity
              onPress={() => dispatch(removeImageInList(index))}
              style={styles.iconDelete}>
              <IconDelete />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      }}
    />
  );
};
export const RenderImage2 = ({ListImage}: IRenderImage) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  return (
    <FlatList
      data={ListImage}
      numColumns={2}
      keyboardShouldPersistTaps="handled"
      renderItem={({item, index}: {item: any; index: number}) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(RouterName.PreViewImage, {
                UrlImage: item,
                type: IPreviewImageEnum.Photoshop,
              })
            }>
            <FastImage
              source={{
                uri: item,
                priority: FastImage.priority.high,
              }}
              style={styles.image2}
            />
            <TouchableOpacity
              onPress={() => dispatch(removeImageInList(index))}
              style={styles.iconDelete}>
              <IconDelete />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      }}
    />
  );
};
export const RenderImage3 = ({ListImage}: IRenderImage) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  return (
    <FlatList
      data={ListImage}
      numColumns={2}
      keyboardShouldPersistTaps="handled"
      renderItem={({item, index}: {item: any; index: number}) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(RouterName.PreViewImage, {
                UrlImage: item,
                type: IPreviewImageEnum.Photoshop,
              })
            }>
            {ListImage.length === 3 ? (
              <FastImage
                source={{
                  uri: item,
                  priority: FastImage.priority.high,
                }}
                style={[
                  styles.image3,
                  {
                    paddingHorizontal: index === 2 ? 180 : 88,
                    paddingVertical: index === 2 ? 100 : 80,
                  },
                ]}
              />
            ) : (
              <Image source={{uri: item}} style={styles.image4} />
            )}
            <TouchableOpacity
              onPress={() => dispatch(removeImageInList(index))}
              style={styles.iconDelete}>
              <IconDelete />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      }}
    />
  );
};
export const RenderImage4 = ({ListImage}: IRenderImage) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  return (
    <FlatList
      data={ListImage}
      numColumns={3}
      keyboardShouldPersistTaps="handled"
      renderItem={({item, index}: {item: any; index: number}) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.push(RouterName.PreViewImage, {
                UrlImage: item,
                ListImage: ListImage,
                type:
                  index === 8
                    ? IPreviewImageEnum.More
                    : IPreviewImageEnum.Photoshop,
              })
            }>
            {index < 9 && (
              <>
                <FastImage
                  source={{
                    uri: item,
                    priority: FastImage.priority.high,
                  }}
                  style={styles.image9}
                />
                {index < 8 && (
                  <TouchableOpacity
                    onPress={() => dispatch(removeImageInList(index))}
                    style={styles.iconDelete}>
                    <IconDelete />
                  </TouchableOpacity>
                )}
                {ListImage.length === 9 && (
                  <TouchableOpacity
                    onPress={() => dispatch(removeImageInList(index))}
                    style={styles.iconDelete}>
                    <IconDelete />
                  </TouchableOpacity>
                )}

                {ListImage.length > 9 && index === 8 ? (
                  <View style={styles.viewAbsolute}>
                    <Text style={styles.textAbsolute}>
                      {`+ ${ListImage.length - 9}`}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
              </>
            )}
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  iconDelete: {
    position: 'absolute',
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    right: 5,
    top: 5,
  },
  viewAbsolute: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    marginTop: 3.5,
    marginLeft: 2.5,
    width: windowWidth / 3.25,
    height: windowWidth / 3.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAbsolute: {
    color: 'white',
    fontSize: FontSize.h2,
  },
  image9: {
    marginTop: 5,
    marginHorizontal: 2.5,
    paddingHorizontal: 60,
    paddingVertical: 60,
    borderRadius: 5,
  },
  image3: {
    margin: 2.5,
    borderRadius: 5,
  },
  image4: {
    margin: 2.5,
    paddingHorizontal: 90,
    paddingVertical: 90,
    borderRadius: 5,
  },
  image2: {
    width: windowWidth / 2.15,
    height: windowWidth,
    margin: 5,
    borderRadius: 5,
  },
  image1: {
    width: windowWidth / 1.1,
    height: windowWidth / 1.1,
    borderRadius: 5,
  },
});
