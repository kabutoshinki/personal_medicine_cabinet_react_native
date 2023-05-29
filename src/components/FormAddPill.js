import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import UploadImage from "./UploadImage";
import SelectDropdown from "react-native-select-dropdown";
import { StyleSheet } from "react-native";
import TimeComponentCustom from "./TimeComponentCustom";

const options = ["Every day", "Every other day", "Before Meals", "After Meals"];

const FormAddPill = ({ addPill }) => {
  const [selectedImageURI, setSelectedImageURI] = useState("../../assets/icons/add_medicine.png");
  const [selectedTime, setSelectedTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [formData, setFormData] = useState({
    imageURI: selectedImageURI,
    time: selectedTime,
    pillName: "",
    quantity: "1",
    dose: "1",
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

  const handleTimeChange = (time) => {
    setSelectedTime(time); // Update the selected time in the state
    handleFormChange("time", time); // Update the formData.time value
  };

  const handleAddPill = () => {
    const newPillData = {
      pillName: formData.pillName,
      imageURI: selectedImageURI,
      time: formData.time,
      quantity: formData.quantity,
      dose: formData.dose,
      note: formData.note,
    };
    console.log(newPillData);
    addPill(newPillData);
  };
  return (
    <View className="flex-1">
      <View className="flex-1 justify-center items-center   form ">
        <View className="justify-center items-center  w-[120px] h-[120px] border my-2 border-black rounded-2xl">
          <UploadImage onImageSelect={handleImageSelection} />
        </View>
        <View className=" first-letter: w-full">
          <View className="flex-1">
            <Text className="text-gray-700 ml-4 font-bold mb-2">Pill Name:</Text>
            <TextInput
              placeholder="Pill Name"
              className=" bg-gray-100 text-gray-700 rounded-lg p-3 mx-2  "
              onChangeText={(value) => handleFormChange("pillName", value)}
            />
          </View>
          <View className="flex-1">
            <Text className="text-gray-700 ml-4 font-bold my-2">Time:</Text>
            <TimeComponentCustom onTimeChange={handleTimeChange} />
          </View>
          <View className="flex-row flex-1 my-2">
            <View className="flex-1">
              <Text className="text-gray-700 ml-4 font-bold  mb-2">Quantity:</Text>
              <TextInput
                placeholder="Quantity"
                className=" bg-gray-100 text-gray-700 rounded-lg p-3 mr-2 mx-2"
                keyboardType="numeric"
                value={formData.quantity}
                onChangeText={(value) => handleFormChange("quantity", value)}
              />
            </View>
            <View className="flex-1">
              <Text className="text-gray-700 ml-4 font-bold  mb-2">Dose:</Text>
              <TextInput
                placeholder="Dose"
                className=" bg-gray-100 text-gray-700 rounded-lg p-3 mx-2"
                keyboardType="numeric"
                value={formData.dose}
                onChangeText={(value) => handleFormChange("dose", value)}
              />
            </View>
          </View>
          <View className="flex-1 mb-2">
            <Text className="text-gray-700 ml-4 font-bold  mb-2">Note:</Text>
            <SelectDropdown
              data={options}
              onSelect={(selectedItem, index) => {
                handleFormChange("note", selectedItem);
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
              defaultButtonText={"Select option"}
            />
          </View>
        </View>
      </View>
      <View className="flex-row justify-between items-center  my-3 mx-2">
        <View className=" flex-1 bg-yellow-400 py-3 rounded-lg w-[150px] mr-2">
          <TouchableOpacity>
            <Text className="text-center">Reset</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1 bg-green-400 py-3 rounded-lg w-[150px]">
          <TouchableOpacity onPress={handleAddPill}>
            <Text className="text-center">Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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

export default FormAddPill;
