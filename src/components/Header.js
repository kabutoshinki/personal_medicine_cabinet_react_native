import { View, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import color from "../utils/color";
const Header = (props) => {
  return (
    <SafeAreaView
      className={`${Platform.OS === "ios" ? "h-28" : "h-16 p-3"}`}
      style={{ backgroundColor: color.main_color }}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex justify-start">
          <TouchableOpacity className=" p-2 ml-4" onPress={props.onPress_1 || null}>
            {props.icon_1}
          </TouchableOpacity>
        </View>
        <View className="flex justify-start">
          {props.other ? (
            <Text className="text-white text-3xl text-center ml-12">{props.name}</Text>
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
      </View>
    </SafeAreaView>
  );
};

export default Header;
