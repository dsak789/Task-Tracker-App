import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen
        name='index'
        options={{
            title:'All Tasks',
            tabBarIcon:({color, size})=>(
              <Ionicons name='list-circle' color={color} size={size}/>
            )
          }}
          />
        <Tabs.Screen
        name='CompletedTasks'
        options={{
            title:'Completed Tasks', tabBarIcon:({color, size})=>(
              <Ionicons name='checkmark-done-circle' color={color} size={size}/>
            )
          }}
          />
        <Tabs.Screen
        name='AddTask'
        options={{
            title:'Add Task', tabBarIcon:({color, size})=>(
              <Ionicons name='add-circle' color={color} size={size}/>
            )
          }}
          />
        <Tabs.Screen
        name='ArchievedTasks'
        options={{
            title:'Archieved Tasks', tabBarIcon:({color, size})=>(
              <Ionicons name='archive' color={color} size={size}/>
            )
          }}
          />
    </Tabs>
  )
}

export default _layout