import { ScrollView, Button, StyleSheet } from 'react-native'
import React from 'react'
import RegisterForm from '../../components/RegisterForm'
const Register = () => {
  return (
    <ScrollView contentContainerStyle={styles.registerContainer}>
      <RegisterForm />
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