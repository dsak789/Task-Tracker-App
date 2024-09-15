import React, { useState } from 'react'
import { Tabs,useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import {colors,sizes } from '../../assets/theme/styles.json'
import { View, Image, StyleSheet } from 'react-native'
const TaskTabs = () => {
  const { dp_url } = useLocalSearchParams();
  console.log("DP",dp_url)
   return (
    
    <Tabs >
        <Tabs.Screen
        name='index'
        options={{
            headerLeft: () => null,
            title:'All Tasks',
            tabBarIcon:({color, size})=>(
              <Ionicons name='list-circle' color={colors.primary} size={sizes.large}/>
            )
          }}
          />
        <Tabs.Screen
        name='CompletedTasks'
        options={{
            title:'Completed Tasks', tabBarIcon:({color, size})=>(
              <Ionicons name='checkmark-done-circle' color={colors.primary} size={sizes.large}/>
            )
          }}
          />
        <Tabs.Screen
        name='AddTask'
        options={{
            title:'Add Task', tabBarIcon:({color, size})=>(
              <Ionicons name='add-circle' color={colors.primary} size={sizes.large}/>
            )
          }}
          />
        <Tabs.Screen
        name='ArchievedTasks'
        options={{
            title:'Archieved Tasks', tabBarIcon:({color, size})=>(
              <Ionicons name='archive' color={colors.primary} size={sizes.large}/>
            )
          }}
          />
        <Tabs.Screen
        name='Profile'
        options={{
            title:'', tabBarIcon:({color, size})=>(
              <View>
                {dp_url ? 
                <Image source={{ uri: dp_url }} style={styles.profileImage}/> :
                <Ionicons name='person' color={colors.primary} size={sizes.large}/>}
              </View>
            )
          }}
          />
        
    </Tabs>  
  )
}

export default TaskTabs

const styles = StyleSheet.create({
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginTop:15,
    alignItems:'center'
  }
})