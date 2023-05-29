import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FancyAlert } from "react-native-expo-fancy-alerts";

const AlertCustom = (props) => {
  return (
    <FancyAlert
      visible={props.onOpen}
      icon={
        <View
          className="flex flex-1 justify-center items-center rounded-full w-full"
          style={{ backgroundColor: props.color }}
        >
          {/* <ArrowRightOnRectangleIcon size={30} color={"white"} /> */}
          {props.icon}
        </View>
      }
      style={{ backgroundColor: "white" }}
    >
      <Text className="text-center mb-8 font-bold text-lg">{props.text}</Text>
      <View className="flex-row  mb-2  justify-between">
        <View className="flex-1">
          <TouchableOpacity
            className="rounded-lg"
            style={{ backgroundColor: props.color }}
            onPress={props.action || null}
          >
            <Text className="text-center p-3 font-bold text-white">Yes</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1 ml-2">
          <TouchableOpacity className="bg-gray-500 rounded-lg" onPress={props.onClose}>
            <Text className="text-center p-3 text-white font-bold">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </FancyAlert>
  );
};

export default AlertCustom;
