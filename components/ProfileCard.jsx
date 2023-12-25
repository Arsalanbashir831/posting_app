import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';



const ProfileCard = ({user}) => {
   
  
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}
            />
            <Text style={styles.name}>{user?.username}</Text>
            <Text style={styles.occupation}>{`${user?.firstName} ${user?.lastName}`}</Text>
            <Text style={styles.email}>{user?.email}</Text>
            <Text style={styles.bio}>{user?.bio}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    occupation: {
        fontSize: 18,
        color: '#555',
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 12,
    },
    bio: {
        fontSize: 16,
        color: '#777',
    },
});

export default ProfileCard;
