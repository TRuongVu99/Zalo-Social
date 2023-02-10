import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0)',
      }}>
      <View
        style={{
          backgroundColor: 'red',
          width: '60%',
          height: '50%',
        }}
      />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

const TabbarFriend = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12, color: 'transparent'},
        tabBarIndicatorStyle: {backgroundColor: 'transparent'},
        tabBarItemStyle: {width: 100, backgroundColor: 'transparent'},
        tabBarStyle: {backgroundColor: 'transparent'},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          presentation: 'transparentModal',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          presentation: 'transparentModal',
        }}
      />
    </Tab.Navigator>
  );
};
export default TabbarFriend;
