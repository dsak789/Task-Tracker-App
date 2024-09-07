import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

const NotFound = () => {
  const router = useRouter();

  return (
    <View>
      <Text>Invalid Access, Please Go to Home</Text>
      <Button title="Go to Home" onPress={() => router.push('/auth')} />
    </View>
  );
};

export default NotFound;
