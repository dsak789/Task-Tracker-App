import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
const Loading = ({text}) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size='medium' color='#e9f110' animating={true}/>
      <Animatable.Text 
      animation="flipInX" iterationCount='infinite'
      style={styles.loadingText}>...Loading {text}...</Animatable.Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    loadingContainer:{
        flex:1,
        backgroundColor:"#131212",
        justifyContent:'center',
        alignItems:'center',
        minHeight:'100%',
        minWidth:'90%'
    },
    loadingText:{
        color:'wheat',
        fontSize:25

    }
})