import { View, Button } from 'react-native'
import React from 'react'
import Color from '../../components/Color'
import { useRouter } from 'expo-router';
const Profile = () => {
  const router = useRouter();
  return (
    <View>
      <Color color="#543466"/>      
      <Button title="Go to Tasks" onPress={() => router.push('/tasks')} />
    </View>
  )
}

export default Profile