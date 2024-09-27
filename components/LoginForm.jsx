import { View, Text,TextInput, Button,Image,TouchableOpacity,ToastAndroid, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import ApiEndPoints from '../components/ApiEndPoints.json'
import { useRouter } from 'expo-router'
import Toast from './Toast';
import Loading from './Loading'
import ForgotPassword from './ForgotPassword'
const image = require('../assets/images/TaskTracker1024.png')
const LoginForm = () => {
    const router = useRouter()
    const [username,setUsername]= useState("")
    const [password,setPassword]= useState("")
    const [error,setError] = useState({})
    const [showInput, setShowInput] = useState(false); 
    const [loading,setloading] = useState(false)

    const storage_handle = async(info) =>{
        try {
            await AsyncStorage.setItem('loginInfo',JSON.stringify(info))
        } catch (error) {
            console.log('Error==>',error)
        } 
    }

    const  login_handle = async () => {
        
        if(!username || !password){
            let errors = {}
            if(!username) errors.username = "Username Required"
            if(!password) errors.password = "Password Required"
            setError(errors)
            return false
        }

        try {
            setloading(true)
            const res = await axios.post(`${ApiEndPoints._base}/${ApiEndPoints.login}`,
                {
                    'username':username,
                    'password':password
                })
                if(res.data.message == 'Login Successfull'){
                    const user = res.data.user                    
                    const info = {
                        'isLogin':true,
                        'name':user.name,
                        'githubid':user.githubid,
                        'username':user.username,
                        'dpUrl': user.dp_url
                    }
                    await storage_handle(info)
                    Toast().toast(res.data.message)
                    router.replace('/tasks')
                }
                else if(res.data.message == 'Password Incorrect..!'){
                    setloading(false)
                    console.log(res.data.message)
                    setError({'login':res.data.message})
                }
                else if(res.data.message == "User Not doesn't Exist"){
                    setloading(false)
                    console.log(res.data.message)
                    setError({'login':res.data.message})
                }
        } catch (error) {
            if(error.response.data.status==404){
                error = {'login': 'Your Github '+error.response.data.message+'! Please Register again with valid Details '}
                setError(error)
                setloading(false)
            }else{
                error = {'login': error.response.data.message}
                setError(error)
                setloading(false)
            }
        }
    }
  return (
    <ScrollView contentContainerStyle={styles.container}>
        {!loading ? 
        <View style={styles.loginFormContainer}>
            <Image source={image} style={styles.image} />
            {!showInput && <>
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
            </>}
            {!showInput && (<>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={
                        ()=>router.push('/auth/Register')
                    }>
                <Text style={styles.buttonText}>Don't have Account..?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>setShowInput(true)}>
                <Text style={styles.buttonText}>Forgot Password..?</Text>
                </TouchableOpacity>
                </>
            )}
            {showInput && 
            <>
                <ForgotPassword show={setShowInput}/>
                <TouchableOpacity style={styles.button} onPress={()=>setShowInput(false)}>
                <Text style={styles.buttonText}>Go to Login</Text>
                </TouchableOpacity>
            </>
            }
        </View> : <Loading text="Login Process"/>}
    </ScrollView>
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
        borderColor:'red',
        textAlign:'center'
    },
    image:{
        height:150,
        width:150,
        alignSelf:'center',
        // marginBottom:50
    },
    button: {
        // backgroundColor: '#1161b1',
        paddingVertical: 10,
        // paddingHorizontal: 20,
        // borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginVertical:2
      },
      buttonText: {
        color: '#ae0d0d',
        fontSize: 16,
        fontWeight: 'bold',
      },
  });
  