import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
interface IOption {
  onPress: (value?: any) => void;
}
const Option = ({onPress}: IOption) => {
  return (
    <View style={styles.option}>
      <Text style={styles.text}>VN</Text>
      <TouchableOpacity onPress={onPress}>
        <Icon name={'chevron-down'} size={18} color={'#333'} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  option: {
    borderBottomWidth: 0.5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 60,
  },
  text: {
    fontSize: 16,
    paddingTop: 5,
  },
});
export default Option;
