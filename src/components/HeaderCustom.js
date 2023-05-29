import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HeaderCustom = (props) => {
  return (
    <SafeAreaView className="bg-[#4D9FEC] flex-row justify-between items-center">
      <View className="flex justify-start">{props.left}</View>
      {props.name}
      <View className="flex-row justify-start items-center">{props.right}</View>
    </SafeAreaView>
  );
};

export default HeaderCustom;
