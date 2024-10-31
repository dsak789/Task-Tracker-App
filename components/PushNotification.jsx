import {
  Button,
  StyleSheet,
  Text,
  Switch,
  View,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NotificationSettings = () => {
  const [addTaskEnabled, setAddTaskEnabled] = useState(false);
  const [userdata, setUserdata] = useState('');
  const [completionReminderEnabled, setCompletionReminderEnabled] =
    useState(false);

  useEffect(() => {
    (async () => {
      const userdata = await AsyncStorage.getItem("loginInfo");
      const taskPreference = await AsyncStorage.getItem("addTask");
      const completionPreference = await AsyncStorage.getItem("taskCompletion");
      setAddTaskEnabled(JSON.parse(taskPreference));
      setCompletionReminderEnabled(JSON.parse(completionPreference));
      setUserdata(JSON.parse(userdata))
      await checkPermissions();
    })();
  }, []);

  const checkPermissions = async () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: finalStatus } =
          await Notifications.requestPermissionsAsync();
        if (finalStatus !== "granted") {
          Alert.alert(
            "Permission required",
            "Enable notifications in settings."
          );
        }
      }
    }
  };

  const savePreferences = async () => {
    await AsyncStorage.setItem("addTask", JSON.stringify(addTaskEnabled));
    await AsyncStorage.setItem(
      "taskCompletion",
      JSON.stringify(completionReminderEnabled)
    );

    if (addTaskEnabled) {
      await scheduleAddTaskNotification();
    } else {
      await Notifications.cancelScheduledNotificationAsync(
        "addTaskNotification"
      );
    }

    if (completionReminderEnabled) {
      await scheduleCompletionReminderNotification();
    } else {
      await Notifications.cancelScheduledNotificationAsync(
        "completionReminderNotification"
      );
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Hey! ${userdata?.name}`||`Hey! Achiever `,
        body: `Thankyou for using Task Tracker and your Notification Preferences Saved.`,
        sound: true,
      },
      trigger: null,
    });
  };

  const scheduleAddTaskNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Hey! ${userdata?.name}` || `Hey! Achiever `,
        body: "Any new tasks to add today?",
        sound: true,
        data: { route: "/tasks/AddTask" },
      },
      identifier: "addTaskNotification",
      trigger: { hour: 22, minute: 49, repeats: true },
    });
  };

  const scheduleCompletionReminderNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Hey! ${userdata?.name}` || `Hey! Achiever `,
        body: "Did you complete any tasks today?",
        sound: true,
        data: { route: "/tasks" },
      },
      identifier: "completionReminderNotification",
      trigger: { hour: 22, minute: 49, repeats: true },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notification Preferences</Text>
      <View style={styles.preferenceContainer}>
        <Text>Add Task Reminder</Text>
        <Switch
          value={addTaskEnabled}
          onValueChange={(value) => setAddTaskEnabled(value)}
        />
      </View>
      <View style={styles.preferenceContainer}>
        <Text>Completion Reminder</Text>
        <Switch
          value={completionReminderEnabled}
          onValueChange={(value) => setCompletionReminderEnabled(value)}
        />
      </View>
      <Button title="Save Preferences" onPress={savePreferences} />
    </SafeAreaView>
  );
};

export default NotificationSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor:'white',
    marginVertical:10,
    borderRadius:10
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  preferenceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
});
