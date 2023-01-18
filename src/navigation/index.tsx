import BottomTabBar from '@components/BottomTabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConfirmOTP, {keySaveAccount, keySaveUser} from '@screens/ConfirmOTP';
import CreateCustomer from '@screens/CreateCustomer';
import ForgetPassword from '@screens/ForgetPassword';
import SearchScreen from '@screens/Home/SearchScreen';
import Login, {keySaveNumberPhone} from '@screens/Login';
import OnBoarding from '@screens/OnBoarding';
import Register from '@screens/Register';
import React, {createContext, useEffect, useState} from 'react';
import {UserProvider, useStateCallback} from '../hook';
import {RouterName} from './rootName';
import Message from '@screens/Home/Message';
import OptionMessage from '@screens/Home/OptionMessage';
import RNBootSplash from 'react-native-bootsplash';
const Stack = createNativeStackNavigator<any>();
// export const AccountUser = createContext<any>({
//   account: null,
//   setAccount: (value: any) => {},
// });

const Aplication = () => {
  const [numberPhone, setNumberPhoneApp] = useState<any>(null);
  const [user, setUserApp] = useStateCallback<any>(null);
  const [account, setAccountApp] = useState<any>(null);
  console.log(user);
  console.log(account);
  const getAccount = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(keySaveAccount);
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      throw e;
    }
  };

  // useEffect(() => {
  //   const init = async () => {
  //     // …do multiple sync or async tasks
  //   };

  //   init().finally(async () => {
  //     await RNBootSplash.hide({fade: true, duration: 500});
  //   });
  // }, []);
  useEffect(() => {
    async function getDataAccount() {
      try {
        const data = await getAccount();
        setAccountApp(data);

        RNBootSplash.hide({fade: false, duration: 1500});
      } catch (e) {}
    }
    // console.log(getDataAccount());
    getDataAccount();
    // getDataAccount().finally(() => {});
  }, []);

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(keySaveUser);
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      throw e;
    }
  };
  useEffect(() => {
    async function getData() {
      const data = await getUser();
      setUserApp(data);
    }
    getData();

    return () => setUserApp(null);
  }, []);

  /*  const getNumber = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(keySaveNumberPhone);
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // throw e;
    }
  };
  useEffect(() => {
    async function getCustomerNumber() {
      const data = await getNumber();
      setNumberPhoneApp(data);
    }
    getCustomerNumber();

    return () => {
      setNumberPhoneApp(null);
    };
  }, []);

  function AuthenStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
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
      </Stack.Navigator>
    );
  }*/

  return (
    <UserProvider setUserProvider={(value: any) => setUserApp(value)}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {JSON.stringify(account) !== JSON.stringify(user) ? (
            // <Stack.Screen
            //   name={RouterName.AuthenStack}
            //   component={AuthenStack}
            // />
            <>
              <Stack.Screen
                name={RouterName.OnBoarding}
                component={OnBoarding}
              />
              <Stack.Screen name={RouterName.Login} component={Login} />
              <Stack.Screen name={RouterName.Register} component={Register} />
              <Stack.Screen
                name={RouterName.ConfirmOTP}
                component={ConfirmOTP}
              />
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
              <Stack.Screen
                name={RouterName.SearchScreen}
                component={SearchScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default Aplication;
