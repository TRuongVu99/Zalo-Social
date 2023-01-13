import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Color, FontSize} from '../constants';
import {fontFamily} from '../assets/fonts/Font';
interface IValidate {
  notification?: string;
  isValid?: boolean;
}
const UiValidate = ({notification, isValid}: IValidate) => {
  if (isValid) {
    return (
      <View style={styles.view1}>
        <Text
          style={{
            fontSize: FontSize.h6 * 1.1,
            fontFamily: fontFamily.primaryFont,
            color: Color.DimGray,
          }}>
          {notification}
        </Text>
      </View>
    );
  }
  return <View style={styles.view2} />;
};
const styles = StyleSheet.create({
  view1: {
    backgroundColor: Color.notificationValidate,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  view2: {
    height: 33,
  },
});
export default UiValidate;
