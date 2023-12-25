import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Input from '../widgets/Input';
import Button from '../widgets/Button';
import { useFirebaseAuthentication } from '../CustomHooks/Authentication/FirebaseAuthentication';
import { useNavigation } from '@react-navigation/native';



const AuthForm = () => {


  const [userData, setUserData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { email, password } = userData;
  const {signIn} = useFirebaseAuthentication()
const navigation=useNavigation();
  const handleOnChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleSignin = async (email,password) => { 
    const result = await signIn(email, password);

    if (result.success) {
    
      navigation.reset({index:0,routes:[{name:'Layout'}]});
    
    
    } else {
      setError("Invalid Credentials")
      console.error('Authentication failed:', result.errorCode, result.errorMessage);
    }
   }
  const handleOnSubmit = () => {
    setLoading(true);

    if (email === '' || password === '') {
      setError('All fields are required');
      alert(error);
      setLoading(false);
    } else {
      // API call
      setLoading(false);
      handleSignin(email,password);    
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={{color:'red'}}>{error}</Text>
      <Input
        placeholder="Enter Email"
        isSecure={false}
        onChange={(text) => handleOnChange('email', text)}
        value={email}
        style={styles.input}
      />
      <Input
        placeholder="Enter Password"
        isSecure={true}
        onChange={(text) => handleOnChange('password', text)}
        value={password}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button
          text="Login"
          onPress={handleOnSubmit}
          backgroundColor="black"
          textColor="#ffffff"
        />
      </View>
      <Text style={styles.signUpText}>
        Don't have an account?{' '}
        <Text onPress={()=>navigation.navigate('Signup')} style={styles.signUpLink}>Signup</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 20,
    color: '#333333',
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    fontSize: 16,
    color: '#333333',
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpText: {
    paddingTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#333333',
  },
  signUpLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default AuthForm;
