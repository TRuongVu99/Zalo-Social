import Color from '@constants/Color';
import FontSize from '@constants/FontSize';
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IOpstion {
  onPress1?: (event: GestureResponderEvent) => void;
  onPress2?: (event: GestureResponderEvent) => void;
  onPress3?: (event: GestureResponderEvent) => void;
  onPress4?: (event: GestureResponderEvent) => void;
  onRequestClose?: (event: GestureResponderEvent) => void;
  onPressCancel?: (event: GestureResponderEvent) => void;
  isSelect?: boolean;
  data: Array<any>;
}
const Opstion = ({
  onPress1,
  onPress2,
  onPress3,
  onPress4,
  onRequestClose,
  onPressCancel,
  isSelect,
  data,
}: IOpstion) => {
  const inset = useSafeAreaInsets();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isSelect}
      onRequestClose={onRequestClose}>
      <View
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
      </View>
    </Modal>
  );
};

export default Opstion;

const styles = StyleSheet.create({
  modalContainer: {justifyContent: 'flex-end', flex: 1, marginHorizontal: 10},
  modalView: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 13,
    alignItems: 'center',
    blurRadius: 10,
  },
  button: {
    width: windowWidth,
    borderRadius: 13,
    padding: 15,
    borderTopWidth: 0.5,
    borderTopColor: Color.Gainsboro,
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
});
