import BottomTabBar from '@components/BottomTabBar';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConfirmOTP from '@screens/ConfirmOTP';
import CreateCustomer from '@screens/CreateCustomer';
import ForgetPassword from '@screens/ForgetPassword';
import Message from '@screens/Home/Message';
import OptionMessage from '@screens/Home/OptionMessage';
import SearchScreen from '@screens/Home/SearchScreen';
import Setting from '@screens/Home/Setting';
import Login from '@screens/Login';
import OnBoarding from '@screens/OnBoarding';
import Register from '@screens/Register';
import {RootState} from '@store/index';
import React, {useEffect, useState} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {useDispatch, useSelector} from 'react-redux';
import {addUser} from '../store/slice/user/userSlice';
import {addFrends} from '../store/slice/frends/frendsSlice';
import {RouterName} from './rootName';

const Stack = createNativeStackNavigator<any>();

const Application = () => {
  const [initializing, setInitializing] = useState(true);
  const [userApp, setUser] = useState();
  const {profileUser} = useSelector((state: RootState) => state.user);
  const {listFrends} = useSelector((state: RootState) => state.frends);
  console.log(listFrends);
  const dispatch = useDispatch();
  function onResult(QuerySnapshot: any) {
    QuerySnapshot.forEach((documentSnapshot: any) => {
      dispatch(addFrends(documentSnapshot.data()));
    });
  }
  function onError(error: any) {
    console.error(error);
  }
  useEffect(() => {
    firestore().collection('Users').onSnapshot(onResult, onError);
  }, []);

  async function onAuthStateChanged(user: any) {
    setUser(user);
    const uid = user?._user?.uid;
    try {
      if (user) {
        await firestore()
          .collection('Users')
          // Filter results
          .where('uid', '==', uid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
              dispatch(addUser(documentSnapshot.data()));
            });
          });
      }
    } catch (error) {
      console.log(error);
    }

    RNBootSplash.hide();
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

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
            <Stack.Screen
              options={{
                animation: 'fade',
              }}
              name={RouterName.SearchScreen}
              component={SearchScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Application;
