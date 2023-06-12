import React, { useEffect } from "react";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications";

const NotificationComponent = ({ medicineData }) => {
  console.log(medicineData);
  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "Notification Permission",
          "Failed to get permission for notifications. Please make sure you have enabled notifications for this app."
        );
        return;
      }
    };

    registerForPushNotificationsAsync();
  }, []);

  useEffect(() => {
    const checkMedicineTime = async () => {
      const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      for (const medicine of medicineData) {
        if (medicine.time === currentTime) {
          scheduleNotification(medicine);
          scheduleAlarm(medicine);
        }
      }
    };

    const interval = setInterval(() => {
      checkMedicineTime();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [medicineData]);

  const scheduleNotification = (medicine) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Medicine Reminder",
        body: `It's time to take ${medicine.name}`,
        data: { medicineId: medicine.id },
      },
      trigger: null,
    });
  };

  const scheduleAlarm = (medicine) => {
    // Implement your alarm logic here
    // You can use a library like 'react-native-alarm' or 'react-native-push-notification' for alarm functionality
    // Alternatively, you can use the built-in 'react-native Sound' module for playing a sound as an alarm
  };

  return null;
};

export default NotificationComponent;
