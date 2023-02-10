import Header from '@components/Header';
import {image} from '@constants';
import {IHeaderEnum} from '@model/handelConfig';
import {windowHeight} from '@utils/Dimensions';
import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
interface IRenderUserUI {
  urlAvatar: string | undefined;
  name: string | undefined;
}
const RenderUserUI = ({urlAvatar, name}: IRenderUserUI) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={image.background}
        resizeMode="cover"
        style={styles.background}>
        <Header
          StyleHeaderSetting={{
            backgroundColor: 'transparent',
            position: 'absolute',
          }}
          type={IHeaderEnum.Register}
          typePersonal={IHeaderEnum.Personal}
        />
      </ImageBackground>
      <View style={styles.body}>
        <View
          style={{
            position: 'relative',
            top: -85,
            borderWidth: 3,
            borderRadius: 150 / 2,
            borderColor: 'white',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: urlAvatar}}
            style={{
              width: 130,
              height: 130,
              borderRadius: 130 / 2,
            }}
          />
        </View>
        <Text>{name}</Text>
      </View>
    </View>
  );
};

export default RenderUserUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: windowHeight / 3,
    alignItems: 'center',
  },
  body: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
