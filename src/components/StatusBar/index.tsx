import Color from '@constants/Color';
import React, {useEffect} from 'react';
import {
  View,
  StatusBar as RNStatusBar,
  Platform,
  StatusBarStyle,
} from 'react-native';

export const Constants = {
  statusBar: {
    dark: 'dark-content',
    light: 'light-content',
  },
};

const StatusBar = ({
  navigation,
  mode,
  backgroundColor,
}: {
  navigation: any;
  mode: any;
  backgroundColor?: any;
}) => {
  useEffect(() => {
    const removeListenerFocus = navigation.addListener('focus', setRNStatusBar);

    return removeListenerFocus;
  }, [navigation]);

  const setRNStatusBar = () => {
    if (mode === Constants.statusBar.dark) {
      RNStatusBar.setBarStyle(Constants.statusBar.light as StatusBarStyle);
      if (Platform.OS === 'android') {
        RNStatusBar.setBackgroundColor(
          backgroundColor ? backgroundColor : Color.black,
          true,
        );
      }
    } else {
      RNStatusBar.setBarStyle(Constants.statusBar.dark as StatusBarStyle);
      if (Platform.OS === 'android') {
        RNStatusBar.setBackgroundColor(
          backgroundColor ? backgroundColor : Color.white,
          true,
        );
      }
    }
  };
  return <View />;
};

StatusBar.defaultProps = {
  mode: Constants.statusBar.dark,
};

export default StatusBar;
