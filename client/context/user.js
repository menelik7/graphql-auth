import React, { useState, createContext } from 'react';
import { useQuery } from '@apollo/client';
import query from '../queries/CurrentUser';

const UserContext = createContext();

export function Provider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const { loading, error, data, refetch } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  let { user } = data;

  const userContextToShare = {
    currentUser: currentUser || user,
    updateCurrentUserInfo: (latestInfo) => {
      refetch();
      setCurrentUser(latestInfo);
    },
  };

  return (
    <UserContext.Provider value={userContextToShare}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
