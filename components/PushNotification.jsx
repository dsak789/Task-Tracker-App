import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Notification from 'expo-notifications'


const PushNotification = () => {


    Notification.setNotificationHandler({
        handleNotification: async()=>({
            shouldShowAlert:true,
            shouldPlaySound:true,
            shouldSetBadge:false,
        })
    })

    useEffect(()=>{
        push
    })

    const push = async () =>{
        const {status} = Notification.requestPermissionsAsync()

        if(status !== 'granted'){
            alert('Failed to Push Notification')
            return
        }

        const token = (await Notification.getExpoPushTokenAsync({
            projectId:"02c56b7d-3b06-41d1-a37f-21d7c6b15ba6"
        })).data

        console.log(token)
    }

    
    const send  = async () =>{
        await Notification.scheduleNotificationAsync({
            content:{
                title:"Test",
                data:"Test YT LINK Notification",
                body:'https://www.youtube.com/results?search_query=stack+navigation+react+native',
                color:'red',
                vibrate:false,
                // badge:,
                autoDismiss:true
            },
            trigger:{
                seconds:1,
                repeats:false,
            },
            
            
        })
        console.log("Notified")
    }


    
  return (
    <SafeAreaView style={styles.container}>
      <Text>PushNotification</Text>
      <Button title='Push Notification' onPress={send}/>
    </SafeAreaView>
  )
}

export default PushNotification

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"red",
        // minHeight:'100%',
        // minWidth:'90%'
    }
})