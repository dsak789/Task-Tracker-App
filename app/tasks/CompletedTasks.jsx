import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../../components/Color'
import ShowTasks from '../../components/ShowTasks'
import ApiEndPoints from '../../components/ApiEndPoints.json'
import axios from 'axios'
import Loading from '../../components/Loading'

const CompletedTasks = () => {
  const [completedTasks,setCompletedTasks] = useState([])
  const [fetching,setFetching] =useState(true)
  
  const loadTasks = async ()=>{
    try {
      end=`${ApiEndPoints._base}/${ApiEndPoints.completed_tasks}/dsak.official`
      // console.log(end)
      await axios.get(end)
      .then((res)=>{
        setCompletedTasks(res.data.Tasks)
        // console.log("Completed==>",completedTasks)
        setFetching(false)
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
      {/* <Color color="#225864"/> */}
      {
        fetching ? <Loading text="Completed Tasks"/> : <ShowTasks tasks={completedTasks}/> 
        }
    </View>
  )
}

export default CompletedTasks