import React, { useState } from 'react'
import Auth from './Authentication/_layout'
import Tasks from './tasks/_layout'
import { View, Text, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'

const _layout = () => {
    const [log,setLog] = useState(true)
  return (
    <View style={styles.appContainer}>
        <Stack>
          <Stack.Screen
          name='Authentication'
          options={{
            headerShown:false
          }}/>
          <Stack.Screen
          name='tasks'
          options={{
            headerShown:false
          }}/>
        </Stack>
    </View>
  )
}

export default _layout

const styles = StyleSheet.create({
  appContainer:{
    flexDirection:'column',
    justifyContent:'center',
    minHeight:'100%',
    minWidth:"100%"
  }
})

