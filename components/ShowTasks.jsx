import { View, Text, ScrollView,FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Dropdown from './Dropdown';

const ShowTasks = (props) => {
  const [refreshing,setRefreshing] = useState(false)
  return (
    <View style={styles.ShowTasksContainer}>
      <FlatList 
      data={props.tasks}
      renderItem={({item})=>{
        return(
          <View key={item._id} style={styles.taskContainer}>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>
              <View style={styles.taskStatus}>
                <Text>{item.status}</Text>
                {item.status != 'Completed'?<Dropdown task={item}/>:<></>}                
              </View>
            </View>
        )

      }}
      keyExtractor={(item)=>{return item._id}}
      ListEmptyComponent={() => (
        <View style={styles.noTasksContainer}>
          <Text style={styles.noTasksText}>No Tasks to display</Text>
        </View>
      )}
      refreshing={props.refreshState}
      onRefresh={props.refresh}
      
      />
    </View>
  );
};

export default ShowTasks;

const styles = StyleSheet.create({
  ShowTasksContainer: {
    minHeight: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 12,
    margin: 0,
    padding: 5,
    paddingBottom: 20,
  },
  taskContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    minWidth: '95%',
    minHeight: 200,
    height: '50%',
    backgroundColor: '#4667633d',
    margin: 5,
    borderRadius: 5,
  },
  taskInfo: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    gap: 10,
    padding: 20,
  },
  taskStatus: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noTasksText: {
    fontSize: 20,
    color: '#6f6b6b',
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
 
  
});
