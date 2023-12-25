
import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Input from '../widgets/Input';
import Button from '../widgets/Button';
import { useFirebaseAuthentication, useFirebaseRegister } from '../CustomHooks/Authentication/FirebaseAuthentication';
import { useNavigation } from '@react-navigation/native';


const RegisterForm = () => {
    const navigation=useNavigation();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        username: '',
        firstname: '',
        lastname: '',
        bio: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { email, password, username, firstname, lastname, bio } = userData;
    const {register} = useFirebaseRegister()

    const handleOnChange = (name, value) => {
        setUserData({ ...userData, [name]: value });
    };

    const handleRegisteration = async (email,password,username,firstname,lastname,bio) => {
        const result = await register(email, password, username, firstname, lastname, bio);

        if (result.success) {
            console.log('Registration successful:', result.user);
            // const {signIn} = useFirebaseAuthentication()
            // const result = await signIn(email, password);
            // if (result.success) {
            //     navigation.reset({index:0,routes:[{name:'Profile'}]});
            // } else {
            //     setError("Some Issue Occured")
            //     console.error('Authentication failed:', result.errorCode, result.errorMessage);
            // }
            navigation.reset({index:0,routes:[{name:'Login'}]});
            
        } else {
            setError("Registeration Failed")
            console.error('Registration failed:', result.errorCode, result.errorMessage);
        }
    }
    const handleOnSubmit = () => {
        setLoading(true);

        if (email === '' || password === '') {
            setError('All fields are required');
            alert(error);
            setLoading(false);
        } else {
            setLoading(false);
             handleRegisteration(
                userData.email,
                userData.password,
                userData.username,
                userData.firstname,
                userData.lastname,
                userData.bio
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={{ color: 'red' }}>{error}</Text>
            <Input
                placeholder="Enter Email"
                isSecure={false}
                onChange={(text) => handleOnChange('email', text)}
                value={email}
            />
            <Input
                placeholder="Enter Username"
                isSecure={false}
                onChange={(text) => handleOnChange('username', text)}
                value={username}
            />
            <Input
                placeholder="Enter First Name"
                isSecure={false}
                onChange={(text) => handleOnChange('firstname', text)}
                value={firstname}
            />
            <Input
                placeholder="Enter Last Name"
                isSecure={false}
                onChange={(text) => handleOnChange('lastname', text)}
                value={lastname}
            />
            <Input
                placeholder="Enter Bio"
                isSecure={false}
                onChange={(text) => handleOnChange('bio', text)}
                value={bio}
            />
            <Input
                placeholder="Enter Password"
                isSecure={true}
                onChange={(text) => handleOnChange('password', text)}
                value={password}
            />
            <View style={styles.buttonContainer}>
                <Button
                    text="Signup"
                    onPress={handleOnSubmit}
                    backgroundColor="#000"
                    textColor="#fff"
                />
            </View>
            <View style={styles.loginContainer}>
                <Text>
                    Already have an account?{' '}
                    <Text onPress={()=> navigation.navigate('Login')} style={styles.loginText}>Login</Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    buttonContainer: {
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginContainer: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginText: {
        color: 'blue',
        fontWeight: 'bold',
    },
});


export default RegisterForm