import BottomTabBar from '@components/BottomTabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ConfirmOTP from '@screens/ConfirmOTP';
import CreateCustomer from '@screens/CreateCustomer';
import ForgetPassword from '@screens/ForgetPassword';
import SearchScreen from '@screens/Home/SearchScreen';
import Login, {keySaveNumberPhone} from '@screens/Login';
import OnBoarding from '@screens/OnBoarding';
import Register from '@screens/Register';
import React, {useEffect, useState} from 'react';
import {useContext} from 'react';
import {UserNumberPhone} from '../hook/UserNumberPhone';
import {UserNumberPhoneProvider, UserProvider} from '../hook';
import {RouterName} from './rootName';

const Stack = createNativeStackNavigator<any>();
export const account = {
  numberPhone: '0377081162',
  password: '123456',
};
const Aplication = () => {
  const [numberPhone, setNumberPhoneApp] = useState<any>(null);
  const [user, setUserApp] = useState<any>(null);
  console.log(numberPhone);
  const {setNumberPhone} = useContext(UserNumberPhone);

  const getNumber = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(keySaveNumberPhone);
      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      throw e;
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
    <UserProvider setUser={(vlu: any) => setUserApp(vlu)}>
      <UserNumberPhoneProvider
        setPhoneNumber={(data: any) => setNumberPhoneApp(data)}>
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
      </UserNumberPhoneProvider>
    </UserProvider>
  );
};

export default Aplication;
