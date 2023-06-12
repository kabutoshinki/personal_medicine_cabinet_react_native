import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import React, { useState } from "react";
import { CalendarDaysIcon } from "react-native-heroicons/outline";
import { Dropdown } from "react-native-element-dropdown";
import { TextInput } from "react-native-paper";
import color from "../utils/color";
import { ArrowLeftIcon, CheckIcon } from "react-native-heroicons/solid";
const options = [
  {
    label: "DAY",
    value: "DAY",
  },
  {
    label: "WEEK",
    value: "WEEK",
  },
  {
    label: "MONTH",
    value: "MONTH",
  },
  {
    label: "YEAR",
    value: "YEAR",
  },
];

const PeriodModal = ({ visible, onCancel, onSave, initData }) => {
  const [formPeriod, setFormPeriod] = useState(initData);
  const [isFocus, setIsFocus] = useState(false);
  const handleFormPeriodChange = (field, value) => {
    setFormPeriod((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="w-full h-[1000px] items-center justify-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
        <View
          className="flex-row justify-between items-center w-[90%] py-5 rounded-t-lg mt-32"
          style={{ backgroundColor: color.main_color }}
        >
          <TouchableOpacity onPress={onCancel} className="ml-4">
            <ArrowLeftIcon size={30} color={"white"} />
          </TouchableOpacity>
          <Text className="text-center font-bold text-xl flex-1 text-white">Period</Text>
          <TouchableOpacity onPress={() => onSave(formPeriod)} className="mr-4">
            <CheckIcon size={30} color={"white"} />
          </TouchableOpacity>
        </View>
        <View className="flex-[0.9] form  w-[90%]">
          <View className="flex-[0.15] w-full bg-white rounded-b-lg">
            <View className="flex-row">
              <View className="flex-row flex-1 m-2 rounded-lg">
                <TextInput
                  label={"Number Date"}
                  keyboardType="numeric"
                  className="h-[50px] w-full my-2"
                  value={formPeriod?.numberDate}
                  maxLength={3}
                  minLength={1}
                  onChangeText={(value) => handleFormPeriodChange("numberDate", value)}
                />
              </View>
              <View className="flex-row flex-1 justify-between items-center  m-2 rounded-lg">
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
                  value={formPeriod?.typeDate}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    handleFormPeriodChange("typeDate", item.value);
                    setIsFocus(false);
                  }}
                  renderLeftIcon={() => (
                    <CalendarDaysIcon style={styles.icon} color={isFocus ? "black" : "black"} name="Safety" size={20} />
                  )}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
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
    flex: 1,
  },
  icon: {
    marginRight: 15,
    marginLeft: 15,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: "bold",
  },
  placeholderStyle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 15,
  },
  selectedTextStyleDropDown: {
    fontSize: 16,
    fontWeight: "bold",
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default PeriodModal;
