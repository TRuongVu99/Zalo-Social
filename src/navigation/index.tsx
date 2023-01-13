import BottomTabBar from '@components/BottomTabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConfirmOTP from '@screens/ConfirmOTP';
import CreateCustomer from '@screens/CreateCustomer';
import ForgetPassword from '@screens/ForgetPassword';
import SearchScreen from '@screens/Home/SearchScreen';
import Login from '@screens/Login';
import OnBoarding, {keySaveData} from '@screens/OnBoarding';
import Register from '@screens/Register';
import {useUserNumberPhone, UserNumberPhone} from '../hook/useUserNumberPhone';
import React, {createContext, useEffect, useMemo, useState} from 'react';
import {RouterName} from './rootName';

// export type RootStackParamList<T> = {
//   Register: 'Register';
//   CreateCustomer: 'CreateCustomer';
//   ConfirmOTP: 'ConfirmOTP';
// };

const Stack = createNativeStackNavigator<any>();
export const UserConText = createContext({
  user: null,
  setUser: (value: any) => {},
});

const Aplication = () => {
  const [user, setUserApp] = useState(null);
  const {numberPhone, setNumberPhoneApp} = useUserNumberPhone();
  // const [numberPhone, setNumberPhoneApp] = useState<string | null>(null);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(keySaveData);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const getNumber = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('customerNumber');
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  // useEffect(() => {
  //   async function getUser() {
  //     const data = await getData();
  //     setUserApp(data);
  //   }
  //   getUser();

  //   return () => setUserApp(null);
  // }, []);
  useEffect(() => {
    async function getCustomerNumber() {
      const data = await getNumber();
      if (data && Object.keys(data).length > 0) {
        setNumberPhoneApp(data);
      }
    }
    getCustomerNumber();

    return () => {
      setNumberPhoneApp(null);
    };
  }, []);
  // console.log(numberPhone);
  const value = useMemo(
    () => ({
      numberPhone,
      setNumberPhone: (number: any) => setNumberPhoneApp(number),
    }),
    [numberPhone],
  );
  const AuthenStack = () => {
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
  };
  const MainNavigation = () => (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={RouterName.AuthenStack}>
        <Stack.Screen name={RouterName.BottomTabBar} component={BottomTabBar} />
        <Stack.Screen name={RouterName.SearchScreen} component={SearchScreen} />
        <Stack.Screen name={RouterName.AuthenStack} component={AuthenStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  return (
    <UserNumberPhone.Provider
      value={{
        numberPhone,
        setNumberPhone: (number: any) => setNumberPhoneApp(number),
      }}>
      <MainNavigation />
    </UserNumberPhone.Provider>
  );
};

export default Aplication;
