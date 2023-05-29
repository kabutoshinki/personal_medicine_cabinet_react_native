import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import UploadImage from "./UploadImage";
import { Card } from "react-native-paper";
import { XCircleIcon, PencilSquareIcon, EyeIcon } from "react-native-heroicons/solid";
import EditPillModal from "./EditPillModal";
import ItemComponent from "./ItemComponent";
import SelectDropdown from "react-native-select-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";

const options = ["LOW", "NORMAL", "HIGH"];

const Item = ({ item, onDelete, onOption }) => (
  <View className="w-[400px]">
    <Card className="flex-auto m-1">
      <View className="flex-row justify-between items-center  border-b border-gray-600 bp-2">
        <Text className="text-lg text-center font-bold flex-1 ml-12">{item.pillName}</Text>
        <TouchableOpacity className=" mr-5" onPress={() => onDelete(item.id)}>
          <XCircleIcon size={25} color="red" />
        </TouchableOpacity>
      </View>
      <Card.Content className=" ">
        <View className="flex-row justify-center items-center">
          <Image source={require("../../assets/icons/add_medicine.png")} />
          <View className="flex-1">
            <Text style={{ fontSize: 16 }}>Quantity: {item.quantity}</Text>
            <Text style={{ fontSize: 16 }}>Dose: {item.dose}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => onOption(item, "Edit")}>
              <PencilSquareIcon size={25} color="#29C5F6" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="">
          <TouchableOpacity className="flex-row justify-center items-center " onPress={() => onOption(item, "View")}>
            <EyeIcon size={25} color="#29C5F6" />
            <Text className="ml-1 font-bold">View Detail</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  </View>
);
const MedicineModal = ({ visible, onCancel, onSave, item, state }) => {
  console.log("editModal");
  const [transformed, setTransformed] = useState(false);
  const [listPills, setListPills] = useState(null);
  const [editingPill, setEditingPill] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [statePill, setStatePill] = useState("");

  useState(() => {
    setListPills(item?.pill);
  }, []);

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

  const deletePill = (id) => {
    setListPills((prevPills) => {
      const updatedPills = prevPills.filter((pill) => pill.id !== id);
      return updatedPills;
    });
  };

  const optionPill = (item, state) => {
    setEditingPill(item);
    setModalVisible(true);
    setStatePill(state);
  };
  const renderItem = ({ item }) => <ItemComponent item={item} onDelete={deletePill} onOption={optionPill} />;
  return (
    <SafeAreaView>
      <Modal visible={visible} onRequestClose={onCancel}>
        {/* <View className="w-[96%] mx-2 h-[80%] justify-center items-center mt-12 bg-slate-400"> */}
        <View className="flex-1 mt-16">
          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-center font-bold text-2xl flex-1 ml-6">{state} Medicine</Text>
            <TouchableOpacity onPress={handleCancel}>
              <Text className="font-bold text-2xl text-gray-700 mr-4">X</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1 justify-center items-center  form ">
            <View className="flex-1  justify-center items-center w-[98%] ">
              <View className="justify-center items-center  w-[120px] h-[120px] border border-black rounded-2xl">
                <UploadImage />
              </View>
              <View className="w-[98%]">
                <Text className="text-gray-700 ml-4 font-bold mb-2">Medicine Name:</Text>
                <TextInput
                  placeholder="Medicine Name"
                  className=" bg-gray-100 text-gray-700 rounded-lg p-3 mx-2  "
                  value={item?.medicineName}
                  editable={state === "Edit" ? true : false}

                  // onChangeText={(value) => handleFormChange("pillName", value)}
                />
              </View>

              <View className="my-2">
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
                  defaultButtonText={item?.priority}
                  disabled={state === "View" ? true : false}
                />
              </View>
              <View className=" mb-2 justify-center items-center">
                <Text className="text-gray-700 text-3xl font-bold  mb-2 text-center">List Pills</Text>
                <FlatList
                  data={item?.pill}
                  keyExtractor={(item) => item.id}
                  renderItem={renderItem}
                  className="max-h-[250px]"
                  contentContainerStyle={{ flexGrow: 1 }}
                ></FlatList>
              </View>

              {state === "Edit" ? (
                <View className="flex-row justify-center items-center my-2">
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
        <EditPillModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          item={editingPill}
          state={statePill}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    width: "96%",
    height: 40,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "center" },
});

export default MedicineModal;
