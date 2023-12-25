import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal,TextInput } from 'react-native';
import { UserDataContext } from '../context/userData';
import ProfileCard from '../components/ProfileCard';
import EditModal from '../components/Modals/EditModal';
import { render } from 'react-dom';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = () => {

  const { user } = useContext(UserDataContext);
 
  const [isModalVisible, setModalVisible] = useState(false);

  
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
const navigation = useNavigation();

  return (
    <View>
      <ProfileCard user={user}/>
      
      <EditModal user={user} isVisible={isModalVisible} closeModal={closeModal} />
      <TouchableOpacity
        style={styles.editButton}
        onPress={openModal}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.editButton}
        onPress={()=>{
          
          navigation.navigate('Login');
          AsyncStorage.removeItem('userToken');
        }}
      >
        <Text style={styles.editButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
 
  editButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  editButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Profile;
