import { View } from 'react-native'
import React, { useState, useEffect,useContext } from 'react'
import {userInfo} from './_layout'
import ShowTasks from '../../components/ShowTasks'
import ApiEndPoints from '../../components/ApiEndPoints.json'
import axios from 'axios'
import Loading from '../../components/Loading'

const CompletedTasks = () => {
  const userData = useContext(userInfo)
  const [completedTasks,setCompletedTasks] = useState([])
  const [fetching,setFetching] =useState(true)
  const [refreshing,setRefreshing] = useState(false)

  const handlerefres = () =>{
    setRefreshing(true)
    loadTasks()
  }
  
  const loadTasks = async ()=>{
    try {
      end=`${ApiEndPoints._base}/${ApiEndPoints.completed_tasks}/${userData?.username}`
      // console.log(end)
      await axios.get(end)
      .then((res)=>{
        setCompletedTasks(res.data.Tasks)
        // console.log("Completed==>",completedTasks)
        setFetching(false)
        setRefreshing(false)
      }).catch((err)=>{
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
  loadTasks()
  },[])
  
  


  return (
    <View>
      {
        fetching ? 
        <Loading text="Completed Tasks"/> : 
        <ShowTasks tasks={completedTasks} refresh = {handlerefres} refreshState={refreshing}/> 
        }
    </View>
  )
}

export default CompletedTasks