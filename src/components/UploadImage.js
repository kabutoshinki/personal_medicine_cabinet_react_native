import { View, Text, TouchableOpacity, Platform, TextInput, Image } from "react-native";
import React, { useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import BottomSheetCustom from "./BottomSheetCustom";
import { CameraIcon } from "react-native-heroicons/solid";
import color from "../utils/color";

const UploadImage = ({ onImageSelect, state, imageURI }) => {
  const [selectedImageURI, setSelectedImageURI] = useState(null);
  const bottomSheet = useRef(null);
  const openImageStore = async () => {
    // const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      console.log("Permission to access the camera roll is required!");
      return;
    }

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      selectionLimit: 1,
    };

    const response = await ImagePicker.launchImageLibraryAsync(options);

    if (!response.canceled) {
      const selectedImageURI = response.assets[0].uri;
      console.log("Selected image URI: ", selectedImageURI);
      setSelectedImageURI(selectedImageURI);
      onImageSelect(selectedImageURI);
      bottomSheet?.current.hide();
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      console.log("Permission to access the camera is required!");
      return;
    }

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true, // Added base64 option to get the captured image data
    };

    const response = await ImagePicker.launchCameraAsync(options);

    if (!response.canceled) {
      const selectedImageURI = response.assets[0].uri;
      console.log("Selected image URI: ", selectedImageURI);
      setSelectedImageURI(selectedImageURI);
      onImageSelect(selectedImageURI);
      bottomSheet?.current.hide();
    }
  };
  return (
    <View className="w-full h-[150px] justify-center items-center my-2">
      <TouchableOpacity
        onPress={() => bottomSheet.current.show()}
        className=" flex-1  w-[200px] border my-1 border-black rounded-md bg-gray-300"
      >
        <View className="h-full w-full justify-center items-center">
          {selectedImageURI ? (
            <Image source={{ uri: selectedImageURI }} resizeMode="cover" className="rounded-md h-full  w-full" />
          ) : imageURI ? (
            <Image source={{ uri: imageURI }} resizeMode="cover" className="rounded-md w-full h-full" />
          ) : (
            <CameraIcon size={50} color={"white"} />
          )}
          <BottomSheetCustom bottomSheet={bottomSheet} openImageStore={openImageStore} openCamera={openCamera} />
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{ backgroundColor: color.main_color }}
        className="w-[55%] p-1 mt-3 rounded-sm"
        onPress={() => bottomSheet.current.show()}
      >
        <Text className="text-white font-bold text-lg text-center">TAKE PICTURE</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default UploadImage;
