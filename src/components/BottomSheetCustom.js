import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { BottomSheet } from "react-native-sheet";
import color from "../utils/color";
import { CameraIcon, PhotoIcon } from "react-native-heroicons/solid";
const BottomSheetCustom = ({ bottomSheet, openImageStore, openCamera }) => {
  return (
    <BottomSheet height={350} ref={bottomSheet} sheetStyle={{ backgroundColor: "white" }}>
      <View className="items-center justify-center mt-5">
        <Text className="text-xl font-bold">Upload Photo</Text>
        <Text className="text-sm text-gray-600 font-semibold">Chose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        onPress={openCamera}
        className="items-center p-3 mt-5 mx-4 rounded-lg"
        style={{ backgroundColor: color.main_color }}
      >
        <View className="flex-row items-center justify-center">
          <CameraIcon size={25} color={"white"} />
          <Text className="font-bold text-white text-lg ml-2">Take Photo</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={openImageStore}
        className="items-center p-3 mt-5 mx-4  rounded-lg"
        style={{ backgroundColor: color.main_color }}
      >
        <View className="flex-row items-center justify-center">
          <PhotoIcon size={25} color={"white"} />
          <Text className="font-bold text-white text-lg ml-2">Choose From Library</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => bottomSheet.current?.hide()}
        className="bg-gray-400 items-center p-3 mt-5 mx-4  rounded-lg"
      >
        <Text className="font-bold text-white text-lg">Cancel</Text>
      </TouchableOpacity>
    </BottomSheet>
  );
};
export default BottomSheetCustom;
