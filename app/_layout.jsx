import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import dp from '../assets/images/TaskTracker1024.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
const _layout = () => {
  const router = useRouter();

  return (
    <View style={styles.appContainer}>
      <Stack>
        <Stack.Screen
          name="auth"
          options={{
            title:"Authentication",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="tasks"
          options={{
            title:'',
            headerLeft: () => (     
              <View style={styles.headerLeft}>
                <Image
                  source={dp} 
                  style={styles.profileImage}
                  onPress={()=> console.log("TaskTracker")}
                />
                {/* <Button title="Profile" onPress={() => router.push('/tasks/Profile')} /> */}
              </View>
            ),
            
            headerRight: () => (
                <View style={styles.headerLeft}>
                    <Button title="Logout" onPress={ async() => {
                      try {

                        await AsyncStorage.setItem('loginInfo',JSON.stringify({'isLogin':false}))
                        router.replace('/auth')
                      } catch (error) {
                       console.log(error) 
                      }
                    } } />
                </View>
            ),
          }}
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
    margin:15
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});
