import React from 'react';
import { View, Text, Button, Linking, StyleSheet } from 'react-native';

const RegisterForm = () => {
  const url = 'https://tasktracker.streamlit.app/';
  const handlePress = () => {
    Linking.openURL(url).catch((err) => console.error("Couldn't open URL", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>This Page is Not Yet Developed</Text>
      <Text style={styles.heading}>Kindly Use Web-version</Text>
      <Button title="Open TaskTracker in Browser" onPress={handlePress} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default RegisterForm;
