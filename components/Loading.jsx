import { View, ActivityIndicator,ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
const bg = require('../assets/images/TaskTracker1024.png');
const Loading = ({text}) => {
  return (
    <View style={styles.loadingContainer}>
      <ImageBackground source={bg} style={styles.backgroundImage} resizeMode="contain">
      <ActivityIndicator size='medium' color='wheat' animating={true}/>
      <Animatable.Text 
      animation="flipInX" iterationCount='infinite'
      style={styles.loadingText}>...Loading {text}...</Animatable.Text>
      </ImageBackground>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    loadingContainer:{
        // flex:1,
        backgroundColor:"#131212",
        justifyContent:'center',
        alignItems:'center',
        minHeight:'100%',
    },
    loadingText:{
      marginBottom:80,
        color:'wheat',
        fontSize:25
    },
    backgroundImage: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
})