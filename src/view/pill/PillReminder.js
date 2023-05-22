import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/solid";
import UploadImage from "../../components/UploadImage";
// import {} from "";
const PillReminder = ({ navigation }) => {
  return (
    <View className="flex-1">
      <SafeAreaView className="bg-[#4D9FEC] flex-row justify-between items-center">
        <View className="flex justify-start">
          <TouchableOpacity className=" p-2 ml-4" onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size="30" color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex justify-start">
          <Text className="text-white text-xl">User Name</Text>
        </View>
        <View className="flex justify-start">
          <TouchableOpacity className=" p-2 ml-4">
            <MagnifyingGlassIcon size="30" color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View className="flex my-4 justify-center items-center">
        <View>
          <Text className="text-2xl font-bold">Medicine Information</Text>
        </View>
        <View className="flex-row mt-12 mx-6 space-x-4">
          <View className="flex-1 justify-center items-center w-[179px] h-[160px] border border-black rounded-3xl">
            <UploadImage />
          </View>
          <View className="flex-1 bg-blue-500  justify-center items-center">
            <Text>xyj</Text>
          </View>
        </View>
        <View className="flex-1">
          <View>
            <Text>Add</Text>
            <Text>Cancel</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PillReminder;
