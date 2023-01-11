import React, {createContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '@screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import Register from '@screens/Register';
import Detail from '@screens/Detail';
import {RouterName} from './rootName';
import CreateCustomer from '@screens/CreateCustomer';
import ConfirmOTP from '@screens/ConfirmOTP';
import StartScreen from '@screens/StartScreen';
import OnBoarding, {keySaveData} from '@screens/OnBoarding';

// export type RootStackParamList<T> = {
//   Register: 'Register';
//   CreateCustomer: 'CreateCustomer';
//   ConfirmOTP: 'ConfirmOTP';
// };

const Stack = createNativeStackNavigator<any>();
export const UserConText = createContext({
  user: null,
  setUser: () => {},
});
export const UserNumber = createContext({
  number: null,
  setNumber: () => {},
});
const Aplication = () => {
  const [user, setUserApp] = useState(null);
  const [number, setNumberApp] = useState(null);
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
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    async function getUser() {
      const data = await getData();
      setUserApp(data);
    }
    getUser();

    return () => setUserApp(null);
  }, []);
  useEffect(() => {
    async function getCustomerNumber() {
      const data = await getNumber();
      setNumberApp(data);
    }
    getCustomerNumber();

    return () => setUserApp(null);
  }, []);
  console.log(number);
  return (
    <UserConText.Provider
      value={{
        user,
        setUser: value => {
          setUserApp(value);
        },
      }}>
      <UserNumber.Provider
        value={{
          number,
          setNumber: value => {
            setNumberApp(value);
          },
        }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={RouterName.OnBoarding}>
            <Stack.Screen
              name={RouterName.Login}
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={RouterName.OnBoarding}
              component={OnBoarding}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={RouterName.Register}
              component={Register}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={RouterName.ConfirmOTP}
              component={ConfirmOTP}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name={RouterName.CreateCustomer}
              component={CreateCustomer}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={RouterName.Detail}
              component={Detail}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={RouterName.StartScreen}
              component={StartScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserNumber.Provider>
    </UserConText.Provider>
  );
};

export default Aplication;
