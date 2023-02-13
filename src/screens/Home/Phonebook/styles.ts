import Color from '@constants/Color';
import FontSize from '@constants/FontSize';
import {fontFamily} from '@fonts/Font';
import {windowWidth} from '@utils/Dimensions';
import {Platform, StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    marginHorizontal: 18,
  },
  listTitle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 0.2,
    borderBottomColor: Color.Darkgray,
  },
  icon: {
    width: 35,
    height: 35,
    marginHorizontal: 18,
    alignSelf: 'center',
  },
  item: {
    paddingVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
  },
  description: {
    fontFamily: fontFamily.primaryFont,
    fontWeight: '300',
    color: Platform.OS === 'ios' ? Color.DimGray : Color.Darkgray,
    // fontSize: Platform.OS === 'android' ? FontSize.h6 : null,
  },
  userName: {
    fontSize: FontSize.h4 * 0.9,
    marginBottom: 5,
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
  },
  title: {
    textAlign: 'center',
    width: windowWidth / 3,
    paddingVertical: 10,
  },
  line: {
    borderBottomColor: Color.blue,
    borderBottomWidth: 1,
    width: windowWidth / 4,
    position: 'absolute',
    bottom: 0,
    left: 20,
  },
  phoneBook: {
    flex: 1,
    backgroundColor: 'white',
  },
  icons: {
    width: 23,
    height: 23,
    alignSelf: 'center',
    tintColor: 'gray',
    marginHorizontal: 10,
  },
  label: {
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 30,
    borderColor: Color.Gainsboro,
  },
  friend: {flexDirection: 'row', marginVertical: 15},
  name: {flex: 1, flexDirection: 'row', alignItems: 'center'},
});
