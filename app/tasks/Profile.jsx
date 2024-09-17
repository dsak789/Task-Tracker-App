import { ScrollView, Button, View, Image, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import Color from '../../components/Color';
import { useRouter } from 'expo-router';
import { userInfo } from './_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Profile = () => {
  const router = useRouter();
  const userData = useContext(userInfo);
  // console.log('tasks/Profile==>', userData);
  const logout = async () => {
    try {
      await AsyncStorage.setItem('loginInfo', JSON.stringify({ isLogin: false }));
      console.log('Logged Out');
      router.replace('/auth');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.greetingText}>Hello..! {userData?.name}</Text>
        <Image source={{ uri: userData?.dpUrl }} style={styles.profileImage} />
        <Text style={styles.infoText}>Username: {userData?.username}</Text>
        <Text style={styles.infoText}>GitHub Id: {userData?.githubid}</Text>
        <Button title='Logout'onPress={logout}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
  },
  container: {
    width: '90%',
    backgroundColor: '#999595',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.7,
    shadowRadius: 0,
    elevation: 15, 
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: '#126264f1',
    marginBottom: 10,
  },
});

export default Profile;
