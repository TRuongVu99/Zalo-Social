import {View, Text} from 'react-native';
import React, {createContext, useState} from 'react';
export const UserNumberPhone = createContext({
  numberPhone: null,
  setNumberPhone: (value: any) => {},
});

export const useUserNumberPhone = () => {
  const [numberPhone, setNumberPhoneApp] = useState<Object | string | null>(
    null,
  );
  return {numberPhone, setNumberPhoneApp};
};
