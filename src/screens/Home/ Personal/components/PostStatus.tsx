import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {IHeaderEnum} from '@model/handelConfig';
import Header from '@components/Header';
import {windowWidth} from '@utils/Dimensions';
import FontSize from '@constants/FontSize';
import {fontFamily} from '@fonts/Font';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Color from '@constants/Color';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {arr, listIcon, listFontFamily} from '../data';
import RenderSelectFont from './RenderSelectFont';
import Touch from './Touch';
import Cursor from '@components/Cursor';

const PostStatus = () => {
  const inset = useSafeAreaInsets();
  const [isSelect, setIsSelect] = useState<number>(0);
  const [isSelectFont, setSelectFont] = useState<number>(0);
  const [font, setFont] = useState<any>(listFontFamily[0]);
  const [text, setText] = useState<string>('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <View style={styles.container}>
        <Header type={IHeaderEnum.PostStatus} />
        <View>
          <TextInput
            caretHidden={true}
            multiline={true}
            onChangeText={texts => setText(texts)}
            defaultValue={text}
            style={[
              styles.textInput,
              {
                fontFamily: font.font,
                color: 'transparent',
              },
            ]}
            placeholder="Bạn đang nghĩ gì?"
            placeholderTextColor={
              text.length !== 0 ? 'transparent' : font.colorPlaceholder
            }
          />
          <Text
            style={{
              position: 'absolute',
              marginHorizontal: 15,
              paddingTop: 25,
              fontSize: FontSize.h4,
              fontFamily: font.font,
              color: text.length !== 0 ? font.colorText : 'transparent',
            }}>
            {text}
            <Cursor />
          </Text>
        </View>
        <View style={styles.container} />
        <View style={styles.view1}>
          <FlatList
            data={listFontFamily}
            keyExtractor={(item: any) => item.key}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <RenderSelectFont
                onPress={() => {
                  setSelectFont(item.id);
                  setFont(item);
                }}
                item={item}
                isSelectFont={isSelectFont}
              />
            )}
          />
        </View>
        <View style={[styles.view1, {paddingBottom: inset.bottom}]}>
          {arr.map((items: any, key) => (
            <Touch
              key={key}
              onPress={() => setIsSelect(items.id)}
              items={items}
              isSelect={isSelect}
            />
          ))}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PostStatus;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
    paddingHorizontal: 7,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: Color.Darkgray,
    borderRadius: 10,
  },
  label: {
    fontFamily: fontFamily.primaryFont,
    fontSize: FontSize.h6,
    color: Color.DimGray,
    marginLeft: 5,
  },
  textInput: {
    fontSize: FontSize.h4,
    marginHorizontal: 15,
    paddingTop: 25,
  },
  view1: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
});
