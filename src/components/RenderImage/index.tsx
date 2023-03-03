import FontSize from '@constants/FontSize';
import {windowWidth} from '@utils/Dimensions';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

interface IRenderImage {
  ListImage: any;
  onPressImg?: () => void;
}

export const RenderImage1 = ({ListImage, onPressImg}: IRenderImage) => {
  return (
    <FlatList
      data={ListImage}
      keyboardShouldPersistTaps="handled"
      renderItem={({item}: {item: any; index: number}) => {
        return (
          <TouchableOpacity onPress={onPressImg}>
            <FastImage
              source={{
                uri: item,
                priority: FastImage.priority.high,
              }}
              resizeMode={'cover'}
              style={styles.image1}
            />
          </TouchableOpacity>
        );
      }}
    />
  );
};
export const RenderImage2 = ({ListImage, onPressImg}: IRenderImage) => {
  return (
    <FlatList
      data={ListImage}
      numColumns={2}
      keyboardShouldPersistTaps="handled"
      renderItem={({item}: {item: any; index: number}) => {
        return (
          <TouchableOpacity onPress={onPressImg}>
            <FastImage
              source={{
                uri: item,
                priority: FastImage.priority.high,
              }}
              style={styles.image2}
            />
          </TouchableOpacity>
        );
      }}
    />
  );
};
export const RenderImage3 = ({ListImage, onPressImg}: IRenderImage) => {
  return (
    <FlatList
      data={ListImage}
      numColumns={2}
      keyboardShouldPersistTaps="handled"
      renderItem={({item, index}: {item: any; index: number}) => {
        return (
          <TouchableOpacity onPress={onPressImg}>
            {ListImage.length === 3 ? (
              <FastImage
                source={{
                  uri: item,
                  priority: FastImage.priority.high,
                }}
                style={[
                  styles.image3,
                  {
                    width:
                      index === 2 ? windowWidth * 0.98 : windowWidth / 2.06,
                    height:
                      index === 2 ? windowWidth * 0.6 : windowWidth / 2.06,
                  },
                ]}
              />
            ) : (
              <Image source={{uri: item}} style={styles.image4} />
            )}
          </TouchableOpacity>
        );
      }}
    />
  );
};
export const RenderImage4 = ({ListImage, onPressImg}: IRenderImage) => {
  return (
    <FlatList
      data={ListImage}
      numColumns={3}
      keyboardShouldPersistTaps="handled"
      renderItem={({item, index}: {item: any; index: number}) => {
        return (
          <TouchableOpacity onPress={onPressImg}>
            {index < 9 && (
              <>
                <FastImage
                  source={{
                    uri: item,
                    priority: FastImage.priority.high,
                  }}
                  style={styles.image9}
                />

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
    margin: 1,
  },
  image4: {
    margin: 2,
    width: windowWidth / 2.05,
    height: windowWidth / 2.05,
  },
  image2: {
    width: windowWidth / 2.05,
    height: windowWidth,
    marginHorizontal: 1.5,
  },
  image1: {
    width: windowWidth * 0.99,
    height: windowWidth,
    // margin: 1.5,
  },
});
