import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import ApiEndPoints from './ApiEndPoints.json' 
import axios from 'axios';
const Dropdown = (props) => {
  const [selectedValue, setSelectedValue] = useState(props.task.status);

  const updateTask = (taskId, updateStatus) => {
    if (updateStatus !== undefined && updateStatus !== null) {
      axios
        .get(`${ApiEndPoints._base}/task/updatetask/${taskId}/${updateStatus}`)
        .then((res) => {
          // alert("Please Pull to refresh")
          // console.log(res.data.message);
          props.refresh()
          setSelectedValue(updateStatus); 
        })
        .catch((err) => console.log(err));
    }
    else{
      // alert('Nothing..')
    }
  };
  



  const statusUpdaterFuncs= {
    'Todo':[
          { label: 'In Progress', value: 'In Progress' },
          { label: 'Completed', value: "Completed" },
          { label: 'Archieve', value: "Archieve" },
          { label: 'Delete', value: "Delete" },
        ],
    'In Progress':[
          { label: 'Todo', value: "Todo" },
          { label: 'Completed', value: "Completed" },
          { label: 'Archieve', value: "Archieve" },
          { label: 'Delete', value: "Delete"},
        ],
    'Completed':[
          { label: 'Todo', value: "Todo"},
          { label: 'In Progress', value: "In Progress" },
          { label: 'Archieve', value: "Archieve" },
          { label: 'Delete', value: "Delete" },
        ],
    'Archieve':[
          { label: 'Todo', value: "Todo" },
          { label: 'In Progress', value: "In Progress" },
          { label: 'Completed', value: "Completed" },
          { label: 'Delete', value: "Delete" },
        ],
  }


  const handleValueChange = (value)=>{
    updateTask(props.task.id,value)
    // console.log("Con",value,props.task.id)
  }


  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={handleValueChange}
        items={statusUpdaterFuncs[props.task.status]}
        style={pickerSelectStyles}
        placeholder={{ label: 'Update Status'}}
        value={selectedValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // padding: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    width:150,
    backgroundColor:"#00000063",
    margin:10,
  },
});

export default Dropdown;
