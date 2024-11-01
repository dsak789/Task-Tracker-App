import React, { useState, useEffect } from "react";
import { View, Alert, Image, StyleSheet, Pressable } from "react-native";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import logo from "../assets/images/TaskTracker1024.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { fetch } from "@react-native-community/netinfo";
import CheckNetwork from "../components/CheckNetwork";

const _layout = () => {
  const router = useRouter();
  const [isLoggedin, setIsloggedin] = useState(false);
  const [dp, setDp] = useState("");
  const [isConnected, setIsConnected] = useState();
  const [network, setNetwork] = useState();
  const checkInternet = () => {
    fetch().then((state) => {
      setIsConnected(state.isConnected);
      setNetwork(state);
    });
  };
  useEffect(() => {
    checkInternet();
  }, []);
  const loginCheck = async () => {
    try {
      let res = await AsyncStorage.getItem("loginInfo");
      res = JSON.parse(res) || { isLogin: false };
      setIsloggedin(res.isLogin);
      // console.log("Asynch==>",res)
      const dp_url = res.dpUrl || "";
      setDp(dp_url);
      if (res.isLogin) {
        router.replace("/tasks");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      "Logout!",
      "Sure want to logout...?",
      [
        {
          text: "Logout",
          onPress: async () => {
            try {
              await AsyncStorage.setItem(
                "loginInfo",
                JSON.stringify({ isLogin: false })
              );
              // console.log('Logged Out');
              setIsloggedin(false);
              router.replace("/auth");
            } catch (error) {
              console.log(error);
            }
          },
          style: "destructive",
        },
        {
          text: "Stay",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    loginCheck();
  }, [dp, setDp]);

  return (
    <View style={styles.appContainer}>
      {isConnected && network?.isInternetReachable ? (
        <Stack>
          <Stack.Screen
            name="auth"
            options={{
              title: "Authentication",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="tasks"
            options={{
              title: "",
              headerLeft: () => (
                <View style={styles.headerLeft}>
                  <Pressable
                    onPress={() => {
                      // Alert.alert('Hi..','Thankyou for using TaskTracker')
                      router.push("contact/Contact");
                    }}
                  >
                    <Image source={logo} style={styles.profileImage} />
                  </Pressable>
                </View>
              ),
              headerRight: () => (
                <View style={styles.headerLeft}>
                  <Pressable onPress={handleLogout} style={styles.logoutbtn}>
                    <Ionicons name="log-out" size={35} color="#2776d7" />
                    {dp != "" && (
                      <Image source={{ uri: dp }} style={styles.profileImage} />
                    )}
                  </Pressable>
                </View>
              ),
            }}
            initialParams={{ dp_url: dp }}
          />
          <Stack.Screen
            name="contact/Contact"
            options={{
              title: "Contact",
              headerTitle: "Task Tracker Contact",
            }}
          />
          <Stack.Screen
            name="contact/MultiScreen"
            options={{
              title: "Seetings",
              headerTitle: "Task Tracker Settings",
            }}
          />
        </Stack>
      ) : (
        <CheckNetwork status={network} onRetry={checkInternet} />
      )}
    </View>
  );
};

export default _layout;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "100%",
    minWidth: "100%",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  logoutbtn: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
});
