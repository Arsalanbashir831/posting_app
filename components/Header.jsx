import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';


const Header = () => {
    const navigation = useNavigation();
 
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };
  const handleLogout = () => {
     AsyncStorage.removeItem('userToken');
    navigation.navigate('Login');
  }

  return (
    <View style={styles.header}>
      {/* Left side with app name */}
      <Text style={styles.appName}>Your App Name</Text>

      {/* Right side with profile button */}
      <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
      <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('MyPost')} style={styles.profileButton}>
      <Text>Your Post</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.profileButton}>
      <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#3498db', // Change the background color as needed
    paddingHorizontal: 10,
    marginVertical:30
  },
  appName: {
    fontSize: 18,
    color: '#fff', // Change the text color as needed
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 10,
  },
  profileIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff', // Change the icon color as needed
  },
});

export default Header;
