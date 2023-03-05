import Color from '@constants/Color';
import FontSize from '@constants/FontSize';
import {fontFamily} from '@fonts/Font';
import {IOptionEnum} from '@model/handelConfig';
import {windowWidth} from '@utils/Dimensions';
import React from 'react';
import {
  GestureResponderEvent,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IOpstion {
  onPress1?: (event: GestureResponderEvent) => void;
  onPress2?: (event: GestureResponderEvent) => void;
  onPress3?: (event: GestureResponderEvent) => void;
  onPress4?: (event: GestureResponderEvent) => void;
  onRequestClose?: (event: GestureResponderEvent) => void;
  onPressCancel?: (event: GestureResponderEvent) => void;
  onDeleteStatus?: (event: GestureResponderEvent) => void;
  isSelect?: boolean;
  data: Array<any>;
  type: string;
}
const Opstion = ({
  onPress1,
  onPress2,
  onPress3,
  onPress4,
  onRequestClose,
  onPressCancel,
  onDeleteStatus,
  isSelect,
  data,
  type,
}: IOpstion) => {
  const inset = useSafeAreaInsets();

  switch (type) {
    case IOptionEnum.Avatar:
      return (
        <Modal animationType="slide" transparent={true} visible={isSelect}>
          <Pressable
            onPress={onRequestClose}
            style={[
              styles.modalContainer,
              {marginBottom: Platform.OS === 'ios' ? inset.bottom : 10},
            ]}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{data[0]?.label}</Text>
              {data.map((item: any) => {
                if (item.id !== 0) {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.button}
                      onPress={
                        item.id === 1
                          ? onPress1
                          : item.id === 2
                          ? onPress2
                          : item.id === 3
                          ? onPress3
                          : onPress4
                      }>
                      <Text style={styles.textStyle}>{item.label}</Text>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>
            <Pressable style={[styles.buttonClose]} onPress={onPressCancel}>
              <Text style={[styles.textStyle, {fontWeight: '500'}]}>Huỷ</Text>
            </Pressable>
          </Pressable>
        </Modal>
      );
    case IOptionEnum.HandleStatus:
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isSelect}
          onRequestClose={onRequestClose}>
          <Pressable onPress={onRequestClose} style={[styles.modalContainers]}>
            <View
              style={[
                styles.modalViews,
                {paddingBottom: Platform.OS === 'ios' ? inset.bottom : 10},
              ]}>
              {data.map((item: any, index: number) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.buttons}
                    onPress={
                      item.id === 0
                        ? onPress1
                        : item.id === 1
                        ? onPress2
                        : onDeleteStatus
                    }>
                    <FastImage
                      source={item.icon}
                      style={styles.icon}
                      tintColor={Color.icon}
                      resizeMode={'contain'}
                    />
                    <View
                      style={[
                        styles.text,
                        {
                          borderBottomWidth: index !== 2 ? 0.5 : 0,
                        },
                      ]}>
                      <Text style={styles.textStyles}>{item.label}</Text>
                      <Text style={styles.textDepcription}>
                        {item.depcription}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Pressable>
        </Modal>
      );
    default:
      return <View />;
  }
};

export default Opstion;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    marginHorizontal: 10,
  },
  modalContainers: {
    justifyContent: 'flex-end',
    flex: 1,
  },

  modalView: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 13,
    alignItems: 'center',
  },
  modalViews: {
    backgroundColor: 'white',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  button: {
    width: windowWidth,
    borderRadius: 13,
    padding: 15,
    borderTopWidth: 0.5,
    borderTopColor: Color.Gainsboro,
  },
  text: {
    borderBottomColor: Color.Gainsboro,
    paddingVertical: 18,
    flex: 1,
    marginRight: 10,
  },
  buttons: {
    width: windowWidth,
    borderRadius: 13,
    flexDirection: 'row',
  },
  buttonClose: {
    backgroundColor: 'white',
    borderRadius: 13,
    padding: 10,
    paddingVertical: 15,
    marginTop: 5,
  },
  textStyle: {
    color: Color.blue2,
    textAlign: 'center',
    fontSize: FontSize.h3,
  },
  modalText: {
    padding: 15,
    color: 'gray',
  },
  textStyles: {
    fontFamily: fontFamily.primaryFont,
    color: Color.DimGray,
    fontSize: FontSize.h4,
  },
  textDepcription: {
    fontFamily: fontFamily.primaryFont,
    color: 'gray',
    marginRight: 70,
  },
  icon: {
    width: 25,
    height: 25,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
});
