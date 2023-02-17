import Header from '@components/Header';
import {Color, FontSize, image} from '@constants';
import {fontFamily} from '@fonts/Font';
import {IHeaderEnum, IPeronalEnum} from '@model/handelConfig';
import {windowHeight, windowWidth} from '@utils/Dimensions';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {data, optionChangeAvatar, optionChangeBackground} from '../data';
import React, {useState} from 'react';
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
  GestureResponderEvent,
} from 'react-native';
import {Icon} from '@icon/index';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/core';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import Opstion from './Opstion';
import {useSelector} from 'react-redux';
import {RootState} from '@store/index';
import firestore from '@react-native-firebase/firestore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
interface IRenderUserUI {
  urlAvatar: string | undefined;
  name: string | undefined;
  urlBackground?: string;
  onPressImage?: (event: GestureResponderEvent) => void;
  type?: string;
  onPressMessage?: (event: GestureResponderEvent) => void;
}

const RenderUserUI = ({
  urlBackground,
  urlAvatar,
  name,
  onPressImage,
  type,
  onPressMessage,
}: IRenderUserUI) => {
  const navigation = useNavigation<any>();
  const inset = useSafeAreaInsets();
  const {profileUser} = useSelector((state: RootState) => state.user);
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [opstion, setOpstion] = useState<any>([]);
  const updateAvatar = async (avatar: string) => {
    try {
      await firestore()
        .collection('Users')
        .doc(profileUser.UserId)
        .update({avatar});
    } catch (err) {
      console.log(err);
    }
  };
  const updateBackground = async (background: string) => {
    try {
      await firestore()
        .collection('Users')
        .doc(profileUser.UserId)
        .update({background});
    } catch (err) {
      console.log(err);
    }
  };
  const getImageInAlbum = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((images: any) => {
      updateAvatar(`data:${images.mime};base64,${images.data}`);
      setIsSelect(false);
    });
  };
  const getBackgroundInAlbum = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      includeBase64: true,
      cropping: true,
    }).then((images: any) => {
      updateBackground(`data:${images.mime};base64,${images.data}`);
      setIsSelect(false);
    });
  };
  // const getAlbum = () => {
  //   ImagePicker.openPicker({
  //     multiple: true,
  //     maxFiles: 10,
  //   }).then(images => {
  //     console.log(images);
  //   });
  // };
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 200,
      includeBase64: true,
      cropping: true,
    }).then((images: any) => {
      updateAvatar(`data:${images.mime};base64,${images.data}`);
    });
  };
  return (
    <View style={styles.container}>
      {type === IPeronalEnum.Friend && (
        <TouchableOpacity
          style={[styles.button, styles.message, {marginBottom: inset.bottom}]}
          onPress={onPressMessage}>
          <IconAntDesign name={'message1'} size={20} color={Color.blue} />
          <Text style={styles.textMessage}>Nhắn tin</Text>
        </TouchableOpacity>
      )}
      {type !== IPeronalEnum.Friend && (
        <Opstion
          isSelect={isSelect}
          onPressCancel={() => setIsSelect(!isSelect)}
          onRequestClose={() => setIsSelect(!isSelect)}
          onPress3={() => {
            if (opstion === optionChangeBackground) {
              getBackgroundInAlbum();
            } else {
              getImageInAlbum();
            }
          }}
          onPress2={() => openCamera()}
          data={opstion}
        />
      )}
      <ImageBackground
        source={{
          uri: urlBackground ? urlBackground : image.background,
        }}
        resizeMode="cover"
        style={styles.background}>
        <Header
          StyleHeaderSetting={styles.header}
          type={IHeaderEnum.Register}
          typePersonal={IHeaderEnum.Personal}
        />
        {type !== IPeronalEnum.Friend && (
          <Pressable
            style={styles.backgroundChange}
            onPress={() => {
              setIsSelect(true);
              setOpstion(optionChangeBackground);
            }}
          />
        )}
      </ImageBackground>
      <View style={styles.body}>
        <Pressable
          onPress={async () => {
            if (type !== IPeronalEnum.Friend) {
              setIsSelect(true);
              setOpstion(optionChangeAvatar);
            }
          }}
          style={styles.borderAvatar}>
          <Image
            source={{
              uri: urlAvatar ? urlAvatar : image.background,
            }}
            style={styles.avatar}
          />
        </Pressable>
        <Text style={styles.userName}>{name}</Text>
        {type === IPeronalEnum.Friend && (
          <Text style={[styles.depcription, styles.textDepcriptionFriend]}>
            Chưa có hoạt động nào. Hãy trò chuyện để hiểu nhau hơn!
          </Text>
        )}
        {type !== IPeronalEnum.Friend && (
          <>
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

              <TouchableOpacity onPress={onPressImage}>
                <Image source={Icon.photo} style={styles.iconPhoto} />
              </TouchableOpacity>
            </Pressable>
          </>
        )}
      </View>
      {isSelect && (
        <Image
          style={{
            width: windowWidth,
            height: windowHeight,
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}
        />
      )}
    </View>
  );
};

export default RenderUserUI;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    position: 'absolute',
  },
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
  textDepcriptionFriend: {width: 300, textAlign: 'center', color: 'gray'},
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
    top: -30,
  },
  text: {
    color: Color.DimGray,
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h4 * 0.9,
  },
  backgroundChange: {flex: 1, marginTop: 100},
  button: {
    paddingVertical: 8,
    paddingHorizontal: 55,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  message: {
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 7,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 10 : 30,
    right: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 50,
  },
  textMessage: {
    fontFamily: fontFamily.SanFranciscoDisplayMedium,
    color: Color.DimGray,
    fontWeight: '500',
    paddingLeft: 5,
  },
});
