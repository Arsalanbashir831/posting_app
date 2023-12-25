import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, query, where ,updateDoc,doc} from 'firebase/firestore';
import { firestore } from '../../Firebase';

const usePost = () => {
  const [isAdding, setIsAdding] = useState(false);

  const addPost = async (post) => {
    try {
      setIsAdding(true);
      const db = firestore;
      const docRef = await addDoc(collection(db, 'posts'), post);
      console.log('Document written with ID: ', docRef.id);
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding document: ', error);
      setIsAdding(false);
    }
  };

  
  const fetchAllPosts = async () => {
    try {
      const db = firestore;
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const allPosts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return allPosts;
    } catch (error) {
      console.error('Error fetching documents: ', error);
      return [];
    }
  };
  const fetchPostsByUserId = async (userId) => {
    const db = firestore;
    try {
      const q = query(collection(db, 'posts'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
  
      const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      
      console.log(querySnapshot); // Log the fetched documents
  
      return documents;
    } catch (error) {
      console.error('Error fetching documents:', error.message);
      return [];
    }
  };

  const updatePostLikes = async (postId, likes) => {
    const db = firestore;
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, { likes: likes });
      console.log('Document successfully updated');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  
  useEffect(() => {
    fetchAllPosts(); // Fetch posts when the component mounts
    
  }, []); 

  return {
    updatePostLikes,
    addPost,
    isAdding,
    fetchAllPosts,
    fetchPostsByUserId
  };
};

export default usePost;
