import { ScrollView, Button, StyleSheet } from 'react-native'
import React from 'react'
import Color from '../../components/Color'
import RegisterForm from '../../components/RegisterForm'
import { useRouter } from 'expo-router'
const Register = () => {
  const router = useRouter()
  return (
    <ScrollView contentContainerStyle={styles.registerContainer}>
      <RegisterForm />
      {/* <Button title="Go to Tasks" onPress={() => router.push('/tasks')} /> */}
      {/* <Color color='#098743'/> */}
    </ScrollView>
  )
}

export default Register


const styles = StyleSheet.create({
  registerContainer:{
    flex:1,
    justifyContent:'center'
  }
})