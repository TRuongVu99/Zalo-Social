import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Color, FontSize} from '../constants';
import {fontFamily} from '../assets/fonts/Font';
interface IValidate {
  notification?: string;
  isValid: boolean;
}
const UiValidate = ({notification, isValid}: IValidate) => {
  if (isValid) {
    return (
      <View style={styles.view1}>
        <Text
          style={{
            fontSize: FontSize.h6,
          }}>
          {notification}
        </Text>
      </View>
    );
  }
  return <View />;
};
const styles = StyleSheet.create({
  view1: {
    backgroundColor: Color.notificationValidate,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
export default UiValidate;
