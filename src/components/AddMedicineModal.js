import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import color from "../utils/color";
import { SelectCountry, Dropdown } from "react-native-element-dropdown";
import { options, local_data } from "../../fakedata";
import { ArrowLeftIcon, CheckIcon } from "react-native-heroicons/solid";
import UploadImage from "./UploadImage";
import TimeComponentCustom from "./TimeComponentCustom";
import { ClipboardDocumentIcon } from "react-native-heroicons/outline";
import uuid from "react-native-uuid";
const AddMedicineModal = ({ onOpen, onCancel, onSave }) => {
  const [selectedImageURI, setSelectedImageURI] = useState(null);
  const [selectedTime, setSelectedTime] = useState();
  const [country, setCountry] = useState("PILL");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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
  const handleAddMedicine = () => {
    const newMedData = {
      name: formData.name,
      imageURI: selectedImageURI,
      time: selectedTime,
      type: formData.type,
      dose: formData.dose,
      note: formData.note,
      key: uuid.v4(),
      id: uuid.v4(),
    };
    onSave(newMedData);
    // console.log(newMedData);
  };
  return (
    <Modal visible={onOpen} onRequestClose={onCancel} transparent animationType="slide">
      {/* <View className="w-[96%] mx-2 h-[80%] justify-center items-center mt-12 bg-slate-400"> */}
      <View className="h-[1000px]  justify-center items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View
          className="flex-row justify-between items-center w-[90%] py-5 rounded-t-lg mt-5"
          style={{ backgroundColor: color.main_color }}
        >
          <TouchableOpacity onPress={onCancel} className="ml-4">
            <ArrowLeftIcon size={30} color={"white"} />
          </TouchableOpacity>
          <Text className="text-center font-bold text-xl flex-1 text-white">Add Medicine</Text>
          <TouchableOpacity onPress={handleAddMedicine} className="mr-4">
            <CheckIcon size={30} color={"white"} />
          </TouchableOpacity>
        </View>
        <View className="flex-[0.9]   form  w-[90%]">
          <View className="flex-[0.6] w-full bg-white rounded-b-lg">
            <View className="justify-center items-center form ">
              <UploadImage onImageSelect={handleImageSelection} />

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
                      <ClipboardDocumentIcon
                        style={styles.icon}
                        color={isFocus ? "blue" : "black"}
                        name="Safety"
                        size={20}
                      />
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
  container: {
    backgroundColor: "white",
    marginHorizontal: 16,
  },
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
export default AddMedicineModal;
