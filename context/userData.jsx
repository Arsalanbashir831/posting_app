import React, { createContext, useState, useEffect } from 'react';
import { getUserData } from '../CustomHooks/UserProfile/ProfileDB';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            
 getUserData(token)
  .then(userData => setUser(userData))
  .catch(error => console.error(error));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUser();
  }, []);

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext, UserDataProvider };
