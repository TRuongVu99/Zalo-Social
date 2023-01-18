import React, {createContext, useState} from 'react';

export const UserContext = createContext<any>({
  user: null,
  setUser: (value: any) => {},
});
const UserProvider = ({
  children,
  setUserProvider,
}: {
  children: any;
  setUserProvider: (value: any) => void;
}) => {
  const [user, setUserApp] = useState<any>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: setUserProvider,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
