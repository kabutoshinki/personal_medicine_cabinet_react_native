import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from "react-native";
import UploadImage from "./UploadImage";
import TimeComponentCustom from "./TimeComponentCustom";
import { TextInput } from "react-native-paper";
import { Dropdown, SelectCountry } from "react-native-element-dropdown";
import { options, local_data } from "../../fakedata";
import { ClipboardDocumentIcon } from "react-native-heroicons/outline";
import color from "../utils/color";
import AlertCustom from "./AlertCustom";
import { ExclamationTriangleIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";

const EditPillModal = ({ visible, onCancel, onSave, onDelete, item, state }) => {
  const [transformed, setTransformed] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [selectedImageURI, setSelectedImageURI] = useState(item?.imageURI);
  const [country, setCountry] = useState(item?.type);
  // const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [visibleAlert, setVisibleAlert] = React.useState(false);
  const toggleAlert = React.useCallback(() => {
    setVisibleAlert(!visibleAlert);
  }, [visibleAlert]);

  const [formData, setFormData] = useState({
    ...item,
    imageURI: selectedImageURI,
    time: item?.time,
    name: item?.name,
    type: item?.type,
    dose: item?.dose,
    note: item?.note,
  });

  const handleFormChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  const handleTimeChange = (time) => {
    setSelectedTime(time); // Update the selected time in the state
  };

  const handleImageSelection = (imageURI) => {
    setSelectedImageURI(imageURI);
  };
  const handleSave = () => {
    // Perform save action
    // ...
    // After saving, close the modal
    const newPillData = {
      ...formData,
      name: formData.name,
      imageURI: selectedImageURI,
      time: selectedTime,
      type: formData.type,
      dose: formData.dose,
      note: formData.note,
    };
    onSave(newPillData);
    onCancel();
  };

  const handleCancel = () => {
    // Set the transformed state to false
    setTransformed(false);
    // Close the modal
    onCancel();
  };

  const handleDelete = () => {
    onDelete(item?.id);
    onCancel();
  };
  const transformModal = () => {
    // Toggle the transformed state
    setTransformed(!transformed);
  };

  return (
    <Modal visible={visible} onRequestClose={onCancel} transparent animationType="slide">
      {/* <View className="w-[96%] mx-2 h-[80%] justify-center items-center mt-12 bg-slate-400"> */}
      {visibleAlert && (
        <AlertCustom
          onOpen={visibleAlert}
          onClose={toggleAlert}
          icon={<ExclamationTriangleIcon size={30} color={"white"} />}
          color={color.danger}
          text={`Are you sure you want to delete "${item?.name}" ?`}
          action={handleDelete}
        />
      )}

      <View className="flex-1 justify-center items-center h-[100%]" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View className="flex-1 w-[100%]">
          <View
            className="flex-row justify-between items-center py-5 mt-12  "
            style={{ backgroundColor: color.main_color }}
          >
            <TouchableOpacity onPress={handleCancel}>
              <Text className="font-bold text-lg text-gray-700 ml-4">Cancel</Text>
            </TouchableOpacity>
            <Text className="text-center font-bold text-xl flex-1 text-white">{state} Medicine</Text>
            <TouchableOpacity onPress={handleSave}>
              <Text className="font-bold text-lg text-gray-700 mr-4">Save</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1 h-full w-full rounded-b-lg bg-white">
            <UploadImage onImageSelect={handleImageSelection} state={state} imageURI={item?.imageURI} />
            <View className="">
              <TextInput
                label={"Medicine Name"}
                left={<TextInput.Icon icon="file-document-outline" />}
                mode="outlined"
                className=" text-gray-700 rounded-lg mx-2"
                value={formData?.name}
                editable={state === "Edit" ? true : false}
                onChangeText={(value) => handleFormChange("name", value)}
                // onChangeText={(value) => handleFormChange("pillName", value)}
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
                  value={formData?.type}
                  data={local_data}
                  valueField="value"
                  labelField="label"
                  imageField="image"
                  placeholder="Select Type Medicine"
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
                  value={formData?.dose}
                  className=" text-gray-700 rounded-lg mx-2 mb-1"
                  left={<TextInput.Icon icon="medical-bag" />}
                  t
                  onChangeText={(value) => handleFormChange("dose", value)}
                />
              </View>
            </View>

            <View className="mx-2 py-2">
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "black" }]}
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
                value={formData?.note}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  handleFormChange("note", item.value);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <ClipboardDocumentIcon
                    style={styles.icon}
                    color={isFocus ? "black" : "black"}
                    name="Safety"
                    size={20}
                  />
                )}
              />
            </View>
            <View>
              <View className="flex-row justify-between items-center">
                <TimeComponentCustom onTimeChange={handleTimeChange} timeCurrent={item?.time} />
              </View>
            </View>
            <View className="flex-row justify-center items-center my-4">
              <TouchableOpacity onPress={toggleAlert} className="bg-red-500 flex-1 py-4 rounded-lg mx-2">
                <Text className="text-white font-bold text-center">Remove Medicine</Text>
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
    fontWeight: "bold",
  },
  selectedTextStyle: {
    fontSize: 20,
    marginLeft: 15,
    fontWeight: "bold",
  },
  selectedTextStyleDropDown: {
    fontSize: 20,
    fontWeight: "bold",
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
    fontWeight: "bold",
  },
});

export default EditPillModal;
