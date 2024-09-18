import React, { useState,createContext, useEffect } from 'react'
import { Tabs,useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import {colors,sizes } from '../../assets/theme/styles.json'
import { View, Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
export const userInfo = createContext()

const TaskTabs = () => {
  const [userData,setUserData] = useState();
  const [dp,setDP] = useState();
  const getInfo = async() =>{
    try {
      let res = await AsyncStorage.getItem('loginInfo');
      res = JSON.parse(res) || { isLogin: false };
      setUserData(res);
      // console.log("tasks/Layout==>",res)
      const dp_url = res.dpUrl || ''
      setDP(dp_url);
    } catch (error) {
      console.log(error);
    }
  }
  const { dp_url } = useLocalSearchParams();
  // console.log("DP==>",dp_url)
  useEffect(()=>{
    getInfo()
  },[])
   return (
    <userInfo.Provider value={userData}>  
    <Tabs >
        <Tabs.Screen
        name='index'
        options={{
            headerLeft: () => null,
            title:'All Tasks',
            tabBarIcon:({color, size})=>(
              <Ionicons name='list-circle' color={colors.primary} size={sizes.medium}/>
            )
          }}
          />
        <Tabs.Screen
        name='CompletedTasks'
        options={{
            title:'Completed Tasks', tabBarIcon:({color, size})=>(
              <Ionicons name='checkmark-done-circle' color={colors.primary} size={sizes.medium}/>
            )
          }}
          />
        <Tabs.Screen
        name='AddTask'
        options={{
            title:'Add Task', tabBarIcon:({color, size})=>(
              <Ionicons name='add-circle' color={colors.primary} size={sizes.medium}/>
            )
          }}
          />
        <Tabs.Screen
        name='ArchievedTasks'
        options={{
            title:'Archieved Tasks', tabBarIcon:({color, size})=>(
              <Ionicons name='archive' color={colors.primary} size={sizes.medium}/>
            )
          }}
          />
        <Tabs.Screen
        name='Profile'
        options={{
            title:'',
            tabBarIcon:({color, size})=>(
              <View>
                {(dp_url && dp_url !='') ?
                <Image source={{ uri: dp_url }} style={styles.profileImage}/> :  
                <Ionicons name='person' color={colors.primary} size={sizes.medium}/>
                }
              </View>
            )
          }}
          />
        
    </Tabs>  
  </userInfo.Provider>
  )
}

export default TaskTabs

const styles = StyleSheet.create({
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginTop:20,
    alignItems:'center'
  }
})