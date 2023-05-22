import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

import color from "../../utils/color";
const Login = ({ navigation }) => {
  const onPressRegister = () => {
    navigation.navigate("Register");
  };
  const onPressHomeHandler = () => {
    navigation.replace("HomeScreen");
  };
  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: color.bg }}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-4"
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../../../assets/images/login.png")}
            style={{ width: 200, height: 200 }}
            // className="mb-20"
          />
        </View>
      </SafeAreaView>
      {/* ======================== */}
      <View className="flex-1 bg-white px-6 pt-6" style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1"
            value="john@gmail.com"
            placeholder="Enter Email"
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            value="********"
            placeholder="Enter Password"
          />
          <TouchableOpacity className="flex items-end mb-1">
            <Text className="text-gray-700 font-bold">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl" onPress={onPressHomeHandler}>
            <Text className="text-lg font-bold text-center text-gray-700">Login</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-sm text-gray-700 font-bold text-center py-3">Or</Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require("../../../assets/icons/google.png")} className="w-10 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require("../../../assets/icons/facebook.png")} className="w-10 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require("../../../assets/icons/apple.png")} className="w-10 h-10" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center items-center mt-5">
          <Text className=" font-semibold">Don't have an account? </Text>
          <TouchableOpacity onPress={onPressRegister}>
            <Text className="font-semibold text-yellow-400"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
