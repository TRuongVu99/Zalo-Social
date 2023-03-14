import Header from '@components/Header';
import StatusBar, {Constants} from '@components/StatusBar';
import Color from '@constants/Color';
import FontSize from '@constants/FontSize';
import {fontFamily} from '@fonts/Font';
import {Icon} from '@icon/index';
import {IHeaderEnum, IPeronalEnum} from '@model/handelConfig';
import {RouterName} from '@navigation/rootName';
import {useNavigation} from '@react-navigation/native';
import {endLoading, startLoading} from '@store/slice/app/appSlice';
import {getStatus} from '@store/slice/contents/contentsSlice';
import React, {useRef, useState} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import {useDispatch} from 'react-redux';
import {data, listItem1} from './data';
const Optional = ({route}: {route: any}) => {
  const {profile} = route.params;
  const navigation = useNavigation<any>();
  const {bottom} = useSafeAreaInsets();
  const dispatch = useDispatch<any>();
  const [isEnabled, setIsEnabled] = useState(false);
  const actionSheet = useRef<any>();
  const optionArray = [
    'Trong 1 giờ',
    'Trong 4 giờ',
    'Đến 8 giờ sáng',
    'Cho đến khi được mở lại',
    'Huỷ',
  ];
  const onGetStatus = async () => {
    dispatch(startLoading());
    await dispatch(
      getStatus({
        numberPhone: profile.numberPhone,
      }),
    ).unwrap();
    dispatch(endLoading());
  };
  const renderItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          {
            marginBottom:
              item.id === 4 || item.id === 7 || item.id === 12 ? 10 : 0,
            marginTop: item.id === 4 ? 10 : 0,
          },
        ]}>
        <FastImage
          source={item.icon}
          style={styles.icon}
          tintColor={Color.icon}
        />
        <View style={styles.container}>
          <Text style={[styles.labelStyle, styles.userName]}>
            {item.id === 5
              ? `${item.label} ${profile.username}`
              : item.id === 6
              ? `${item.label} ${profile.username} ${item.labels}`
              : item.label}
          </Text>
        </View>
        {item.iconRight && (
          <TouchableOpacity style={{padding: 10}}>
            <IconEntypo name="chevron-thin-right" size={12} color={'black'} />
          </TouchableOpacity>
        )}
        {item.switch && (
          <Switch
            trackColor={{false: '#767577', true: Color.primary}}
            thumbColor={'white'}
            onValueChange={() => setIsEnabled(previousState => !previousState)}
            value={isEnabled}
            style={{
              transform: [{scaleX: 0.9}, {scaleY: 0.9}],
              marginRight: 10,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar
        mode={Constants.statusBar.light}
        navigation={navigation}
        backgroundColor={Color.primary}
      />
      <Header
        label={'Tuỳ chọn'}
        type={IHeaderEnum.Register}
        onPressExit={() => navigation.goBack()}
        StyleHeaderSetting={{
          paddingVertical: Platform.OS === 'android' ? 14 : 10,
        }}
      />
      <ActionSheet
        ref={actionSheet}
        title={'Không thông báo tin nhắn tới hội thoại này'}
        options={optionArray}
        cancelButtonIndex={4}
        onPress={(index: number) => {
          // Clicking on the option will give you alert
          //   alert(optionArray[index]);
        }}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        extraData={(item: any) => item.label}
        ListHeaderComponent={
          <View>
            <View style={styles.view2}>
              <FastImage source={{uri: profile.avatar}} style={styles.avatar} />
              <Text style={styles.username}>{profile.username}</Text>
              <View style={{flexDirection: 'row'}}>
                {listItem1.map((item: any) => {
                  return (
                    <View style={styles.view1}>
                      <TouchableOpacity
                        style={styles.button1}
                        onPress={async () => {
                          switch (item.id) {
                            case 2:
                              onGetStatus();
                              navigation.navigate(RouterName.Personal, {
                                profile,
                                type: IPeronalEnum.Friend,
                              });
                              break;
                            case 4:
                              actionSheet.current.show();
                          }
                        }}>
                        <IconEvilIcons
                          name={item.icon}
                          size={28}
                          color={Color.icon}
                        />
                      </TouchableOpacity>
                      <Text style={styles.label1}>{item.label}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
            <TouchableOpacity style={[styles.item, {marginVertical: 10}]}>
              <FastImage
                source={Icon.padlock}
                tintColor={Color.icon}
                style={styles.icon}
              />
              <View>
                <View style={styles.row}>
                  <Text style={[styles.labelStyle, styles.userName]}>
                    Mã hoá đầu cuối
                  </Text>
                  <View style={styles.viewBeta}>
                    <Text style={styles.beta}>BETA</Text>
                  </View>
                </View>
                <Text style={[styles.description, {fontSize: FontSize.h6}]}>
                  Chưa nâng cấp
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelStyle: {
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
  },
  description: {
    fontFamily: fontFamily.primaryFont,
    fontWeight: '300',
    color: Color.DimGray,
  },
  userName: {fontSize: FontSize.h4 * 0.95, marginBottom: 5},
  icon: {
    width: 25,
    height: 25,

    marginHorizontal: 18,
  },
  item: {
    paddingVertical: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 15,
  },
  username: {
    fontFamily: fontFamily.SanFranciscoDisplayMedium,
    fontSize: FontSize.h3,
    marginBottom: 30,
  },
  view1: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: Color.reject,
    width: 37,
    height: 37,
    marginBottom: 10,
  },
  label1: {
    fontSize: FontSize.h6,
    textAlign: 'center',
    width: 60,
    color: Color.DimGray,
    fontFamily: fontFamily.PoppinsRegular,
  },
  row: {flexDirection: 'row', alignItems: 'center', backgroundColor: 'white'},
  beta: {
    color: 'white',
    fontFamily: fontFamily.SanFranciscoDisplayMedium,
    fontWeight: 'bold',
    fontSize: FontSize.h6 * 0.9,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  view2: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  viewBeta: {
    backgroundColor: 'rgb(23, 166, 72)',
    borderRadius: 10,
    top: -2,
    marginLeft: 10,
  },
});
export default Optional;
