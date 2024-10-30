import React, { useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, sizes } from "../../assets/theme/styles.json";
import { StyleSheet, View } from "react-native";
import { fetch } from "@react-native-community/netinfo";
import CheckNetwork from "../../components/CheckNetwork";
const AuthenticationTabs = () => {
  const [isConnected, setIsConnected] = useState(false);
  const checkInternet = () => {
    fetch().then((state) => {
      console.log("Connection type", state);
      console.log("Is connected?", state.isConnected);
      setIsConnected(state.isConnected);
    });
  };
  useEffect(() => {
    checkInternet();
  }, []);
  return (
    <View style={styles.authView}>
      {isConnected ? (
        <Tabs>
          <Tabs.Screen
            name="Login"
            options={{
              title: "Login",
              tabBarIcon: () => (
                <Ionicons
                  name="log-in"
                  color={colors.primary}
                  size={sizes.large}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Register"
            options={{
              title: "Register",
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="person-add"
                  color={colors.primary}
                  size={sizes.large}
                />
              ),
            }}
          />
        </Tabs>
      ) : (
        <CheckNetwork status={isConnected} onRetry={checkInternet} />
      )}
    </View>
  );
};

export default AuthenticationTabs;

const styles = StyleSheet.create({
  authView: {
    flex: 1,
  },
});
