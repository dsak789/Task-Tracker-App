import { Button, StyleSheet, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Notification from 'expo-notifications'
import { useRouter } from 'expo-router'


const PushNotification = () => {
    const router = useRouter()

    Notification.setNotificationHandler({
        handleNotification: async()=>({
            shouldShowAlert:true,
            shouldPlaySound:true,
            shouldSetBadge:false,
        })
    })

    useEffect(()=>{
        push
        const subs = Notification.addNotificationResponseReceivedListener(res =>{
            const route = res.notification.request.content.data.route
            if(route){
                router.push(route)
            }
        })
        return () => subs.remove()
    },[])

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
                title:"Hey..! Achiever",
                body:'Thankyou For Using Task Tracker Application..🫱🏻‍🫲🏻',
                // data: { route: "/tasks/Profile" },
                color:'#ff7300',
                vibrate:true,
                autoDismiss:true
            },
            trigger:null            
        })
        await Notification.scheduleNotificationAsync({
            content:{
                title:"Hey..! Achiever",
                body:'Any New Task to ADD 🎯',                
                data: { route: "/tasks/AddTask" },
                color:'#15ff00',
                vibrate:true,
                autoDismiss:true
            },
            trigger:{
                hour:9,
                minute:0,
                repeats:true
            }           
        })
        await Notification.scheduleNotificationAsync({
            content:{
                title:"Hey..! Achiever",
                body:'Completed Any Task Today ✅',            
                data: { route: "/tasks" },
                color:'#ff7300',
                vibrate:true,
                autoDismiss:true
            },
            trigger:{
                hour:21,
                minute:0,
                repeats:true
            }           
        })

        

        console.log("Notified")
    }


    
  return (
    <SafeAreaView style={styles.container}>
        <Text>This is Demo Notification</Text>
        <Button title='Send Notification' onPress={send}/>
    </SafeAreaView>
  )
}

export default PushNotification

const styles = StyleSheet.create({
    container:{
        justifyContent:'space-around',
        alignItems:'center',
    }
})