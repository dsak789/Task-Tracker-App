import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons
import { LinearGradient } from "expo-linear-gradient"; // Make sure to install expo-linear-gradient

const CheckNetwork = ({ status, onRetry }) => {
  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.CheckNetworkContainer}
    >
      <Ionicons
        name="wifi"
        size={60}
        color={status?.isConnected ? "yellow" : "red"}
      />
      {!status?.isConnected && (
        <Text style={styles.status}>No Internet Connection</Text>
      )}
      {status?.isConnected && !status?.isNetworkReachable && (
        <Text style={styles.status}>{status?.type} has no Internet access</Text>
      )}
      <Text style={styles.message}>Please check your network settings.</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryButtonText}> Reload </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CheckNetwork;

const styles = StyleSheet.create({
  CheckNetworkContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  status: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
  },
  message: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "#6b7fff",
    borderRadius: 25,
  },
  retryButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
