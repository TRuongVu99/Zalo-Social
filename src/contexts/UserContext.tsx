import React, {createContext, useState} from 'react';

export const UserContext = createContext({
  user: {
    userName: '',
    numberPhone: '',
  },
  setUser: (value: any) => {},
});
const UserProvider = ({children}: {children: any}) => {
  const [user, setUserApp] = useState<any>(null);

  return (
    <UserContext.Provider
      value={{user, setUser: (value: any) => setUserApp(value)}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
