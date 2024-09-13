import { View, Button, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Color from '../../components/Color';
import { useRouter } from 'expo-router';
import LoginForm from '../../components/LoginForm';
import PushNotification from '../../components/PushNotification';

const Login = () => {
  const router = useRouter();
  
  return (
    <View style={styles.loginContainer}>
      <ScrollView contentContainerStyle={styles.loginContainer}>
      {/* <Color color='#568233' /> */}
      <LoginForm/>
      {/* <PushNotification /> */}
      </ScrollView>
    </View>
  );
};

export default Login;


const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
  },
})