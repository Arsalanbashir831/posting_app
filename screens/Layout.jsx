import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserDataProvider } from '../context/userData';
import Profile from './Profile';
import Home from './Home';
import MyPost from './MyPost';

const Stack = createNativeStackNavigator();

const Layout = () => {
  return (
    <UserDataProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="MyPost" component={MyPost} />
        </Stack.Navigator>
    </UserDataProvider>
  );
};

export default Layout;
