import { View, Text,Modal,TextInput ,StyleSheet,TouchableOpacity} from 'react-native'
import React,{useState,useEffect, useContext} from 'react'
import useUserToken from '../../CustomHooks/UserProfile/UserToken';
import { updateUserData } from '../../CustomHooks/UserProfile/ProfileDB';
import { UserDataContext } from '../../context/userData';


const EditModal = ({ isVisible, closeModal ,user }) => {
// if i use the setUser as context than i dont have to refresh the compponent to see the changes thats the amazing part of useContext
    const {setUser}=useContext(UserDataContext);
    
    const [username, setUsername] = useState(user?.username || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [email, setEmail] = useState(user?.email || '');
    const userToken = useUserToken();
    
    useEffect(() => {
        if (user) {
          setUsername(user?.username || '');
          setBio(user?.bio || '');
          setFirstName(user?.firstName || '');
          setLastName(user?.lastName || '');
          setEmail(user?.email || '');
        }
      }, [user]);
   
const handleUpdate=( username , bio , firstName , lastName ,email)=>{
  try {
      updateUserData(userToken,username,firstName,lastName,bio,email )
     setUser({ ...user, username, bio, firstName, lastName,email })
      closeModal()
  } catch (error) {
    console.log(error);
  }
}

    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Edit Profile</Text>
              <Text>Username</Text><TextInput  onChangeText={(text) => setUsername(text)} style={{borderWidth:1,borderColor:'black',width:200}} value={username}/>
              <Text>Bio</Text><TextInput onChangeText={(text)=>setBio(text)} style={{borderWidth:1,borderColor:'black',width:200}} value={bio}/>
              <Text>First Name</Text><TextInput onChangeText={(text)=>setFirstName(text)}  style={{borderWidth:1,borderColor:'black',width:200}} value={firstName}/>
              <Text>Last Name</Text><TextInput onChangeText={(text)=>setLastName(text)} style={{borderWidth:1,borderColor:'black',width:200}} value={lastName}/>
            
           
             <View style={{flexDirection:'row',justifyContent:'space-between' ,alignItems:'center'}}>
  
            
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity >
                <Text style={styles.saveButton} onPress={()=>{handleUpdate(username,bio,firstName,lastName,email)}}>Save</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      );
}
const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      alignItems: 'center',
   
    },
    modalText: {
      fontSize: 18,
      marginBottom: 20,
    },
    closeButton: {
      color: 'blue',
      fontSize: 16,
    },
    saveButton: {
      color: 'white',
      fontSize: 16,
      backgroundColor: 'green',
      padding:10
    },
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
export default EditModal

