import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button ,ScrollView} from 'react-native'
import React,{useState} from 'react'
import { useGlobalSearchParams, useNavigation } from 'expo-router';
import GuideVideo from '../../components/GuideVideo';
import PushNotification from '../../components/PushNotification';
import ApiEndPoints from '../../components/ApiEndPoints.json'
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
const MultiScreen = () => {
    
    const {displayScreen, username} = useGlobalSearchParams()
    const navigation = useNavigation()
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handlePasswordChange = async() => {
        if (newPassword === confirmNewPassword) {
          try {
            const res = await axios.post(`${ApiEndPoints._base}/${ApiEndPoints.change_password}`,
              {
                'username':username,
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
            alert('New passwords do not match')
          console.log('New passwords do not match');
        }
      };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.displayContainer}>
        {displayScreen =="changePassword"  && (
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

        {displayScreen == "changeDP" && (
          <View style={styles.changeDPContainer}>
            <Text style={styles.dpText}>Your Profile picture directly rendering from GITHUB Avatar.</Text>
              <Text style={styles.dpText}>So Please change your GitHub profile picture and relogin. It will reflect here.</Text>
          </View>
        )}

       
        {displayScreen == "changeNotify" && (<>
          <View style={styles.changeNotification}>
            <Text style={styles.notificationText}>Every Day you will get two Notifications </Text>
            <Text style={styles.notificationSubText}>  - Asking to Add New Task.</Text>
            <Text style={styles.notificationSubText}>  - Asking that Have you Completed any Task.</Text>
            <Text style={styles.notificationSubText}>  * Present this notifications feature is not yet Completely implemented will be improved on user Feedback</Text>
          </View>
            <PushNotification/>
        </>
        )}
        {displayScreen == 'Guide' && (<GuideVideo/>)}
        <TouchableOpacity style={styles.backButton} onPress={()=>navigation.goBack()}>
            {/* <Ionicons name='arrow-back-circle-outline' color={'#e11212b0'} size={29}/> */}
            {/* <Text style={styles.backText}>Go Back</Text> */}
            <Ionicons name='arrow-back-circle-outline' size={40} color={'#e11212b0'}/>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default MultiScreen

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#c7c2c2f4',
      },
    displayContainer: {
        width: '90%',
        marginTop: 20,
      },
      backButton: {
        minWidth:'90%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 30,
      },
      backText: {
        fontSize: 22,
        color: '#e11212b0',
        fontWeight:'bold',
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
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
      },
      dpText: {
        color: '#333',
        padding:5
        // textAlign: 'center',
      },
      changeNotification: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
      },
      notificationText: {
        color: '#333',
        fontSize:16,
      },
      notificationSubText: {
        color: '#333',
        fontSize:14,
      },
      contactText: {
        color: '#333',
        fontSize:14,
        textAlign:'center',
        padding:10
      },
      contactContainer: {
        backgroundColor:'#c1bcbc9e',
        width:'100%',
        padding:5,
        borderRadius:10
      },
    
})