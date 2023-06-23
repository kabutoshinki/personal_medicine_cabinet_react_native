import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";

const Progress = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image source={require("../../../assets/images/working_in_progress.gif")} />
    </View>
  );
};

export default Progress;
