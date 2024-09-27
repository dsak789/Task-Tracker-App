import { View, Text } from 'react-native'
import React, { useState, useEffect,useContext } from 'react'
import {userInfo} from './_layout'
import Color from '../../components/Color'
import ShowTasks from '../../components/ShowTasks'
import ApiEndPoints from '../../components/ApiEndPoints.json'
import axios from 'axios'
import Loading from '../../components/Loading'

const ArchievedTasks = () => {
  const userData = useContext(userInfo)
const [archivedTasks,setArchievedTasks] = useState([])
const [fetching,setFetching] =useState(true)
const [refreshing,setRefreshing] = useState(false)

const handlerefres = () =>{
  setRefreshing(true)
  loadTasks()
}
const loadTasks = async ()=>{
  try {
    end=`${ApiEndPoints._base}/${ApiEndPoints.archieved_tasks}/${userData?.username}`
    // console.log(end)
    await axios.get(end)
    .then((res)=>{
      setArchievedTasks(res.data.Tasks)
      // console.log("Archieved==>",archivedTasks)
      setFetching(false)
      setRefreshing(false)
    }).catch((err)=>{
      console.log(err)
    })
  } catch (error) {
    console.log(err)
  }
}

useEffect(()=>{
loadTasks()
// const interval = setInterval(() => {
//   loadTasks()
// }, 10000) 

// return () => clearInterval(interval) 
}, [])



  return (
    <View>
        {/* <Color color='#eeee9e'/> */}
        {
          fetching ? <Loading text = "Archieved Tasks" /> : 
          <ShowTasks tasks={archivedTasks} refresh = {handlerefres} refreshState={refreshing} reload={loadTasks}/>
        }
    </View>
  )
}

export default ArchievedTasks