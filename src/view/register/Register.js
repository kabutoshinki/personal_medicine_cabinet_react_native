import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import color from "../../utils/color";
import * as userService from "../../service/userService";
const Register = ({ navigation }) => {
  const onPressLogin = () => {
    navigation.navigate("Login");
  };
  const [formData, setFormData] = useState({
    password: "",
    email: "huy@gmail.com",
    phone: "0147852369",
  });

  const handleFormChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const onPressHomeHandler = async () => {
    // if(formData.email==="kabutoshinki@gmail.com" && formData.password==="123456")
    try {
      const { data } = await userService.register(formData);
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      navigation.goBack();
      // console.log("check");
    } catch (err) {
      console.log("err");
      console.log(err?.response?.data?.message);
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: color.main_color }}>
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
            source={require("../../../assets/images/register_img.png")}
            style={{ width: 195, height: 130 }}
            className="mb-3"
          />
        </View>
      </SafeAreaView>
      {/* ======================== */}
      <View className="flex-1 bg-white px-8 pt-8 mt-2" style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Phone</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1"
            value={formData.phone}
            keyboardType="numeric"
            placeholder="Enter Phone"
            minLength={10}
            maxLength={10}
            onChangeText={(value) => handleFormChange("phone", value)}
          />
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-1"
            value={formData.email}
            placeholder="Enter Email"
            onChangeText={(value) => handleFormChange("email", value)}
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-2"
            secureTextEntry
            value={formData.password}
            placeholder="Enter Password"
            onChangeText={(value) => handleFormChange("password", value)}
          />
          <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl" onPress={onPressHomeHandler}>
            <Text className="text-lg font-bold text-center text-gray-700">Sign Up</Text>
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
          <Text className=" font-semibold">Already have an account? </Text>
          <TouchableOpacity onPress={onPressLogin}>
            <Text className="font-semibold text-yellow-400"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;
