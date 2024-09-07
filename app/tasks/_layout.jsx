import React, { useState } from 'react'
import { Tabs, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import {colors,sizes } from '../../assets/theme/styles.json'
const TaskTabs = () => {

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
            title:'Profile', tabBarIcon:({color, size})=>(
              <Ionicons name='person' color={colors.primary} size={sizes.large}/>
            )
          }}
          />
        
    </Tabs>  
  )
}

export default TaskTabs