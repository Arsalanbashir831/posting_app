import React, { useEffect,useState } from 'react';
import usePost from '../CustomHooks/Posts/Post';
import useUserToken from '../CustomHooks/UserProfile/UserToken';
import PostCard from '../components/PostCard';

const MyPost = () => {
  const { fetchPostsByUserId } = usePost();
  const userToken = useUserToken();
const [posts,setPosts]=useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetchPostsByUserId(userToken);
        setPosts([...response]);
        console.log(response);
      } catch (error) {
        console.error('Error fetching user posts: ', error);
      }
    };

    fetchUserPosts();
  }, [userToken,posts]);

  return (
    <div>
      <h2>My Posts</h2>
      {
        posts?.map((data)=>{
          return(<>
            <PostCard
            title={data.title}
            content={data.content}
            author={data.username}
            totallikes={data.likes}

            />
          </>)
        })
      }
    </div>
  );
};

export default MyPost;
