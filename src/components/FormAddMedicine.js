import { View, Text, TouchableOpacity, Modal, Platform } from "react-native";
import React, { useState } from "react";
import UploadImage from "./UploadImage";
import { StyleSheet } from "react-native";
import TimeComponentCustom from "./TimeComponentCustom";
import { TextInput } from "react-native-paper";
import { ClipboardDocumentIcon } from "react-native-heroicons/outline";
import { SelectCountry, Dropdown } from "react-native-element-dropdown";
import { options, local_data } from "../../fakedata";

const FormAddMedicine = ({ addPill }) => {
  const [selectedImageURI, setSelectedImageURI] = useState(null);
  const [selectedTime, setSelectedTime] = useState();
  const [country, setCountry] = useState("PILL");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [formData, setFormData] = useState({
    imageURI: selectedImageURI,
    time: selectedTime,
    name: "",
    type: "PILL",
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
  };

  const handleAddPill = () => {
    const newPillData = {
      name: formData.name,
      imageURI: selectedImageURI,
      time: selectedTime,
      type: formData.type,
      dose: formData.dose,
      note: formData.note,
    };
    addPill(newPillData);
  };

  return (
    <View className="flex-1  w-[96%]">
      <View className=" justify-center items-center">
        <Text className="text-xl font-bold">Medicine Information</Text>
      </View>
      <View className="justify-center items-center form ">
        {/* <View className="justify-center items-center  w-[96%] h-[100px] border my-1 border-black rounded-2xl"> */}
        <UploadImage onImageSelect={handleImageSelection} />
        {/* </View> */}
        <View className=" first-letter: w-full">
          <View className="">
            <TextInput
              label={"Medicine Name"}
              mode="outlined"
              className=" text-gray-700 rounded-lg mx-2"
              left={<TextInput.Icon icon="file-document-outline" />}
              onChangeText={(value) => handleFormChange("name", value)}
            />
          </View>
          <View className="flex-row items-center">
            <View className="mx-2 py-3 flex-1">
              <SelectCountry
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                imageStyle={styles.imageStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                maxHeight={200}
                value={country}
                data={local_data}
                valueField="value"
                labelField="label"
                imageField="image"
                placeholder="Select country"
                searchPlaceholder="Search Types Medicine"
                onChange={(e) => {
                  setCountry(e.value);
                  handleFormChange("type", e.label);
                }}
              />
            </View>
            <View className="flex-1 py-3">
              <TextInput
                label={"Dose"}
                mode="outlined"
                value={formData.dose}
                className=" text-gray-700 rounded-lg mx-2 mb-1"
                left={<TextInput.Icon icon="medical-bag" />}
                t
                onChangeText={(value) => handleFormChange("dose", value)}
              />
            </View>
          </View>

          <View className="mx-2 py-2">
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyleDropDown}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={options}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select Note" : "..."}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                handleFormChange("note", item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <ClipboardDocumentIcon style={styles.icon} color={isFocus ? "blue" : "black"} name="Safety" size={20} />
              )}
            />
          </View>

          <View className="mt-1">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <View className="flex-row">
                  <TimeComponentCustom onTimeChange={handleTimeChange} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="flex-row justify-between items-center mx-2">
        <View className="flex-1 bg-green-400 py-4 my-2 rounded-lg w-full">
          <TouchableOpacity onPress={handleAddPill}>
            <Text className="text-center font-bold text-white text-xl">Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 20,
    marginLeft: 15,
    fontWeight: "bold",
  },
  selectedTextStyleDropDown: {
    fontSize: 20,
  },
  imageStyle: {
    width: 20,
    height: 20,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default FormAddMedicine;
