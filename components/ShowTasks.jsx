import { View, Text,FlatList, StyleSheet } from 'react-native';
import React from 'react';
import Dropdown from './Dropdown';

const ShowTasks = (props) => {
  const taskStatusColors = {
    'Completed':'#28A745',
    'Todo':'#FF5733',
    'Archieve':'#545412e1',
    'In Progress':'orange'
  }

  const dateFormat = (addDate)=>{
    const date = new Date(addDate)
    const formatted = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${(date.getDate()).toString().padStart(2,'0')} ${(date.getHours()).toString().padStart(2,'0')}:${(date.getMinutes()).toString().padStart(2,'0')}` 
    return formatted
  }

  const updatestamp = (taskStatus) => {
    if(taskStatus == "Completed"){
      return 'Completed on'
    }
    if(taskStatus == "Archieve"){
      return 'Archieved on'
    }
    return "Updated on"
  }


  return (
    <View style={styles.ShowTasksContainer}>
      <FlatList 
      data={props.tasks}
      renderItem={({item})=>{
        return(
          <View key={item._id} style={styles.taskContainer}>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskDescription}>{item.description}</Text>
              </View>
              <View style={styles.dateInfo}>
                <View>
                  <Text style={styles.addDate}>Added On</Text>
                  <Text style={styles.addDate}>{dateFormat(item?.adddate) || item?.adddate}</Text>
                </View>
                <View>{item?.updatedon &&
                  <>
                    <Text style={styles.updatedon}>{updatestamp(item?.status)}</Text>
                    <Text style={styles.updatedon}>{dateFormat(item?.updatedon)}</Text>
                  </>}
                </View>
              </View>
              <View style={styles.taskStatusBox}>
                <Text style={[styles.taskStatus,{color:taskStatusColors[item.status]}]}>{item.status}</Text>
                {item.status != 'Completed'? <Dropdown task={item}  refresh={props.reload}  />:<></>}                
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
  taskStatusBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
    margin:15,
    borderRadius:12,
    // gap: 5,
  },
  taskStatus:{
    fontSize:20,
    fontWeight:'bold',
    color:'#545412e1'
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
    fontSize: 16,
  },
  taskDescription: {
    marginTop:10,
    fontSize: 14,
  },
  dateInfo:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:15,
    marginHorizontal:15
  },
  addDate:{
    textAlign:'center',
    color:'#00806f',
    fontSize:10
  },
  updatedon:{
    textAlign:'center',
    color:'#00806f',
    fontSize:10
  },
 
  
});
