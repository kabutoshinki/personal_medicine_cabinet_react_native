import { View, Text, Image } from "react-native";
import React from "react";

const Test2 = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image source={require("../../assets/images/working_in_progress.gif")} />
    </View>
  );
};

export default Test2;
