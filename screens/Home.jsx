import { View, Text, TouchableOpacity } from "react-native";
import React ,{useContext, useEffect, useState}from "react";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import AddPostModal from "../components/Modals/AddPostModal";
import useUserToken from "../CustomHooks/UserProfile/UserToken";
import { UserDataContext } from "../context/userData";
import usePost from "../CustomHooks/Posts/Post";


const Home = () => {
  const userToken = useUserToken();
  const {user}=useContext(UserDataContext);
  const [isModalVisible, setModalVisible] = useState(false);
    const {fetchAllPosts}=usePost();
    const [posts,setPosts]=useState(null);  

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetchAllPosts();
          setPosts([...response]);
         
        } catch (error) {
          console.error('Error fetching posts: ', error);
        }
      };
  
      fetchData();
    }, [posts]);
 
  return (
    <View>
      <Header />
      <AddPostModal userName ={user?.username} userId={userToken} visible={isModalVisible} onClose={()=>setModalVisible(!isModalVisible)} />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: "black",
          padding: 10,
          borderRadius: 10,
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 20,
          }}
        >
          {" "}
          Add Post
        </Text>
      </TouchableOpacity>
      {
        posts?.map((data)=>{
          
          return(<>
            <PostCard
            title={data.title}
            content={data.content}
            author={data.username}
            totallikes={data.likes}
            postId={data.id}
            />
          </>)
        })
      }
     
    </View>
  );
};

export default Home;
