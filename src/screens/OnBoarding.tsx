// import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext, memo, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FontSize, Color} from '@constants';
import {fontFamily} from '@fonts/Font';
import UIButton from '@components/UIButton';
import {IButtonEnum} from '@model/handelConfig';
import Swiper from 'react-native-swiper';
import {Icon} from '@icon/index';
import {useNavigation} from '@react-navigation/native';
import {RouterName} from '@navigation/rootName';

export const keySaveData = 'User';
const arr = ['Tiếng Việt', 'English'];

const renderOnBoarding = ({
  nameIcon,
  content,
  text,
}: {
  nameIcon: any;
  content: string;
  text: string;
}) => {
  return (
    <View>
      <Image
        style={{width: '100%', height: 300}}
        resizeMode="contain"
        source={nameIcon}
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: FontSize.h4 * 0.9,
          fontFamily: fontFamily.primaryFont,
        }}>
        {content}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          marginHorizontal: 30,
          color: Color.Darkgray,
          marginTop: 10,
          fontFamily: fontFamily.primaryFont,
        }}>
        {text}
      </Text>
    </View>
  );
};
const OnBoarding: React.FC = () => {
  const inset = useSafeAreaInsets();
  const [select, setSelect] = useState(arr[0]);
  const navigation = useNavigation<any>();

  const RenderOnBoarding = memo(renderOnBoarding);

  return (
    <View style={[styles.container, {paddingTop: inset.top}]}>
      <Text style={styles.title}>Zalo</Text>
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
        <RenderOnBoarding
          nameIcon={Icon.onboard1}
          content="Gọi video ổn định"
          text="Trò chuyện thật đã với hình ảnh sắc nét, tiếng chất, âm chuẩn dưới mọi điều kiện mạng"
        />
        <RenderOnBoarding
          nameIcon={Icon.onboard2}
          content="Chat nhóm tiện lợi"
          text="Cùng trao đổi, giữ liên lạc với gia đình, bạn bè và đồng nghiệp mọi lúc mọi nơi"
        />
        <RenderOnBoarding
          nameIcon={Icon.onboard3}
          content="Nhật ký bạn bè"
          text="Nợi cập nhật hoạt động mới nhất của những người bạn quan tâm"
        />
      </Swiper>
      <UIButton
        label={'Đăng nhập'}
        styleUIButton={{marginHorizontal: 30}}
        styleLabel={styles.label}
        onPress={() => {
          navigation.navigate(RouterName.Login);
        }}
      />
      <UIButton
        label={'Đăng ký'}
        type={IButtonEnum.disable}
        styleUIButtonDisable={styles.button}
        styleLabel={styles.label}
        onPress={() => {
          navigation.navigate(RouterName.Register);
        }}
      />

      <View style={styles.view}>
        <View style={{flexDirection: 'row', paddingBottom: 20}}>
          {arr.map((title, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelect(title)}
              style={{
                borderBottomWidth: select === title ? 1 : 0,
                paddingBottom: 10,
                marginHorizontal: 5,
                paddingHorizontal: 5,
              }}>
              <Text
                style={{color: title === select ? 'black' : Color.Darkgray}}>
                {title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};
export default OnBoarding;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  title: {
    fontFamily: fontFamily.fontZalo,
    fontSize: FontSize.h1 * 1.4,
    color: 'rgb(15, 120, 251)',
    textAlign: 'center',
  },
  image: {
    flex: 1,
  },
  button: {
    // marginVertical: 40,
    marginHorizontal: 30,
  },
  view: {
    flexDirection: 'column-reverse',
    flex: 0.2,
    alignSelf: 'center',
  },
  view5: {
    width: '100%',
    paddingHorizontal: 50,
  },
  label: {
    fontSize: FontSize.h5 * 1.1,
    fontWeight: '500',
  },

  wrapper: {},
});
