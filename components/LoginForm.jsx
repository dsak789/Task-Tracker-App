import { KeyboardAvoidingView,View, Text,TextInput, Button,Image, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import ApiEndPoints from '../components/ApiEndPoints.json'
import { useRouter } from 'expo-router'
import Loading from '../components/Loading'
const image = require('../assets/images/TaskTracker1024.png')
const LoginForm = () => {
    const router = useRouter()
    const [username,setUsername]= useState("")
    const [password,setPassword]= useState("")
    const [error,setError] = useState({})
    const [loading,setloading] = useState(false)


    const validateInput =() =>{
        let errors = {}
        if(!username) errors.username = "Username Required"
        if(!password) errors.password = "Password Required"
        setError(errors)
        return Object.keys(errors).length === 0

    }

    const storage_handle = async(info) =>{
        try {
            await AsyncStorage.setItem('loginInfo',JSON.stringify(info))
        } catch (error) {
            console.log('Error==>',error)
        } 
    }

    const  login_handle = async () => {

        validateInput()
        try {
            setloading(true)
            const res = await axios.post(`${ApiEndPoints._base}/${ApiEndPoints.login}`,
                {
                    'username':username,
                    'password':password
                })
                if(res.data.message == 'Login Successfull'){
                    const user = res.data.user
                    
                    if (user.githubid != ''){
                        const gitres = await axios.get(`https://api.github.com/users/${user.githubid}`)
                        var dpurl = gitres.data.avatar_url
                    }
                    else{
                        var dpurl = "https://static.vecteezy.com/system/resources/previews/000/649/115/original/user-icon-symbol-sign-vector.jpg"
                    }                    
                    
                    const info = {
                        'isLogin':true,
                        'name':user.name,
                        'githubid':user.githubid,
                        'username':user.username,
                        'dpUrl': dpurl
                    }
                    // console.log(info)
                    // console.log(user)
                    await storage_handle(info)

                    router.replace('/tasks')
                }
                else if(res.data.message == 'Password Incorrect..!'){
                    console.log(res.data.message)
                }
                else if(res.data.message == "User Not doesn't Exist"){
                    console.log(res.data.message)
                }
        } catch (error) {
            setloading(false)
            console.log(error)
            error = {'login': 'Invalid Credentials'}
            // setError(error)
        }
    }
  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={150} style={styles.container}>
        {!loading ? 
        <View style={styles.loginFormContainer}>
            <Image source={image} style={styles.image} />
            {error.login !="" && <Text style={styles.error}>{error.login}</Text>}
            <Text style={styles.label}>UserName</Text>
            <TextInput style={styles.input}
                placeholder='Enter Username' 
                value={username} 
                onChangeText={e => setUsername(e)}/>
                {error.username !="" && <Text style={styles.error}>{error.username}</Text>}
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input}
                placeholder='Enter Password'
                secureTextEntry={true}
                value={password}
                onChangeText={e => setPassword(e)}
                />
                {error.password !="" && <Text style={styles.error}>{error.password}</Text>}
            <Button title='Login' onPress={login_handle}/> 

        </View> :<Loading text="Login Process"/>}
    </KeyboardAvoidingView>
  )
}

export default LoginForm

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:20,
        backgroundColor:'#c2bbbbc1'

    },
    loginFormContainer: {
    backgroundColor:'#ffffff',
    padding:20,
    borderRadius:20,
    shadowColor:'#000000',
    shadowOffset:{
        width:0,
        height:2,
    },
    shadowOpacity:0.25,
    shadowRadius:1,
    elevation:7
    },
    input: {
        height:40,
        borderColor:'#6d6b6b',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        marginBottom: 5,
        padding: 10,
        borderRadius:5,
        fontSize:13
    },
    label:{
        fontSize:16,
        marginBottom:5,
        fontWeight:'bold',
    },
    error:{
        color:'red',
        margin:10,
        borderColor:'red'
    },
    image:{
        height:150,
        width:150,
        alignSelf:'center',
        // marginBottom:50
    }
  });
  