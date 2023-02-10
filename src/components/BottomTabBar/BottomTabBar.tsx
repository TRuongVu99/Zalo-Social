import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouterName} from '@navigation/rootName';
import HomeMessage from '@screens/Home/HomeMessage';
import Phonebook from '@screens/Home/Phonebook';
import Discover from '@screens/Home/Discover';
import NewFeed from '@screens/Home/NewFeed';
import Profile from '@screens/Home/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Color from '@constants/Color';
import {Icon} from '@icon/index';
const Tab = createBottomTabNavigator<any>();
interface IMyTabBar {
  state: any;
  descriptors: any;
  navigation: any;
}
export const screenOptions = ({route}: {route: any}) => ({
  headerShown: false,
  tabBarActiveTintColor: Color.primary,
  tabBarInactiveTintColor: Color.Darkgray,
  tabBarIcon: ({focused}: {focused: any}) => {
    return (
      <Image
        source={
          route.name === RouterName.HomeMessage
            ? Icon.message
            : route.name === RouterName.Phonebook
            ? Icon.phonebook
            : route.name === RouterName.Discover
            ? Icon.discover
            : route.name === RouterName.NewFeed
            ? Icon.newfeed
            : route.name === RouterName.Profile
            ? Icon.profile
            : ''
        }
        style={{
          width: 25,
          height: 25,
          tintColor: focused ? Color.primary : Color.Darkgray,
        }}
      />
    );
  },
});
// function MyTabBar({state, descriptors, navigation}: IMyTabBar) {
//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//       }}>
//       {state.routes.map(
//         (route: {key: string | number; name: string}, index: any) => {
//           const {options} = descriptors[route.key];
//           const label =
//             options.tabBarLabel !== undefined
//               ? options.tabBarLabel
//               : options.title !== undefined
//               ? options.title
//               : route.name;

//           const isFocused = state.index === index;

//           const onPress = () => {
//             const event = navigation.emit({
//               type: 'tabPress',
//               target: route.key,
//               canPreventDefault: true,
//             });

//             if (!isFocused && !event.defaultPrevented) {
//               // The `merge: true` option makes sure that the params inside the tab screen are preserved
//               navigation.navigate({name: route.name, merge: true});
//             }
//           };

//           const onLongPress = () => {
//             navigation.emit({
//               type: 'tabLongPress',
//               target: route.key,
//             });
//           };

//           return (
//             <TouchableOpacity
//               accessibilityRole="button"
//               accessibilityState={isFocused ? {selected: true} : {}}
//               accessibilityLabel={options.tabBarAccessibilityLabel}
//               testID={options.tabBarTestID}
//               onPress={onPress}
//               onLongPress={onLongPress}
//               style={{flex: 1}}>
//               <Image
//                 source={
//                   route.name === RouterName.HomeMessage
//                     ? Icon.message
//                     : route.name === RouterName.Phonebook
//                     ? Icon.phonebook
//                     : route.name === RouterName.Discover
//                     ? Icon.discover
//                     : route.name === RouterName.NewFeed
//                     ? Icon.newfeed
//                     : route.name === RouterName.Profile
//                     ? Icon.profile
//                     : ''
//                 }
//                 style={{
//                   width: 25,
//                   height: 25,
//                   tintColor: isFocused ? Color.primary : Color.Darkgray,
//                 }}
//               />
//               <Text style={{color: isFocused ? Color.primary : Color.Darkgray}}>
//                 {label}
//               </Text>
//             </TouchableOpacity>
//           );
//         },
//       )}
//     </View>
//   );
// }
const Stack = createNativeStackNavigator<any>();

const UITab = () => {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      initialRouteName={RouterName.HomeMessage}
      // tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name={RouterName.HomeMessage}
        component={HomeMessage}
        options={{title: 'Nhắn tin'}}
      />
      <Tab.Screen
        name={RouterName.Phonebook}
        component={Phonebook}
        options={{title: 'Danh bạ'}}
      />
      <Tab.Screen
        name={RouterName.Discover}
        component={Discover}
        options={{title: 'Khám Phá'}}
      />
      <Tab.Screen
        name={RouterName.NewFeed}
        component={NewFeed}
        options={{title: 'Nhật ký'}}
      />
      <Tab.Screen
        name={RouterName.Profile}
        component={Profile}
        options={{title: 'Cá Nhân'}}
      />
    </Tab.Navigator>
  );
};

export default UITab;
