import { View } from 'react-native'
import React, { useState, useEffect,useContext } from 'react'
import {userInfo} from './_layout'
import ShowTasks from '../../components/ShowTasks'
import ApiEndPoints from '../../components/ApiEndPoints.json'
import Loading from '../../components/Loading'
import axios from 'axios'


const Home = () => {
const userData = useContext(userInfo)
const [tasks,setTasks] = useState([])
const [fetching,setFetching] =useState(true)
const [refreshing,setRefreshing] = useState(false)

const handlerefres = async() =>{
  setRefreshing(true)
  loadTasks()
}


const loadTasks = async ()=>{
  try {
    const end=`${ApiEndPoints._base}/${ApiEndPoints.tasks}/${userData?.username}`
    const res = await axios.get(end)
    setTasks(res.data.Tasks)
    setFetching(false)
    setRefreshing(false)
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
loadTasks()
}, [userData])

  return (
    <View>
      {fetching?
        <Loading text="Pending Tasks "/>
      :
        <ShowTasks tasks={tasks} refresh = {handlerefres} refreshState={refreshing} reload={loadTasks}/>
      }
    </View>
  )
}

export default Home