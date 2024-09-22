import { ScrollView, Button, View, Image, Text, Switch, StyleSheet, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import { useRouter } from 'expo-router';
import { userInfo } from './_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ApiEndPoints from '../../components/ApiEndPoints.json'

const Profile = () => {
  const router = useRouter();
  const userData = useContext(userInfo);

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showChangeDP, setShowChangeDP] = useState(false);
  const [showTaskTrackerGuide, setShowTaskTrackerGuide] = useState(false);

  // Password change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const logout = async () => {
    try {
      await AsyncStorage.setItem('loginInfo', JSON.stringify({ isLogin: false }));
      console.log('Logged Out');
      router.replace('/auth');
    } catch (error) {
      console.log(error);
    }
  }

  const handlePasswordChange = async() => {
    if (newPassword === confirmNewPassword) {
      try {
        const res = await axios.post(`${ApiEndPoints._base}/${ApiEndPoints.change_password}`,
          {
            'username':userData.username,
            oldPassword,
            newPassword
          }
        )
        if(res.status===200){
          alert(res.data.message)
          console.log('Password changed successfully');
        }
      } catch (error) {
        console.log(error)
      }
      finally{
        setOldPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
      }
    } else {
      console.log('New passwords do not match');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.greetingText}>Hello..! {userData?.name}</Text>
        <Image source={{ uri: userData?.dpUrl }} style={styles.profileImage} />
        <Text style={styles.infoText}>Username: {userData?.username}</Text>
        {userData?.githubid && <Text style={styles.infoText}>GitHub Id: {userData?.githubid}</Text>}
        <Button title='Logout' onPress={logout} />
      </View>

      <View style={styles.switchContainer}>
        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Change Password</Text>
          <Switch value={showPasswordChange} onValueChange={() => setShowPasswordChange(!showPasswordChange)} />
        </View>
        {showPasswordChange && (
          <View style={styles.passwordChangeContainer}>
            <TextInput
              style={styles.input}
              placeholder="Old Password"
              secureTextEntry
              value={oldPassword}
              onChangeText={(text) => setOldPassword(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmNewPassword}
              onChangeText={(text) => setConfirmNewPassword(text)}
            />
            <Button title="Change Password" onPress={handlePasswordChange} />
          </View>
        )}

        {userData?.githubid && <View style={styles.switchRow}>
          <Text style={styles.switchText}>Change DP</Text>
          <Switch value={showChangeDP} onValueChange={() => setShowChangeDP(!showChangeDP)} />
        </View>}
        {showChangeDP && (
          <View style={styles.changeDPContainer}>
            <Text style={styles.dpText}>Please change your GitHub profile picture and relogin. It will reflect here.</Text>
          </View>
        )}

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>How to Use Task Tracker</Text>
          <Switch value={showTaskTrackerGuide} onValueChange={() => setShowTaskTrackerGuide(!showTaskTrackerGuide)} />
        </View>
        {showTaskTrackerGuide && (
          <View style={styles.videoContainer}>
            <Text>Dummy Task Tracker Guide Video</Text>
            <View style={styles.videoPlaceholder}>
              {/* Embed a dummy video */}
              <Text style={styles.videoText}>[Dummy Video Placeholder]</Text>
            </View>
          </View>
        )}
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
  switchContainer: {
    width: '90%',
    marginTop: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchText: {
    fontSize: 18,
    color: '#333',
  },
  passwordChangeContainer: {
    marginTop: 10,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  changeDPContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  dpText: {
    color: '#333',
    textAlign: 'center',
  },
  videoContainer: {
    marginTop: 10,
  },
  videoPlaceholder: {
    height: 200,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  videoText: {
    color: '#333',
    fontSize: 16,
  },
});

export default Profile;
