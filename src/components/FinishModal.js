import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import UploadImage from "./UploadImage";
import TimeComponentCustom from "./TimeComponentCustom";
import SelectDropdown from "react-native-select-dropdown";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
const options = ["LOW", "NORMAL", "HIGH"];

const FinishModal = ({ visible, onCancel, onSave, pill }) => {
  const [transformed, setTransformed] = useState(false);
  const navigation = useNavigation();
  const [selectedTime, setSelectedTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  const [selectedImageURI, setSelectedImageURI] = useState("../../assets/icons/add_medicine.png");
  const [formData, setFormData] = useState({
    imageURI: selectedImageURI,
    medicineName: "",
    pill: pill,
    priority: "LOW",
  });
  const handleFormChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const newMedicine = {
      ...formData,
      id: uuid.v4(),
    };
    navigation.navigate("Home Page", { medicineData: newMedicine });
  };
  const handleCancel = () => {
    // Set the transformed state to false
    setTransformed(false);
    // Close the modal
    onCancel();
  };

  return (
    <Modal visible={visible} onRequestClose={onCancel}>
      {/* <View className="w-[96%] mx-2 h-[80%] justify-center items-center mt-12 bg-slate-400"> */}
      <View className="flex-1 bg-gray-300">
        <View className="flex-row justify-between items-center mt-10">
          <Text className="text-center font-bold text-2xl flex-1 ml-6">Medicine</Text>
          <TouchableOpacity onPress={handleCancel}>
            <Text className="font-bold text-2xl text-gray-700 mr-4">X</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1 justify-center items-center form ">
          <View className="justify-center items-center  w-[120px] h-[120px] border my-2 border-black rounded-2xl">
            <UploadImage />
          </View>
          <View className="flex-1  w-[96%]">
            <View className="">
              <Text className="text-gray-700 ml-4 font-bold mb-2">Medicine Name:</Text>
              <TextInput
                placeholder="Medicine Name"
                className=" bg-gray-100 text-gray-700 rounded-lg p-3 mx-2  "
                value={formData?.medicineName}
                onChangeText={(value) => handleFormChange("medicineName", value)}
              />
            </View>

            <View className=" mb-2">
              <Text className="text-gray-700 ml-4 font-bold  mb-2">Priority:</Text>

              <SelectDropdown
                data={options}
                onSelect={(selectedItem, index) => {
                  handleFormChange("priority", selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                // buttonTextStyle={styles.dropdown1BtnTxtStyle}
                defaultButtonText={formData.priority}
              />
            </View>

            <View className="flex-row justify-center items-center my-5">
              <TouchableOpacity onPress={handleCancel} className="bg-red-500 px-5 py-3 rounded-lg w-32 mr-2">
                <Text className="text-white font-bold text-center">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-blue-500 px-5 py-3 rounded-lg w-32" onPress={handleSave}>
                <Text className=" text-white font-bold text-center">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "center" },
});
export default FinishModal;
