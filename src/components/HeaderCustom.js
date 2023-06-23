import { View, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import color from "../utils/color";

const HeaderCustom = (props) => {
  return (
    <SafeAreaView
      className={` flex-row justify-between items-center ${Platform.OS === "ios" ? "h-28" : "h-16"}`}
      style={{ backgroundColor: color.main_color }}
    >
      <View className="flex justify-start">{props.left}</View>
      {props.name}
      <View className="flex-row justify-start items-center">{props.right}</View>
    </SafeAreaView>
  );
};

export default HeaderCustom;
