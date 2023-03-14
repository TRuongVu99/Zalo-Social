import Header from '@components/Header';
import OpenURLButton from '@components/OpenURLButton';
import StatusBar, {Constants} from '@components/StatusBar';
import Color from '@constants/Color';
import FontSize from '@constants/FontSize';
import Images from '@constants/Image';
import {fontFamily} from '@fonts/Font';
import {Icon} from '@icon/index';
import {IHeaderEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {data1, data2, data3, data4} from './data';

const Discover = () => {
  const navigation = useNavigation<any>();
  const onQRCode = async () => {
    navigation.navigate(RouterName.QRCodeScan);
  };
  const urlXoSo = 'https://xoso.com.vn/';

  return (
    <View style={styles.container}>
      <Header
        placeholder={'Tìm kiếm'}
        type={IHeaderEnum.Home}
        nameIconRight2={Icon.qrcode}
        onPressIconRight2={() => onQRCode()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.view}>
          <Text style={styles.label}>Tiện ích cho bạn</Text>
          <View style={styles.view1}>
            {data1.map((item: any) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.icon1}
                  onPress={() =>
                    item.label === 'Chat GPT' &&
                    navigation.navigate(RouterName.ChatGPT)
                  }>
                  <View style={styles.view2}>
                    <FastImage source={item.icon} style={styles.styleIcon1} />
                  </View>
                  <Text style={styles.text1}>{item.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.row}>
            <View style={styles.icon2}>
              <FastImage
                source={Icon.megaphone}
                style={styles.styleIcon2}
                tintColor={Color.orange}
              />
            </View>
            <Text style={styles.label1}>Khám phá game hay</Text>
            <View style={styles.viewAds}>
              <Text style={styles.Ads}>Ads</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.container}>
              <TouchableOpacity>
                <FastImage source={Images.ZCa} style={[styles.styleIcon4]} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,1)']}
                  style={styles.linearGradient}
                  start={{x: 0.5, y: 0.5}}>
                  <Text style={[styles.text2]}>ZCá Vua Bắn Cá</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={[styles.view1, {flex: 1.1}]}>
              {data2.map((item: any) => {
                return (
                  <TouchableOpacity style={styles.icon4}>
                    <Image
                      source={item.icon}
                      style={[styles.styleIcon3]}
                      blurRadius={item.id === 4 ? 10 : 0}
                    />
                    {item.id < 4 ? (
                      <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,1)']}
                        style={styles.linearGradient2}
                        start={{x: 0.5, y: 0.5}}>
                        <Text style={[styles.text2, {fontSize: FontSize.h6}]}>
                          {item.label}
                        </Text>
                      </LinearGradient>
                    ) : (
                      <View
                        style={[
                          styles.linearGradient2,
                          styles.linearGradient3,
                        ]}>
                        <FastImage
                          source={item.icon1}
                          style={[styles.icon5]}
                          tintColor={'white'}
                        />
                        <Text style={[styles.text2, {fontSize: FontSize.h6}]}>
                          {item.label}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.row}>
            <View style={styles.icon2}>
              <FastImage source={Icon.wheel} style={styles.styleIcon2} />
            </View>
            <Text style={styles.label1}>Dò vé số</Text>
            <IconIonicons name={'ellipse'} size={3} color={Color.Darkgray} />
            <Text style={styles.depcriptions}>
              {moment().format('[Miền Nam,] D [tháng] M')}
            </Text>
          </View>
          <View style={styles.view3}>
            <OpenURLButton style={styles.openURLButton} url={urlXoSo}>
              <FastImage source={Icon.flame} style={styles.styleIcon5} />
              <Text style={styles.label2}>
                Xem chi tiết kết quả xổ số hôm nay
              </Text>
              <IconEntypo
                name="chevron-thin-right"
                size={13}
                color={Color.red}
              />
            </OpenURLButton>
            {data3.map((item: any) => {
              return (
                <View
                  style={[
                    styles.row2,
                    {
                      borderBottomWidth: item.id === 3 ? 0 : 0.2,
                      borderBottomColor: 'rgb(243, 223, 184)',
                    },
                  ]}>
                  <Text style={styles.label3}>{item.label}</Text>
                  <Text style={styles.label4}>{item.label1}</Text>
                </View>
              );
            })}
            <OpenURLButton style={[styles.row, styles.view4]} url={urlXoSo}>
              <Text style={[styles.label3, {fontSize: FontSize.h5}]}>
                Dò kết quả xổ số hằng ngày
              </Text>
              <Text
                style={[
                  styles.label4,
                  {paddingHorizontal: 5, fontSize: FontSize.h5},
                ]}>
                Dò ngay
              </Text>
              <IconEntypo
                name="chevron-thin-right"
                size={13}
                color={Color.red}
              />
            </OpenURLButton>
          </View>
        </View>
        <View style={styles.view}>
          <View style={styles.row}>
            <FastImage source={Icon.store} style={styles.styleIcon6} />
            <Text style={styles.label1}>
              Món ngon gần bạn trên Zalo Connect
            </Text>
          </View>
          <FastImage source={Images.location} style={styles.view5}>
            <View style={styles.row3}>
              <IconIonicons
                name={'search-outline'}
                size={20}
                color={Color.icon}
              />
              <Text style={styles.depcriptions}>Trà sữa</Text>
            </View>
            <View style={[styles.row2, {justifyContent: 'space-around'}]}>
              {data4.map((item: any) => {
                return (
                  <TouchableOpacity>
                    <View style={styles.icon3}>
                      <FastImage source={item.icon} style={styles.styleIcon1} />
                    </View>
                    <Text style={styles.label5}>{item.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </FastImage>
        </View>
      </ScrollView>

      <StatusBar
        mode={Constants.statusBar.light}
        navigation={navigation}
        backgroundColor={Color.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontFamily: fontFamily.headerFont,
    fontSize: FontSize.h5 * 1.1,
    color: Color.DimGray,
    padding: 15,
  },
  view: {
    backgroundColor: 'white',
    marginBottom: 8,
  },
  view1: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  icon1: {
    alignItems: 'center',
    margin: 1,
    width: 95,
    paddingBottom: 15,
  },
  view2: {
    backgroundColor: Color.backgroundIcon,
    borderRadius: 30,
    padding: 9,
    marginBottom: 5,
  },
  styleIcon1: {
    width: 22,
    height: 22,
  },
  text1: {
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h6,
    color: Color.DimGray,
  },
  styleIcon2: {
    width: 15,
    height: 15,
  },
  icon5: {
    width: 25,
    height: 25,
  },
  icon2: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'rgb(254, 232, 216)',
  },
  icon3: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 15,
  },
  row3: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 13,
    padding: 6,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  label1: {
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
    borderRadius: 30,
    paddingHorizontal: 10,
    padding: 15,
  },
  viewAds: {
    backgroundColor: Color.reject,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 30,
  },
  Ads: {
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h6 * 0.9,
    color: Color.Darkgray,
  },
  styleIcon3: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  styleIcon4: {
    width: '98%',
    height: 172,
    borderRadius: 20,
  },
  icon4: {
    padding: 7,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    width: '98%',
    height: 100,
    borderRadius: 20,
  },
  linearGradient2: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    width: 80,
    height: 80,
    borderRadius: 20,
    marginLeft: 7,
    marginBottom: 7,
  },
  linearGradient3: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 20,
  },
  text2: {
    color: 'white',
    fontFamily: fontFamily.headerFont,
    fontSize: FontSize.h5,
    paddingBottom: 5,
  },
  depcriptions: {
    fontFamily: fontFamily.primaryFont,
    color: Color.Darkgray,
    paddingHorizontal: 10,
  },
  styleIcon5: {
    padding: 10,
  },
  label2: {
    color: Color.red,
    paddingHorizontal: 5,
  },
  view3: {
    backgroundColor: 'rgb(254, 246, 229)',
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgb(243, 223, 184)',
    padding: 10,
  },
  openURLButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  label3: {
    flex: 1,
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
    fontSize: FontSize.h4 * 0.9,
  },
  label4: {
    color: Color.red,
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h4 * 0.9,
  },
  label5: {
    color: Color.DimGray,
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h6 * 0.9,
    marginTop: 8,
  },
  view4: {
    backgroundColor: 'rgb(254, 231, 175)',
    padding: 12,
    borderRadius: 10,
  },
  styleIcon6: {
    padding: 13,
  },
  view5: {
    marginHorizontal: 15,
    borderRadius: 15,
    marginBottom: 25,
    marginTop: 5,
  },
});
export default Discover;
