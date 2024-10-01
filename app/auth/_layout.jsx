import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import {colors,sizes } from '../../assets/theme/styles.json'
const AuthenticationTabs = () => {

    return (
        <Tabs>
          <Tabs.Screen
          name='Login'
          options={{
            title:'Login',
            tabBarIcon:()=>(
              <Ionicons name='log-in' color={colors.primary} size={sizes.large}/>
            )
          }}
            />
          <Tabs.Screen
            name='Register'
            options={{
                title:'Register', tabBarIcon:({color, size})=>(
                  <Ionicons name='person-add' color={colors.primary} size={sizes.large}/>
                )
              }}
              />
        </Tabs>
    )
  }


export default AuthenticationTabs