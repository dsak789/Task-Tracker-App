import { ScrollView, Text } from 'react-native'
import React,{useContext} from 'react'
import Color from '../../components/Color'
import Dropdown from '../../components/Dropdown'
import { userInfo } from './_layout'
const AddTask = () => {
  const userData = useContext(userInfo)
  console.log("dadada",userData.dpUrl)
  return (
    <ScrollView>
      <Text>{userData.username}</Text>
      <Color color="#546866"/>
    </ScrollView>
  )
}

export default AddTask