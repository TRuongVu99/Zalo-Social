import styles from '@screens/Home/Phonebook/styles';
import React, {useCallback} from 'react';
import {
  Alert,
  Linking,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
type OpenURLButtonProps = {
  url: string;
  children: any;
  style?: StyleProp<ViewStyle>;
};
const OpenURLButton = ({url, children, style}: OpenURLButtonProps) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity style={style} onPress={handlePress}>
      {children}
    </TouchableOpacity>
  );
};
export default OpenURLButton;
