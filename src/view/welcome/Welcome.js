import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import color from "../../utils/color";
const Welcome = ({ navigation }) => {
  const onPressLogin = () => {
    navigation.navigate("Login");
  };
  const onPressRegister = () => {
    navigation.navigate("Register");
  };
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: color.bg }}>
      <View className="flex-1 flex justify-around my-4">
        <Text className="text-white font-bold text-4xl text-center">Let's Get Started</Text>
        <View className="flex-row justify-center">
          <Image
            source={require("../../../assets/images/welcome.png")}
            style={{ width: 350, height: 350 }}
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
