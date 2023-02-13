import Color from '@constants/Color';
import FontSize from '@constants/FontSize';
import {fontFamily} from '@fonts/Font';
import {Icon} from '@icon/index';
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
interface IUIButton {
  item: any;
  onPress: () => void;
  notification?: boolean;
}
const UIButton = ({item, onPress, notification}: IUIButton) => {
  return (
    <TouchableOpacity
      key={item.label}
      style={[
        styles.item,
        {
          marginBottom: item.description !== null ? 10 : 0,
        },
      ]}
      onPress={onPress}>
      <Image source={item.icon} style={styles.icon} />
      <View style={styles.row}>
        <View>
          <Text style={[styles.labelStyle, styles.userName]}>{item.label}</Text>
          {item.description !== null && (
            <Text style={styles.description}>{item.description}</Text>
          )}
        </View>
        {item.description === null && notification && (
          <Image source={Icon.n} style={styles.notification} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default UIButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: FontSize.h4 * 0.8,
  },
  userName: {fontSize: FontSize.h4 * 0.9, marginBottom: 5},
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notification: {
    width: 18,
    height: 18,
    marginEnd: 22,
    tintColor: 'red',
  },
});
