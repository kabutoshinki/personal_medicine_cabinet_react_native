import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = (props) => {
  return (
    <SafeAreaView className="bg-[#4D9FEC] flex-row justify-between items-center">
      <View className="flex justify-start">
        <TouchableOpacity className=" p-2 ml-4" onPress={props.onPress_1 || null}>
          {props.icon_1}
        </TouchableOpacity>
      </View>
      <View className="flex justify-start">
        <Text className="text-white text-xl">{props.name}</Text>
      </View>
      <View className="flex justify-start">
        <TouchableOpacity className=" p-2 mr-4" onPress={props.onPress_2 || null}>
          {props.icon_2}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;
