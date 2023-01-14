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
// import {useUserNumberPhone, UserNumberPhone} from '../hook/useUserNumberPhone';
import React, {createContext, useEffect, useMemo, useState} from 'react';
import {useContext} from 'react';
import {RouterName} from './rootName';

const Stack = createNativeStackNavigator<any>();
export const UserConText = createContext({
  user: {
    userName: '',
    numberPhone: '',
  },
  setUser: (value: any) => {},
});
export const UserNumberPhone = createContext({
  numberPhone: {
    numberPhone: '',
    password: '',
  },
  setNumberPhone: (value: any) => {},
});
const account = {
  numberPhone: '0377081162',
  password: '123456',
};

const Aplication = () => {
  // const [user, setUserApp] = useState(null);
  // const {numberPhone, setNumberPhoneApp} = useUserNumberPhone();
  // const [numberPhone, setNumberPhoneApp] = useState<string | null>(null);
  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem(keySaveData);
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     // error reading value
  //   }
  // };
  const [numberPhone, setNumberPhoneApp] = useState<any>(null);
  console.log(numberPhone);
  const getNumber = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('customerNumber');
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading val
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
  }
  return (
    <UserNumberPhone.Provider
      value={{
        numberPhone,
        setNumberPhone: (number: any) => setNumberPhoneApp(number),
      }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={RouterName.OnBoarding}>
          {JSON.stringify(account) !== JSON.stringify(numberPhone) ? (
            <Stack.Screen
              name={RouterName.AuthenStack}
              component={AuthenStack}
            />
          ) : (
            <Stack.Screen
              name={RouterName.BottomTabBar}
              component={BottomTabBar}
            />
          )}

          <Stack.Screen
            name={RouterName.SearchScreen}
            component={SearchScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserNumberPhone.Provider>
  );
};

export default Aplication;
