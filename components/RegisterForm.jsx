import React, { useState } from 'react';
import { View, TextInput, Alert, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import ApiEndPoints from './ApiEndPoints.json';
import Loading from './Loading'
import { useNavigation } from '@react-navigation/native';
import Toast from './Toast';
const Register = () => {
  const [name, setName] = useState('');
  const [githubId, setGithubId] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading,setloading] = useState(false)
  const navigation = useNavigation();
 

  const handleRegister = async () => {
    setloading(true)
    if (!name  || !email  || !username  || !password  || !confirmPassword ) {
      Alert.alert('Required*', 'Please enter all required fields.');
      setloading(false)
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Check', 'Password mismatch!');
      setloading(false)
      return;
    }

    if (githubId.startsWith('https://github.com/') || githubId.includes('github.com') || githubId.includes('/')) {
      Alert.alert(
        'Invalid GitHub ID',
        'Please remove "https://github.com/", "github.com/", or "/" and just enter your GitHub username.'
      );
      setloading(false)
      return false
    }

    const registerEndpoint = `${ApiEndPoints._base}/${ApiEndPoints.register}`;

    const registrationData = {
      name: name,
      email: email,
      githubid: githubId,
      username: username,
      password: password,
    };

    try {
      const res = await axios.post(registerEndpoint, registrationData);
      if (res.status == 200 && res.data.message == "User Name already Exists Use Another Username") {
        Alert.alert('Success', res.data.message);
        setloading(false)
        // navigation.goBack();
      } 
      if (res.status == 200 && res.data.message == "User Registration Successfull..") {
        Alert.alert('Success', res.data.message);
        Toast().toast(res.data.message)
        setloading(false)
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
      setloading(false)
      Alert.alert('Error', 'An error occurred during registration.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.regcontainer}>
      {!loading ?
      <View  style={styles.container}>
      <Text style={styles.header}>REGISTER</Text>
      <TextInput
        style={styles.input}
        placeholder="*Enter Your Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Valid GitHub Username"
        value={githubId}
        onChangeText={(text) => {
          setGithubId(text);
        }}
      />
      <Text style={styles.caption}>
        *Github Id is case sensitive and you cannot change in future.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="*Enter Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="*Enter Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Text style={styles.caption}>
        *Username is case sensitive and you cannot change in future.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="*Type Password"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="*Confirm Password"
        value={confirmPassword}
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Text style={styles.caption}>
        Password length should be at least 7 characters, containing a combination of alphanumeric and special characters.
      </Text>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      </View> 
      : <Loading text="Register Process"/>
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  regcontainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
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
  },
  caption: {
    fontSize: 12,
    color: '#fb0606',
    marginBottom: 15,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Register;
