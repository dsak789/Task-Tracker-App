import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Color = ({color}) => {
  return (
    <View style={styles.colorContainer}>
      <Text>{color}</Text>
      {[1,0.7,0.4].map(opacity=>(
        <View key={opacity} style={[styles.colorBox, {backgroundColor: color, opacity}]}></View>
      ))}
    </View>
  )
}

export default Color


const styles = StyleSheet.create({
    colorContainer:{
        // flex:1,  
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal: 20, 
        paddingVertical: 10, 
        // height: '100%',
    },

    colorBox:{
      height:170,
      width:'50%',
      margin:25,
      justifyContent:'center',
      alignItems:'center',
      fontSize:25,
      borderRadius:15,
      borderCurve:'circular'
    }
})