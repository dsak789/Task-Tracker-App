import { StyleSheet, Text, View, ActivityIndicator, Linking } from 'react-native'
import { Video } from 'expo-av'
import React,{useState,useRef} from 'react'
import { TouchableOpacity } from 'react-native'

const GuideVideo = () => {
  const [isBuffering,setIsBuffering] = useState(false)
  const videRef = useRef(null)
  const drive_link = `https://drive.google.com/file/d/1yPBS4xffJ1hIpMUByqv70T0jonj0JNOi/view?usp=sharing`
  const handleBufferStatus = (status) =>{
    if(status.isBuffering){
      setIsBuffering(true)
    }
    else{
      setIsBuffering(false)
    }
  }

  const openLink = () =>{
    Linking
    .openURL(drive_link)
    .catch((err)=>{
      console.log(err)
    })
  } 


  return (
    <View style={styles.videoContainer}>
      <Video
        ref={videRef}
        // source={{uri:`https://github.com/Panga-Deepthi/10000-coders/raw/refs/heads/main/What's%20it%20like%20to%20work%20at%20Google_.mp4`}}
        // source={{uri:`https://drive.google.com/file/d/1yPBS4xffJ1hIpMUByqv70T0jonj0JNOi/view?usp=sharing`}}
        source={{
          uri: `https://github.com/dsak789/Task-Tracker-App/raw/refs/heads/dev7/assets/videos/guide.mp4`,
        }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        rate={1.0}
        volume={1.0}
        isMuted={false}
        shouldPlay={false}
        onPlaybackStatusUpdate={handleBufferStatus}
      />
      <View style={styles.container}>
        <View style={styles.browserNav}>
          <Text style={styles.videoText}>
            If the video can't load here, you can open it in the browser:
          </Text>
          <TouchableOpacity onPress={openLink}>
            <Text style={styles.linkText}>Open in Browser</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isBuffering && (
        <View style={styles.bufferContainer}>
          <ActivityIndicator size={70} color={"#00000089"} />
          <Text style={styles.bufferText}>Video Loading...</Text>
        </View>
      )}
    </View>
  );
}

export default GuideVideo

const styles = StyleSheet.create({
    videoContainer: {
        marginTop: 10,
        width:'100%',
      },
      bufferText: {
        color: '#333',
        fontSize: 16,
      },
      video: {
        width: '100%',
        height: 700,
        borderRadius:15,
        padding:15
      },
      bufferContainer: {
        position: 'absolute',
        backgroundColor:'#80808092',
        top: '40%',
        left: '33%',
        padding:20,
        transform: [{ translateX: -25 }, { translateY: -25 }],
      },
      browserNav:{
        backgroundColor:'#a9a5a5',
        padding:10,
        margin:5,
        borderRadius:10
      },
      videoText:{
        color:'#333',
        fontSize:16
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      browserNav: {
        marginTop: 20,
        alignItems: 'center',
      },
      videoText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
      },
      linkText: {
        fontSize: 16,
        color: '#1a73e8',
        textDecorationLine: 'underline',
        marginBottom: 20,
      },

})