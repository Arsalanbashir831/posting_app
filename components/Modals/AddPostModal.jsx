import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet } from 'react-native';
import usePost from '../../CustomHooks/Posts/Post';


const AddPostModal = ({ visible, onClose , userId,userName }) => {
    const { addPost} = usePost();
  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');

  const handleSave = () => {
    addPost({
        userId:userId,
        username:userName,
        title: postTitle,
        content: postText,
        likes:0
      });
    setPostTitle('');
    setPostText('');
    onClose();

  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Add New Post</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter post title"
          value={postTitle}
          onChangeText={setPostTitle}
        />

        <TextInput
          style={styles.ContentInput}
          placeholder="Enter post text"
          multiline
          numberOfLines={4}
          value={postText}
          onChangeText={setPostText}
        />

        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
  ContentInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default AddPostModal;
