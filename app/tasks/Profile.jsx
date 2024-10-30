import React, { useContext, useState } from 'react';
import { ScrollView, Button, View, Image, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { userInfo } from './_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  const router = useRouter();
  const userData = useContext(userInfo);

  const logout = async () => {
    try {
      await AsyncStorage.setItem('loginInfo', JSON.stringify({ isLogin: false }));
      console.log('Logged Out');
      router.replace('/auth');
    } catch (error) {
      console.log(error);
    }
  }
  
  const routinghandler =(routepath)=>{
    try{
      // console.log(routepath)
      router.push({
        pathname:`contact/MultiScreen`,
        params:{displayScreen:routepath,username:userData?.username}
      })
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.greetingText}>Hello..! {userData?.name}</Text>
        <Image source={{ uri: userData?.dpUrl }} style={styles.profileImage} />
        <Text style={styles.infoText}>Username: {userData?.username}</Text>
        {userData?.githubid && <Text style={styles.infoText}>GitHub Id: {userData?.githubid}</Text>}
        {userData?.email && <Text style={styles.infoText}>Email: {userData?.email}</Text>}
        {/* <Button title='Logout' onPress={logout} /> */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Logout </Text>
          <Ionicons name='log-out-outline' size={28} color={'#ff0000'}/>
        </TouchableOpacity>
      </View>

      


      <View style={styles.settingsContainer}>

        <Text style={styles.settingsText}>Settings  </Text>

        <TouchableOpacity style={styles.SettingsItems} onPress={()=>routinghandler('changePassword')}>
          <Text style={styles.settingsItemText}>Change Password</Text>
          <Ionicons name='arrow-forward-circle-outline' size={28} color={'black'}/>
        </TouchableOpacity>

        {userData?.githubid && <TouchableOpacity style={styles.SettingsItems} onPress={()=>routinghandler('changeDP')}>
          <Text style={styles.settingsItemText}>Change DP</Text>
          <Ionicons name='arrow-forward-circle-outline' size={28} color={'black'}/>
        </TouchableOpacity>}

      <TouchableOpacity style={styles.SettingsItems} onPress={()=>routinghandler('changeNotify')}>
        <Text style={styles.settingsItemText}>Notification Preferences</Text>
        <Ionicons name='arrow-forward-circle-outline' size={28} color={'black'}/>
      </TouchableOpacity>

        <TouchableOpacity style={styles.SettingsItems} onPress={()=> router.push('contact/Contact')}>
          <Text style={styles.settingsItemText}>Contact or Support</Text>
          <Ionicons name='arrow-forward-circle-outline' size={28} color={'black'}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.SettingsItems} onPress={()=>routinghandler('Guide')}>
          <Text style={styles.settingsItemText}>How to Use Task Tracker</Text>
          <Ionicons name='arrow-forward-circle-outline' size={28} color={'black'}/>
        </TouchableOpacity>

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
    textAlign:'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderBlockColor:'#dd080889',
    borderWidth:5,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: '#126264f1',
    marginBottom: 10,
  },
  logoutBtn:{
    minWidth:'50%',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    padding:10,
    backgroundColor:'#333131c5',
    margin:2,
    borderRadius:100
  },
  logoutText:{
    color:'red',
    fontSize:18,
    fontVariant:'small-caps',
    fontWeight:'700',
  },


  settingsContainer:{
    minWidth:'90%',
    paddingVertical:20
  },
  settingsText:{
    fontSize:26,
    margin:20,
    marginLeft:10,
    fontWeight:'700'
  },
  SettingsItems:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingRight:50,
    paddingLeft:10,
    paddingVertical:10,
    borderBottomColor:'#00000061',
    borderWidth:0.3,
    backgroundColor:'#c1baba8e',
    margin:2,
    borderRadius:5
  },
  settingsItemText:{
    fontSize:16,
  }

});

export default Profile;
