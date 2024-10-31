import React, { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  StyleSheet,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
const bg = require("../assets/images/TaskTrackersplash-1284-2778.png");

const NotFound = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    const timer = setTimeout(() => {
      router.replace("/auth");
    }, 30);

    return () => clearTimeout(timer);
  }, [router, navigation]);

  return (
    <Pressable style={styles.container} onPress={() => router.push("/auth")}>
      <ImageBackground
        source={bg}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>Hi Achiever...!</Text>
          <Text style={styles.text2}>Welcome to TaskTracker</Text>
          <Text style={styles.subtext}>Tap Anywhere to Go Home</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for better text visibility
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  text2: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtext: {
    color: "#d3d3d3",
    fontSize: 19,
    textAlign: "center",
  },
});
