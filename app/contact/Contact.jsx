import { StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import appLogo from '../../assets/images/TaskTracker1024.png';

const adminProfilePhoto = 'https://dannanasaiajithkumar.vercel.app/static/media/SBProfile.c9e5f2075d7dea913aee.jpg';

const Contact = () => {

  const sendMail = () => {
    Linking.openURL('mailto:dsak.official@gmail.com'); // Fixed email URL
  };

  const callAdmin = () => {
    Linking.openURL('tel:+917893412318');
  };

  const messageAdmin = () => {
    Linking.openURL('https://wa.me/917893412318');  
  };

  const openURL = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: adminProfilePhoto }} style={styles.adminImage} />
        <Image source={appLogo} style={styles.appLogo} />
      </View>

      <Text style={styles.title}>DSAK 789</Text>
      <Text style={styles.title2}>Dannana Sai Ajith Kumar</Text>
      <Text style={styles.contactTitle}>Contact Admin</Text>


      <View style={styles.contactContainer1}>

      <TouchableOpacity style={styles.contactItem} onPress={callAdmin}>
        <Ionicons name="call" size={29} color="#007aff" />
        <Text style={styles.contactText}> Call</Text>
      </TouchableOpacity>
      

      <TouchableOpacity style={styles.contactItem} onPress={messageAdmin}>
        <Ionicons name="logo-whatsapp" size={29} color="#007aff" />
        <Text style={styles.contactText}> WhatsApp</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.contactItem} onPress={sendMail}>
        <Ionicons name="mail" size={29} color="#007aff" />
        <Text style={styles.contactText}> Email</Text>
      </TouchableOpacity>

      </View>

      <View style={styles.contactContainer2}>
        
      <TouchableOpacity style={styles.contactItem} onPress={() => openURL('https://github.com/dsak789')}>
        <Ionicons name="logo-github" size={29} color="#555" />
        <Text style={styles.socialText}> GitHub</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.contactItem} onPress={() => openURL('https://linkedin.com/in/saiajithkumardannana')}>
        <Ionicons name="logo-linkedin" size={29} color="#555" />
        <Text style={styles.socialText}> LinkedIn</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.contactItem} onPress={() => openURL('https://www.facebook.com/dsak789/')}>
        <Ionicons name="logo-facebook" size={29} color="#555" />
        <Text style={styles.socialText}> Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.contactItem} onPress={() => openURL('https://www.instagram.com/s.a.i_a.j.i.t.h_k.u.m.a.r_7_/')}>
        <Ionicons name="logo-instagram" size={29} color="#555" />
        <Text style={styles.socialText}> Instagram</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.contactItem} onPress={() => openURL('https://x.com/dsak_789')}>
        <Ionicons name="logo-twitter" size={29} color="#555" />
        <Text style={styles.socialText}> Twitter</Text>
      </TouchableOpacity>
      </View>

      <Text style={styles.copyright}>© 2024 DSAK789 Developers</Text>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginVertical: 20,
    backgroundColor:'red'
  },
  adminImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    left: '-2%',
  },
  appLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    right: '-5%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:40,
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical:20,
  },
  contactItem: {
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  contactText: {
    fontSize: 16,
    color: '#007aff',
  },
  socialText: {
    // display:'none',
    fontSize: 10,
    color: '#555',
  },
  copyright: {
    fontSize: 14,
    color: '#999',
    marginTop: 30,
  },

  contactContainer1:{
    minWidth:'100%',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center'
  },
  contactContainer2:{
    paddingVertical:25,
    minWidth:'90%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  }
});
