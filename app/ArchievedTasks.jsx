import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../components/Color'
import ShowTasks from '../components/ShowTasks'
import ApiEndPoints  from '../components/ApiEndPoints'
import axios from 'axios'
import Loading from '../components/Loading'

const ArchievedTasks = () => {
const [archivedTasks,setArchievedTasks] = useState([])
const [fetching,setFetching] =useState(true)
const loadTasks = async ()=>{
  try {
    end=`${ApiEndPoints._base}/${ApiEndPoints.archieved_tasks}/dsak.official`
    console.log(end)
    await axios.get(end)
    .then((res)=>{
      setArchievedTasks(res.data.Tasks)
      // console.log("Archieved==>",archivedTasks)
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
        {/* <Color color='#eeee9e'/> */}
        {
          fetching ? <Loading text = "Archieved Tasks" /> : <ShowTasks tasks = {archivedTasks}/>
        }
    </View>
  )
}

export default ArchievedTasks