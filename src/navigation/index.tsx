import BottomTabBar from '@components/BottomTabBar';
import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConfirmOTP from '@screens/Authen/ConfirmOTP';
import CreateCustomer from '@screens/Authen/CreateCustomer';
import ForgetPassword from '@screens/Authen/ForgetPassword';
import Login from '@screens/Authen/Login';
import OnBoarding from '@screens/Authen/OnBoarding';
import Register from '@screens/Authen/Register';
import FriendRequest from '@screens/Home/ FriendRequest';
import PersonalFriendRequest from '@screens/Home/ FriendRequest/components/PersonalFriendRequest';
import Personal from '@screens/Home/ Personal';
import PostStatus from '@screens/Home/ Personal/components/PostStatus';
import AddFriend from '@screens/Home/AddFriend';
import Message from '@screens/Home/Message';
import OptionMessage from '@screens/Home/OptionMessage';
import SearchScreen from '@screens/Home/SearchScreen';
import Setting from '@screens/Home/Setting';
import {RootState} from '@store/index';
import React, {useEffect, useState} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {useDispatch, useSelector} from 'react-redux';
import {addUser, getUserProfile} from '../store/slice/user/userSlice';
import {RouterName} from './rootName';
const Stack = createNativeStackNavigator<any>();

const Application = () => {
  const [initializing, setInitializing] = useState(true);
  const [userApp, setUser] = useState();
  const {option} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  firebase.auth().settings.appVerificationDisabledForTesting = true;
  async function onAuthStateChanged(user: any) {
    setUser(user);
    const uid = user?._user?.uid;
    try {
      if (user) {
        dispatch(getUserProfile({uid}));
      }
    } catch (error) {
      console.log(error);
    }

    RNBootSplash.hide();

    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!userApp ? (
          <>
            <Stack.Screen name={RouterName.OnBoarding} component={OnBoarding} />
            <Stack.Screen name={RouterName.Login} component={Login} />
            <Stack.Screen name={RouterName.Register} component={Register} />
            <Stack.Screen name={RouterName.ConfirmOTP} component={ConfirmOTP} />
            <Stack.Screen
              name={RouterName.ForgetPassword}
              component={ForgetPassword}
            />
            <Stack.Screen
              name={RouterName.CreateCustomer}
              component={CreateCustomer}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={RouterName.BottomTabBar}
              component={BottomTabBar}
            />
            <Stack.Screen name={RouterName.Message} component={Message} />
            <Stack.Screen
              name={RouterName.OptionMessage}
              component={OptionMessage}
            />
            <Stack.Screen name={RouterName.Setting} component={Setting} />
            <Stack.Screen name={RouterName.AddFriend} component={AddFriend} />
            <Stack.Screen name={RouterName.Personal} component={Personal} />
            <Stack.Screen
              name={RouterName.FriendRequest}
              component={FriendRequest}
            />
            <Stack.Screen
              options={{
                animation: 'fade',
              }}
              name={RouterName.SearchScreen}
              component={SearchScreen}
            />
            <Stack.Screen
              options={{
                animation: 'slide_from_bottom',
              }}
              name={RouterName.PostStatus}
              component={PostStatus}
            />
            <Stack.Screen
              options={{
                animation: option,
                presentation: 'transparentModal',
                fullScreenGestureEnabled: true,
              }}
              name={RouterName.PersonalFriendRequest}
              component={PersonalFriendRequest}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Application;
