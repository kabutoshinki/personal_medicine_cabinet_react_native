import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import color from "../utils/color";
const Header = (props) => {
  console.log("Header");
  return (
    <SafeAreaView className="flex-row justify-between items-center" style={{ backgroundColor: color.main_color }}>
      <View className="flex justify-start">
        <TouchableOpacity className=" p-2 ml-4" onPress={props.onPress_1 || null}>
          {props.icon_1}
        </TouchableOpacity>
      </View>
      <View className="flex justify-start">
        {props.other ? (
          <Text className="text-white text-xl text-center ml-12">{props.name}</Text>
        ) : (
          <Text className="text-white text-xl text-center">{props.name}</Text>
        )}
      </View>
      <View className="flex-row justify-start items-center">
        <TouchableOpacity className=" p-2 mr-2" onPress={props.onPress_2 || null}>
          {props.icon_2}
        </TouchableOpacity>
        {props.other}
      </View>
    </SafeAreaView>
  );
};

export default Header;
