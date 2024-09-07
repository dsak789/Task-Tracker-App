import { View, Button } from 'react-native';
import React, { useState } from 'react';
import Color from '../../components/Color';
import { useRouter } from 'expo-router';

const Login = () => {
  const router = useRouter();
  // const [loggedIn,setLoggedIn] = useState(true)
  // if (loggedIn) {
  //   router.push('/tasks');
  // } 
  return (
    <View>
      <Color color='#568233' />
      <Button title="Go to Tasks" onPress={() => router.push('/tasks')} />
    </View>
  );
};

export default Login;
