import { useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../Firebase';
import { writeUserData } from '../UserProfile/ProfileDB';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFirebaseAuthentication = () => {
  const auth = getAuth(app);

  const userToken = async (token) => {
    await AsyncStorage.setItem('userToken', token);
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      userToken(user.uid);
      console.log(user.uid);
      // Additional logic if needed
      return { success: true, user };
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      return { success: false, errorCode, errorMessage };
    }
  };

  return { signIn };
};

const useFirebaseRegister = () => {
  const auth = getAuth(app);

  const register = async (email, password, username, firstname, lastname, bio) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user.uid);
      writeUserData(user.uid, username, email, firstname, lastname, bio);
      // Additional logic if needed
      return { success: true, user };
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      return { success: false, errorCode, errorMessage };
    }
  };

  return { register };
};

export { useFirebaseAuthentication, useFirebaseRegister };
