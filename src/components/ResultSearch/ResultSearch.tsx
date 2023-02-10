import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import FontSize from '@constants/FontSize';
import Color from '@constants/Color';
import {fontFamily} from '@fonts/Font';
import {useNavigation} from '@react-navigation/native';
import {RouterName} from '@navigation/rootName';
import {Icon} from '@icon/index';

interface IResultSearch {
  data?: any;
  index?: number;
  listTitle: any;
}

type ItemProps = {
  item: any;
  onPress: () => void;
  borderBottomWidth: number;
  textColor: string;
  index: number | undefined;
};

const Item = ({
  item,
  onPress,
  borderBottomWidth,
  textColor,
  index,
}: ItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, {borderBottomWidth}]}>
    <Text style={[styles.title, {color: textColor}]}>
      {item} ({index})
    </Text>
  </TouchableOpacity>
);

const ResultSearch = ({data, index, listTitle}: IResultSearch) => {
  const navigation = useNavigation<any>();
  // const listTitle = ['TẤT CẢ', 'LIÊN HỆ', 'TIN NHẮN', 'KHÁM PHÁ'];
  const [selected, setSelected] = useState<string>('TẤT CẢ');
  const renderUI = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row'}}
        onPress={() => {
          navigation.navigate(RouterName.Message, {
            name: item.name,
          });
        }}>
        <Image source={{uri: item.url}} style={styles.avatarUser} />
        <View style={styles.userName}>
          <Text style={styles.name}>{item.name}</Text>
          <TouchableOpacity style={styles.backgroundCall}>
            <Image source={Icon.call} style={styles.call} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}: {item: any}) => {
    const borderBottomWidth = item === selected ? 1 : 0;
    const color = item === selected ? 'black' : Color.Darkgray;
    return (
      <Item
        item={item}
        index={index}
        onPress={() => setSelected(item)}
        textColor={color}
        borderBottomWidth={borderBottomWidth}
      />
    );
  };
  return (
    <View>
      <FlatList
        data={listTitle}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList1}
      />
      <FlatList data={data} renderItem={renderUI} style={{height: '100%'}} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  title: {
    fontSize: FontSize.h5 * 0.95,
    fontFamily: fontFamily.primaryFont,
  },
  flatList1: {
    borderBottomWidth: 1,
    borderBottomColor: Color.Darkgray,
  },
  avatarUser: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderWidth: 0.5,
    margin: 12,
  },
  userName: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Color.Gainsboro,
    borderBottomWidth: 1,
  },
  name: {
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h5 * 1.1,
  },
  call: {
    width: 13,
    height: 13,
    tintColor: Color.primary,
  },
  backgroundCall: {
    width: 40,
    height: 40,
    backgroundColor: Color.call,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
export default ResultSearch;
