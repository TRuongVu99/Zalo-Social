// import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

const StartScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background.jpeg')}
        resizeMode="cover">
        <View>
          <Text>ahjsdg</Text>
        </View>
      </ImageBackground>
    </View>
  );
};
export default StartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
