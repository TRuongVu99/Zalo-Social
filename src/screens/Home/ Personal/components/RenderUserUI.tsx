import Header from '@components/Header';
import {Color, FontSize, image} from '@constants';
import {fontFamily} from '@fonts/Font';
import {IHeaderEnum} from '@model/handelConfig';
import {windowHeight} from '@utils/Dimensions';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {data} from '../data';
import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import {Icon} from '@icon/index';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/core';
interface IRenderUserUI {
  urlAvatar: string | undefined;
  name: string | undefined;
}

const RenderUserUI = ({urlAvatar, name}: IRenderUserUI) => {
  const navigation = useNavigation<any>();
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
        <View style={styles.borderAvatar}>
          <Image source={{uri: urlAvatar}} style={styles.avatar} />
        </View>
        <Text style={styles.userName}>{name}</Text>
        <TouchableOpacity style={styles.depcription}>
          <IconAntDesign name={'edit'} size={18} color={Color.blue2} />
          <Text style={styles.textDepcription}>
            Cập nhật giới thiệu bản thân
          </Text>
        </TouchableOpacity>
        <FlatList
          data={data}
          style={{top: -40}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          extraData={(item: any) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.buttom}>
              <Image source={item.icon} style={styles.iconLabel} />
              <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
          )}
        />
        <Pressable
          style={styles.textInput1}
          onPress={() => navigation.navigate(RouterName.PostStatus)}>
          <View style={styles.textInput}>
            <Text style={styles.text}>Bạn đang nghĩ gì?</Text>
          </View>

          <Image source={Icon.photo} style={styles.iconPhoto} />
        </Pressable>
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
  },
  body: {
    alignItems: 'center',
  },
  borderAvatar: {
    position: 'relative',
    top: -85,
    borderWidth: 3,
    borderRadius: 150 / 2,
    borderColor: 'white',
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
  },
  userName: {
    top: -80,
    fontFamily: fontFamily.RobotoMedium,
    color: Color.DimGray,
    fontSize: FontSize.h4,
  },
  depcription: {flexDirection: 'row', top: -60},
  textDepcription: {
    color: Color.blue2,
    fontFamily: fontFamily.primaryFont,
    marginLeft: 5,
  },
  iconLabel: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  buttom: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 15,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 10,
  },
  label: {
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
  },
  iconPhoto: {
    width: 22,
    height: 22,
    tintColor: 'rgb(120, 190, 29)',
    margin: 15,
  },
  textInput: {
    flex: 1,
    borderRightWidth: 0.5,
    borderRightColor: Color.Darkgray,
    paddingVertical: Platform.OS === 'ios' ? 7 : 2,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  textInput1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 10,
    borderRadius: 5,
  },
  text: {
    color: Color.DimGray,
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h4 * 0.9,
  },
});
