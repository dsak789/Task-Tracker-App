import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ApiEndPoints from '../../components/ApiEndPoints.json';
import axios from 'axios';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import { userInfo } from './_layout';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Todo');
  const userData = useContext(userInfo);
  const navigation = useNavigation();

  const addTask = async () => {
    const addtaskend = `${ApiEndPoints._base}/${ApiEndPoints.add_task}`;
    const adddate = new Date().toISOString();
    const userid = userData.username;
    const id = uuid.v4();

    if (!title || !description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const taskdata = {
      id: id,
      userid: userid,
      title: title,
      description: description,
      status: status,
      adddate: adddate,
    };
    setTitle('')
    setDescription('')
    setStatus('Todo')
    try {
      const res = await axios.post(addtaskend, taskdata);
      if (res.status === 200) {
        Alert.alert('Success', 'New Task Added');
        navigation.goBack(); // Go back to the previous screen
      } else {
        Alert.alert('Error', 'Error adding task');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while adding the task');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Task Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description of Task"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
      />
      <Picker
        selectedValue={status}
        style={styles.picker}
        onValueChange={(itemValue) => setStatus(itemValue)}
      >
        <Picker.Item label="Todo" value="Todo" />
        <Picker.Item label="In Progress" value="In Progress" />
        <Picker.Item label="Completed" value="Completed" />
      </Picker>
      <View style={styles.buttonContainer}>
        <Button title="ADD TASK" onPress={addTask} color="#4CAF50" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  textArea: {
    height: 100,
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default AddTask;
