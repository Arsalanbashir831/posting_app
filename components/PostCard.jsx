import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import a like icon from a popular icon library
import usePost from '../CustomHooks/Posts/Post';
const PostCard = ({ title, content, author,totallikes,postId }) => {
    
    const [likes, setLikes] = useState(totallikes);
    const [isLiked, setIsLiked] = useState(false);
    const {updatePostLikes}=usePost()
    const handleLikePress = async () => {
        setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
        setIsLiked((prevIsLiked) => !prevIsLiked);
        updatePostLikes(postId,likes+1)
        console.log(postId);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{content}</Text>
            <Text style={styles.author}>Posted by {author}</Text>

            {/* Like button and total likes */}
            <View style={styles.likeContainer}>
                <TouchableOpacity onPress={handleLikePress}>
                    <Ionicons
                        name={isLiked ? 'heart' : 'heart-outline'}
                        size={24}
                        color={isLiked ? 'red' : 'black'}
                    />
                </TouchableOpacity>
                <Text style={styles.likeText}>{likes} Likes</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    content: {
        fontSize: 18,
        marginBottom: 8,
        color: '#555',
    },
    author: {
        fontSize: 14,
        color: '#777',
        marginBottom: 8,
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#777',
    },
});

export default PostCard;
