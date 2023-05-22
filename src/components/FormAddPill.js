import { View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
// import PushNotification from "react-native-push-notification";
import * as Notifications from "expo-notifications";
import { Audio } from "expo-av";
import UploadImage from "./UploadImage";
import TimeComponent from "./TimeComponent";

const FormAddPill = ({ addPill }) => {
  const [selectedImageURI, setSelectedImageURI] = useState("../../assets/icons/add_medicine.png");
  const [formData, setFormData] = useState({
    imageURI: selectedImageURI,
    medicineName: "",
    quantity: 1,
    dose: 1,
    note: "",
  });

  const handleImageSelection = (imageURI) => {
    setSelectedImageURI(imageURI);
  };

  const handleFormChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  const handleAddPill = () => {
    const newPillData = {
      medicineName: formData.medicineName,
      imageURI: selectedImageURI,
      quantity: 1,
      dose: 1,
    };

    addPill(newPillData);
  };
  return (
    <View className="flex-1 bg-purple-300 justify-center items-center">
      <View>
        <TimeComponent />
      </View>
      <View className="flex-row mx-4 space-x-4 justify-center items-center">
        <View className="flex-1 justify-center items-center w-[120px] h-[120px] border border-black rounded-3xl">
          <UploadImage onImageSelect={handleImageSelection} />
        </View>
        <View className="flex-1 justify-center items-center">
          <TextInput
            placeholder="Medicine Name"
            className=" bg-gray-100 text-gray-700 rounded-lg p-1 mb-2"
            onChangeText={(value) => handleFormChange("medicineName", value)}
          />
          <View className="flex-row justify-center items-center">
            <TextInput placeholder="Quantity" className=" bg-gray-100 text-gray-700 rounded-lg p-1 mr-2" />
            <TextInput placeholder="Dose" className=" bg-gray-100 text-gray-700 rounded-lg p-1" />
          </View>
          <TextInput placeholder="Note" className=" bg-gray-100 text-gray-700 rounded-lg p-1 mt-2 w-[100px]" />
        </View>
      </View>
      <View className="flex-row w-[350px] bg-orange-400 justify-between items-center  mt-3">
        <View className="bg-red-400 py-3 rounded-lg w-[150px]">
          <TouchableOpacity onPress={handleAddPill}>
            <Text className="text-center">Add</Text>
          </TouchableOpacity>
        </View>
        <View className="bg-yellow-400 py-3 rounded-lg w-[150px]">
          <TouchableOpacity>
            <Text className="text-center">Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FormAddPill;
