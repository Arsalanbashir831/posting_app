import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import AuthForm from '../components/AuthForm'
import useUserToken from '../CustomHooks/UserProfile/UserToken'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
const user=  useUserToken()
console.log(user);
const navigation = useNavigation();  
useEffect(()=>{
  if(user){
    navigation.navigate('Layout');
  }
})
return (   
    <AuthForm/>
  )
}

export default Login