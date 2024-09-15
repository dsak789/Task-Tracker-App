import React, { useState, useEffect } from 'react';
import { View, Alert, Image, StyleSheet, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import logo from '../assets/images/TaskTracker1024.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const _layout = () => {
  const router = useRouter();
  const [isLoggedin, setIsloggedin] = useState(false);
  const [dp, setDp] = useState('');
  
  const loginCheck = async () => {
    try {
      let res = await AsyncStorage.getItem('loginInfo');
      res = JSON.parse(res) || { isLogin: false };
      setIsloggedin(res.isLogin);
      console.log("Asynch==>",res)
      const dp_url = res.dpUrl || ''
      setDp(dp_url);
      if (res.isLogin) {
        router.replace('/tasks');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    Alert.alert(
      
      'Logout!','Sure want to logout...?',
      [
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await AsyncStorage.setItem('loginInfo', JSON.stringify({ isLogin: false }));
              console.log('Logged Out');
              // setDp('');
              setIsloggedin(false)
              router.replace('/auth');
            } catch (error) {
              console.log(error);
            }
          },
          style: 'destructive', // Red button for logout
        },
        {
          text: 'Stay',
          style: 'cancel', // Dismiss the alert
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    loginCheck();
  }, [dp,setDp]);

  return (
    <View style={styles.appContainer}>
      <Stack>
        <Stack.Screen
          name="auth"
          options={{
            title: 'Authentication',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="tasks"
          options={{
            title: '',
            headerLeft: () => (
              <View style={styles.headerLeft}>
                <Image
                  source={logo}
                  style={styles.profileImage}
                  onPress={() => console.log('TaskTracker')}
                />
              </View>
            ),
            headerRight: () => (
              <View style={styles.headerLeft}>
                <Pressable onPress={handleLogout} style={styles.logoutbtn}>
                  <Ionicons name="log-out" size={35} color="#2776d7" />
                  <Image source={{ uri: dp }} style={styles.profileImage} />
                </Pressable>
              </View>
            ),
            
          }}
          initialParams={{ dp_url: dp }}
        />
      </Stack>
    </View>
  );
};

export default _layout;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100%',
    minWidth: '100%',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  logoutbtn: {
    flexDirection: 'row-reverse',
    alignItems:'center'
  },
});
