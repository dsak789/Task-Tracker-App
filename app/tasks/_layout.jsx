import React, { useState,createContext, useEffect } from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import {colors,sizes } from '../../assets/theme/styles.json'
import { View, Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
export const userInfo = createContext()

const TaskTabs = () => {
  const [userData,setUserData] = useState();
  const getInfo = async() =>{
    try {
      let res = await AsyncStorage.getItem('loginInfo');
      res = JSON.parse(res) || { isLogin: false };
      setUserData(res);
      // console.log("tasks/Layout==>",res)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getInfo()
  },[])
   return (
    <userInfo.Provider value={userData}>  
    <Tabs screenOptions={{
      tabBarStyle:{
        minHeight:70,
      },
      headerTitleStyle:{
        minWidth:'100%',
        textAlign:'center',
        fontSize:20,
      },
      tabBarItemStyle:{
        margin:3,
        padding:5,
        borderRadius:15
      },
      tabBarActiveBackgroundColor:'#818188a6',
      tabBarActiveTintColor:'#0995f3',
      tabBarInactiveTintColor:'#2e2c2c',
      tabBarIconStyle:{
        marginBottom:2
      }
    }}>
        <Tabs.Screen
        name='index'
        options={{
            headerLeft: () => null,
            title:'Tasks',
            headerTitle:'Pending Tasks',
            headerTintColor:'#FF5733',
            tabBarIcon:({color, size})=>(
              <Ionicons name='list-circle' color={colors.primary} size={sizes.large}/>
            ),
          }}
          />
        <Tabs.Screen
        name='CompletedTasks'
        options={{
            title:'Completed', 
            headerTitle:'Completed Tasks',
            tabBarIcon:({color, size})=>(
              <Ionicons name='checkmark-done-circle' color={colors.primary} size={sizes.large}/>
            ),
            headerTintColor:'green'
          }}
          />
        <Tabs.Screen
        name='AddTask'
        options={{
            title:'Add Task', tabBarIcon:({color, size})=>(
              <Ionicons name='add-circle' color={colors.primary} size={sizes.large}/>
            ),
            headerTintColor:'orange'
          }}
          />
        <Tabs.Screen
        name='ArchievedTasks'
        options={{
            title:'Archieved', tabBarIcon:({color, size})=>(
              <Ionicons name='archive' color={colors.primary} size={sizes.large}/>
            ),
            headerTitle:'Archieved Tasks',
            headerTintColor:'#545412e1'
          }}
          />
        <Tabs.Screen
        name='Profile'
        options={{
            title:'Profile',
            headerTitle: (userData && userData?.name) ? userData?.name.split(' ')[0]+"'s Profile" : "Prfoile",
            tabBarIcon:({color, size})=>(
              <View>
               {(userData && userData?.dpUrl !='') ?
                <Image source={{ uri: userData?.dpUrl }} style={styles.profileImage}/> :  
                <Ionicons name='person' color={colors.primary} size={sizes.large}/>
                }
              </View>
            ),
            headerTintColor:'#4e4e4e'
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
    marginTop:2,
    marginBottom:2,
    alignItems:'center'
  }
})