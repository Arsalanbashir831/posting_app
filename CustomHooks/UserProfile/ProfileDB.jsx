import { getDatabase ,ref,set,get,child } from "firebase/database";
import { View, Text } from 'react-native'
import React from 'react'
import { app } from "../../Firebase";

    const db = getDatabase(app);
    function writeUserData(userId, name, email,firstName,lastName,bio) {
        set(ref(db, 'users/' + userId), {
          username: name,
          email: email,
          firstName : firstName,
          lastName : lastName,
          bio:bio
        });
      }
      async function getUserData(userId) {
        const dbRef = ref(db);
        try {
          const snapshot = await get(child(dbRef, `users/${userId}`));
          if (snapshot.exists()) {
            return snapshot.val();
          } else {
            console.log("No data available");
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      }
      async function updateUserData(userId, name,firstName,lastName,bio,email) {
        const dbRef = ref(db);
        try {
          const snapshot = await get(child(dbRef, `users/${userId}`));
          if (snapshot.exists()) {
            set(ref(db, 'users/' + userId), {
              username: name,
              firstName : firstName,
              lastName : lastName,
              bio:bio,
              email:email
            });
            console.log('Data Updated Successfully');
          } else {
            console.log("No data available");
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      }

export  {writeUserData,getUserData,updateUserData}