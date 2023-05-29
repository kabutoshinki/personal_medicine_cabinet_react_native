import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import UploadImage from "./UploadImage";
import TimeComponentCustom from "./TimeComponentCustom";
import SelectDropdown from "react-native-select-dropdown";

const options = ["Every day", "Every other day", "Before Meals", "After Meals"];

const EditPillModal = ({ visible, onCancel, onSave, item, state }) => {
  const [transformed, setTransformed] = useState(false);
  const [selectedTime, setSelectedTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [selectedImageURI, setSelectedImageURI] = useState("../../assets/icons/add_medicine.png");
  console.log(item);
  const [formData, setFormData] = useState({
    imageURI: selectedImageURI,
    time: item?.time,
    pillName: item?.pillName,
    quantity: item?.quantity,
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
    handleFormChange("time", time); // Update the formData.time value
  };
  const handleSave = () => {
    // Perform save action
    // ...
    // After saving, close the modal
    onCancel();
  };

  const handleCancel = () => {
    // Set the transformed state to false
    setTransformed(false);
    // Close the modal
    onCancel();
  };

  const transformModal = () => {
    // Toggle the transformed state
    setTransformed(!transformed);
  };

  return (
    <Modal visible={visible} onRequestClose={onCancel}>
      {/* <View className="w-[96%] mx-2 h-[80%] justify-center items-center mt-12 bg-slate-400"> */}
      <View className="flex-1 bg-gray-300">
        <View className="flex-row justify-between items-center mt-10">
          <Text className="text-center font-bold text-2xl flex-1 ml-6">{state} Pills</Text>
          <TouchableOpacity onPress={handleCancel}>
            <Text className="font-bold text-2xl text-gray-700 mr-4">X</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1 justify-center items-center   form ">
          <View className="justify-center items-center  w-[120px] h-[120px] border my-2 border-black rounded-2xl">
            <UploadImage state={state} />
          </View>
          <View className="flex-1  w-[96%]">
            <View className="">
              <Text className="text-gray-700 ml-4 font-bold mb-2">Pill Name:</Text>
              <TextInput
                placeholder="Medicine Name"
                className=" bg-gray-100 text-gray-700 rounded-lg p-3 mx-2  "
                value={item?.pillName}
                editable={state === "Edit" ? true : false}

                // onChangeText={(value) => handleFormChange("pillName", value)}
              />
            </View>
            <View className=" ">
              <Text className="text-gray-700 ml-4 font-bold my-2">Time:</Text>
              <TimeComponentCustom onTimeChange={handleTimeChange} state={state} timeCurrent={item?.time} />
            </View>
            <View className="flex-row my-2">
              <View className="flex-1">
                <Text className="text-gray-700 ml-4 font-bold  mb-2">Quantity:</Text>
                <TextInput
                  placeholder="Quantity"
                  className=" bg-gray-100 text-gray-700 rounded-lg p-3 mr-2 mx-2"
                  keyboardType="numeric"
                  value={item?.quantity}
                  editable={state === "Edit" ? true : false}

                  // onChangeText={(value) => handleFormChange("quantity", value)}
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-700 ml-4 font-bold  mb-2">Dose:</Text>
                <TextInput
                  placeholder="Dose"
                  className=" bg-gray-100 text-gray-700 rounded-lg p-3 mx-2"
                  keyboardType="numeric"
                  value={item?.dose}
                  editable={state === "Edit" ? true : false}

                  // onChangeText={(value) => handleFormChange("dose", value)}
                />
              </View>
            </View>
            <View className=" mb-2">
              <Text className="text-gray-700 ml-4 font-bold  mb-2">Note:</Text>
              {/* <TextInput
                placeholder="Note"
                className=" bg-gray-100 text-gray-700 rounded-lg p-3 mx-2"
                editable={state === "Edit" ? true : false}
                value={item?.note}
                // onChangeText={(value) => handleFormChange("note", value)}
              /> */}
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
                defaultButtonText={item?.note}
                disabled={state === "View" ? true : false}
              />
            </View>

            {state === "Edit" ? (
              <View className="flex-row justify-center items-center my-5">
                <TouchableOpacity onPress={handleCancel} className="bg-red-500 px-5 py-3 rounded-lg w-32 mr-2">
                  <Text className="text-white font-bold text-center">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave} className="bg-blue-500 px-5 py-3 rounded-lg w-32">
                  <Text className=" text-white font-bold text-center">Save</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="  justify-center items-center my-5">
                <TouchableOpacity
                  onPress={handleCancel}
                  className="bg-gray-500 px-5 py-3 rounded-lg justify-center items-center mx-auto w-[96%]"
                >
                  <Text className="text-center">Close</Text>
                </TouchableOpacity>
              </View>
            )}
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
export default EditPillModal;
