import { StyleSheet, Text, View, ToastAndroid } from 'react-native'
import React from 'react'

const Toast = () => {

    const toast = (message) =>  {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
        )
    }

  return {toast}
}

export default Toast