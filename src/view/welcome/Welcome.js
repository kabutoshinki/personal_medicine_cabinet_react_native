import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import color from "../../utils/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
const Welcome = ({ navigation }) => {
  useEffect(() => {
    checkDeviceToken();
  }, []);

  const checkDeviceToken = async () => {
    try {
      const deviceToken = await AsyncStorage.getItem("deviceToken");
      console.log(deviceToken);
      if (deviceToken) {
        registerForPushNotifications();
      } else {
        registerForPushNotifications();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registerForPushNotifications = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;
    console.log(existingStatus);
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      console.log("status");
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Failed to get push token for notifications");
      return;
    }
    const deviceToken = (
      await Notifications.getExpoPushTokenAsync({ projectId: "28285523-5408-41ee-a981-6b1ea007e60d" })
    ).data;
    const tokenValue = deviceToken.substring(deviceToken.indexOf("[") + 1, deviceToken.indexOf("]"));
    try {
      await AsyncStorage.setItem("deviceToken", tokenValue);
    } catch (error) {
      console.log("error");
    }
  };

  const onPressLogin = () => {
    navigation.navigate("Login");
  };
  const onPressRegister = () => {
    navigation.navigate("Register");
  };

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    try {
      AsyncStorage.getItem("user").then((value) => {
        if (value !== null) {
          navigation.navigate("HomeScreen");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: color.main_color }}>
      <View className="flex-1 flex justify-around my-4">
        <Text className="text-white font-bold text-4xl text-center">Let's Get Started</Text>
        <View className="flex-row justify-center">
          <Image
            source={require("../../../assets/images/welcome.png")}
            style={{ width: 350, height: 500 }}
            // className="mb-20"
          />
        </View>
        <View className="space-y-4">
          <TouchableOpacity className="py-3 bg-yellow-400 mx-7 rounded-xl" onPress={onPressLogin}>
            <Text className="text-xl font-bold text-center text-gray-700">Sign In</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center items-center">
          <Text className="text-white font-semibold">Don't have an account? </Text>
          <TouchableOpacity onPress={onPressRegister}>
            <Text className="font-semibold text-yellow-400"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
