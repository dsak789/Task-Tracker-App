import React, { useState, useEffect } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import dp from '../assets/images/TaskTracker48.png'

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
                {/* Profile Picture */}
                <Image
                  source={dp} 
                  style={styles.profileImage}
                />
                {/* Profile Button */}
                {/* <Button title="Profile" onPress={() => router.push('/tasks/Profile')} /> */}
              </View>
            ),
            
            headerRight: () => (
              <Button title="Logout" onPress={() => router.push('/auth') } />
            ),
            headerShadowVisible:true
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
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});
