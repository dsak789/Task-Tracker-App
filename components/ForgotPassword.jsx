import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import ApiEndPoints from '../components/ApiEndPoints.json'

const ForgotPassword = (props) => {
  const [username, setUsername] = useState('');

  const resetPassword = async ()=>{
    try {
      const res = await axios.post(`${ApiEndPoints._base}/${ApiEndPoints.forgot_password}`,{
        username
      })
      if(res.status == 200){
        alert(res.data.message)
        props.show(false)
      }
      console.log(username)
    } catch (error) {
      
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
          <TouchableOpacity style={styles.submitButton} onPress={resetPassword}>
            <Text style={styles.submitButtonText}>Reset Password</Text>
          </TouchableOpacity>
        </>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize:16,
    textAlign:'center'
  },
  
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
