import { View, Text,TextInput, Button, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import ApiEndPoints from '../components/ApiEndPoints.json'
import { useRouter } from 'expo-router'

const LoginForm = () => {
    const router = useRouter()
    const [username,setUsername]= useState('')
    const [password,setPassword]= useState('')

    const storage_handle = async(info) =>{
        try {
            await AsyncStorage.setItem('loginInfo',JSON.stringify(info))
        } catch (error) {
            console.log('Error==>',error)
        } 
    }

    const  login_handle = async () => {

        try {
            const res = await axios.post(`${ApiEndPoints._base}/${ApiEndPoints.login}`,
                {
                    'username':username,
                    'password':password
                })
                if(res.data.message == 'Login Successfull'){
                    const user = res.data.user
                    const gitres = await axios.get(`https://api.github.com/users/${user.githubid}`)
                    const dpurl = gitres.data.avatar_url
                    
                    const info = {
                        'isLogin':true,
                        'name':user.name,
                        'githubid':user.githubid,
                        'username':user.username,
                        'dpUrl': dpurl
                    }
                    await storage_handle(info)

                    router.replace('/tasks')
                }
                else if(res.data.message == 'Password Incorrect..!'){
                    alert("error"+res.data.message)
                }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <ScrollView contentContainerStyle={styles.loginContainer}>
        <View>
            <Text>UserName</Text>
            <TextInput style={styles.input}
                placeholder='Enter Username' 
                value={username} 
                onChangeText={e => setUsername(e)}/>
            <Text>Password</Text>
            <TextInput style={styles.input}
                placeholder='Enter Password'
                secureTextEntry={true}
                value={password}
                onChangeText={e => setPassword(e)}
                />
            <Button title='Login' onPress={login_handle}/>
        </View>
    </ScrollView>
  )
}

export default LoginForm

const styles = StyleSheet.create({
    loginContainer: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
    },
    input: {
      borderBottomWidth: 1,
      marginBottom: 20,
      padding: 10,
    },
  });
  