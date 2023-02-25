import {Platform} from 'react-native';
export default {
  isIos: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
};
