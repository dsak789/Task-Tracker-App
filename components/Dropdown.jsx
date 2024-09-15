import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Dropdown = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={[
          { label: 'Todo', value: ()=>console.log("Todo") },
          { label: 'In Progress', value: ()=>console.log("In Progress") },
          { label: 'Completed', value: ()=>console.log("Completed") },
          { label: 'Archived', value: ()=>console.log("Archieved") },
          { label: 'Delete', value: ()=>console.log("Delete") },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: 'Update Status', value: null }}
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
    fontSize: 16,
    width:250,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default Dropdown;
