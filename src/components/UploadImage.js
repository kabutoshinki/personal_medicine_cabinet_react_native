import { View, Text, TouchableOpacity, Image, Platform, TextInput } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
const UploadImage = ({ onImageSelect, state }) => {
  const [selectedImageURI, setSelectedImageURI] = useState(null);
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
    };

    const response = await ImagePicker.launchImageLibraryAsync(options);

    if (!response.canceled) {
      const selectedImageURI = response.assets[0].uri;
      console.log("Selected image URI: ", selectedImageURI);
      setSelectedImageURI(selectedImageURI);
      onImageSelect(selectedImageURI);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={openImageStore} disabled={state == "View" ? true : false}>
        {selectedImageURI ? (
          <Image source={{ uri: selectedImageURI }} style={{ width: 100, height: 100 }} className="rounded-lg" />
        ) : (
          <Image source={require("../../assets/images/Group.png")} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UploadImage;
