import React, {createContext, useState} from 'react';

export const UserAccount = createContext({
  account: {
    numberPhone: '',
    password: '',
  },
  setAccount: (value: any) => {},
});
const AccountProvider = ({
  children,
  setAccountProvider,
}: {
  children: any;
  setAccountProvider?: (value: any) => void;
}) => {
  const [account, setUserApp] = useState<any>({
    numberPhone: '',
    password: '',
  });

  return (
    <UserAccount.Provider
      value={{
        account,
        setAccount: setUserApp,
      }}>
      {children}
    </UserAccount.Provider>
  );
};

export default AccountProvider;
