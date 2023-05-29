import { View, Text, TouchableOpacity, TextInput, Alert, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
// import PushNotification from "react-native-push-notification";
import * as Notifications from "expo-notifications";
import { Audio } from "expo-av";

const TimeComponentCustom = ({ onTimeChange, state, timeCurrent }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    if (mode === "time") {
      const selectedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setTime(selectedTime);

      onTimeChange(selectedTime);
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

  return (
    <View className="flex-row my-2">
      <TextInput
        value={timeCurrent || time} // Display the chosen date in the TextInput
        className=" bg-gray-100 text-gray-700 rounded-lg p-3 mx-2 w-[60%]"
        editable={false}
        selectTextOnFocus={false}
        onPress={showDatepicker}
      />
      <TouchableOpacity
        className="rounded-lg w-[120px]"
        onPress={showDatepicker}
        disabled={state === "View" ? true : false}
      >
        <Text className="bg-white text-center font-bold py-4 rounded-lg">Set Time</Text>
      </TouchableOpacity>
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

export default TimeComponentCustom;
