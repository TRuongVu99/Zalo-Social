import React, {createContext, useState} from 'react';

export const UserNumberPhone = createContext({
  numberPhone: {
    numberPhone: '',
    password: '',
  },
  setNumberPhone: (value: any) => {},
});
const UserNumberPhoneProvider = ({
  children,
  setPhoneNumber,
}: {
  children: any;
  setPhoneNumber: (value: any) => void;
}) => {
  const [numberPhone, setUserApp] = useState<any>(null);

  return (
    <UserNumberPhone.Provider
      value={{
        numberPhone,
        setNumberPhone: setPhoneNumber,
      }}>
      {children}
    </UserNumberPhone.Provider>
  );
};

export default UserNumberPhoneProvider;
