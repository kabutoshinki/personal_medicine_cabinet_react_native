import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, Platform } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import color from "../utils/color";
import { SelectCountry, Dropdown } from "react-native-element-dropdown";
import { options, local_data } from "../../fakedata";
import { ArrowLeftIcon, CheckIcon, PlusIcon } from "react-native-heroicons/solid";
import UploadImage from "./UploadImage";
import TimeComponentCustom from "./TimeComponentCustom";
import { ClipboardDocumentIcon } from "react-native-heroicons/outline";
import uuid from "react-native-uuid";
const MedicineDetailModal = ({ onOpen, onCancel, item, onSave }) => {
  return (
    <Modal visible={onOpen} onRequestClose={onCancel} transparent animationType="slide">
      {/* <View className="w-[96%] mx-2 h-[80%] justify-center items-center mt-12 bg-slate-400"> */}
      <View
        className={`${Platform.OS === "ios" ? "h-[1100px]" : "h-[1000px]"} justify-center items-center`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <View
          className={`flex-row justify-between items-center w-[90%] py-5 rounded-t-lg ${
            Platform.OS === "ios" ? "mt-20" : ""
          }`}
          style={{ backgroundColor: color.main_color }}
        >
          <TouchableOpacity onPress={onCancel} className="ml-4">
            <ArrowLeftIcon size={30} color={"white"} />
          </TouchableOpacity>
          <Text className="text-center font-bold text-xl flex-1  text-white">{item?.name}</Text>
          <TouchableOpacity onPress={() => onSave(item)} className="mr-4">
            <PlusIcon size={30} color={"white"} />
          </TouchableOpacity>
        </View>
        <View className="flex-[0.9] w-[90%]">
          <View className="flex-[0.7] w-full bg-white rounded-b-lg">
            <View pointerEvents="none">
              <UploadImage imageURI={item?.image} />
            </View>
            <View className="mx-2">
              <Text className="font-bold text-lg">Description:</Text>
              <View className="bg-gray-300 p-3 rounded-md">
                <ScrollView style={{ height: 110 }} contentContainerStyle={{ flexGrow: 1 }}>
                  <Text className="font-bold text-[16px]">{item?.description}</Text>
                </ScrollView>
              </View>
              {/* <TextInput value={item?.description} multiline={true} className="bg-gray-200" /> */}
            </View>

            <View className="mx-2   " pointerEvents="none">
              <Text className="font-bold text-lg">Type:</Text>
              <SelectCountry
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                imageStyle={styles.imageStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                maxHeight={200}
                value={item?.type}
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

            <View className="  mx-2">
              <Text className="font-bold text-lg">Side Effect: (if have)</Text>
              <View className="bg-gray-300 p-3 rounded-md ">
                <ScrollView style={{ height: 60 }} contentContainerStyle={{ flexGrow: 1 }}>
                  <Text className="font-bold text-[16px]">{item?.sideEffect}</Text>
                </ScrollView>
              </View>
              {/* <TextInput value={item?.description} multiline={true} className="bg-gray-200" /> */}
            </View>
          </View>
        </View>
      </View>
    </Modal>
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
    marginLeft: 120,
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

export default MedicineDetailModal;
