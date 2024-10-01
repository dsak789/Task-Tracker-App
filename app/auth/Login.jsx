import { View, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import LoginForm from '../../components/LoginForm';
const Login = () => {  
  return (
    <View style={styles.loginContainer}>
      <ScrollView contentContainerStyle={styles.loginContainer} keyboardDismissMode='on-drag'>
      <LoginForm/>
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