import { View, Text, ScrollView,FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';

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
                <Text>Update Status</Text>
              </View>
            </View>
        )

      }}
      keyExtractor={(item)=>{return item._id}}
      refreshing={props.refreshState}
      onRefresh={props.refresh}
      
      />
      {/* <ScrollView>
        {props.tasks && props.tasks.length > 0 ? (
          props.tasks.map((task) => (
            <View key={task._id} style={styles.taskContainer}>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text>{task.description}</Text>
              </View>
              <View style={styles.taskStatus}>
                <Text>{task.status}</Text>
                <Text>Update Status</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.noTasksContainer}>
            <Text style={styles.noTasksText}>No tasks available</Text>
          </View>
        )}
      </ScrollView> */}
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
    backgroundColor: '#466763',
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
    fontSize: 16,
    color: '#888',
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
