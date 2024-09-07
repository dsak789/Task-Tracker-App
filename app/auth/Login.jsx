import { View, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Color from '../../components/Color';
import { useRouter } from 'expo-router';
import LoginForm from '../../components/LoginForm';

const Login = () => {
  const router = useRouter();
  // const [loggedIn,setLoggedIn] = useState(true)
  // if (loggedIn) {
  //   router.replace('/tasks');
  // } 
  return (
    <View>
      <ScrollView>
      {/* <Color color='#568233' /> */}
      <LoginForm/>
      <Button title="Go to Tasks" onPress={() => router.push('/tasks')} />
      </ScrollView>
    </View>
  );
};

export default Login;
