import { View, Text, TouchableOpacity, TextInput, Alert, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
// import PushNotification from "react-native-push-notification";
import * as Notifications from "expo-notifications";
import { Audio } from "expo-av";

const TimeComponent = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));

  const [scheduledTime, setScheduledTime] = useState(null);

  const soundObject = useRef(new Audio.Sound());

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Failed to get push token for notifications!");
      return;
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    if (mode === "time") {
      const selectedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setTime(selectedTime);
      setScheduledTime(getScheduledTime(currentDate));
      scheduleAlarm(selectedTime);
    }
  };

  const getScheduledTime = (currentDate) => {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      0
    );
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("time");
    setShow(true);
  };

  const scheduleAlarm = async (selectedTime) => {
    if (!scheduledTime) return;

    const now = new Date();
    const trigger = new Date(scheduledTime.getTime() + 5000); // Trigger the alarm 5 seconds after the scheduled time

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Alarm!",
          body: "Time to take your pill!",
          sound: "default",
        },
        trigger,
      });

      Alert.alert("Alarm Set", `Alarm set for ${selectedTime}`);
      playAlarmSound();
    } catch (error) {
      console.log("Failed to schedule notification:", error);
    }
  };

  const playAlarmSound = async () => {
    try {
      await soundObject.current.loadAsync(require("../../assets/sounds/sound_medicine.mp3"));
      await soundObject.current.playAsync();
    } catch (error) {
      console.log("Failed to play alarm sound:", error);
    }
  };

  return (
    <View className="flex-row justify-center items-center my-2">
      <TouchableOpacity onPress={showDatepicker}>
        <Image
          source={require("../../assets/icons/alarm-clock.png")}
          className="w-8 h-8 mr-3 justify-center items-center"
        />
      </TouchableOpacity>
      <TextInput
        value={time} // Display the chosen date in the TextInput
        className="p-1 bg-red-100 text-gray-700 rounded-lg mb-1"
        editable={false}
        selectTextOnFocus={false}
      />
      <View className="flex" style={{ backgroundColor: "gray" }}>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </View>
  );
};

export default TimeComponent;
