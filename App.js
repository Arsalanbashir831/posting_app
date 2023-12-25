import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import Signup from './screens/Signup';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Layout from './screens/Layout';
import useUserToken from './CustomHooks/UserProfile/UserToken';


const Stack = createNativeStackNavigator();
export default function App() {
 const userToken= useUserToken();
  return (
 <NavigationContainer>
      <Stack.Navigator>
       
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />  
            <Stack.Screen name="Layout" component={Layout} options={{ headerShown: false }} />
     
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
