import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import Color from '../components/Color'
import ShowTasks from '../components/ShowTasks'
import ApiEndPoints from '../components/ApiEndPoints.json'
import axios from 'axios'
import Loading from '../components/Loading'
const Home = () => {
const [tasks,setTasks] = useState([])
const [fetching,setFetching] =useState(true)
const loadTasks = async ()=>{
  try {
    end=`${ApiEndPoints._base}/${ApiEndPoints.tasks}/dsak.official`
    console.log(end)
    await axios.get(end)
    .then((res)=>{
      setTasks(res.data.Tasks)
      // console.log("All Tasks==>",tasks)
      setFetching(false)
    }).catch((err)=>{
      console.log(err)
    })
  } catch (error) {
    console.log(err)
  }
}

useEffect(()=>{
loadTasks()
const interval = setInterval(() => {
  loadTasks()
}, 10000) // Poll every 10 seconds

return () => clearInterval(interval) // Cleanup interval on component unmount
}, [])

  return (
    <View>
      {/* <Color color='#885696'/> */}
      {fetching?
        <Loading text="Tasks"/>
      :
        <ShowTasks tasks={tasks}/>
      }
    </View>
  )
}

export default Home