import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import UploadImage from "./UploadImage";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { PencilIcon } from "react-native-heroicons/outline";
import color from "../utils/color";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PeriodModal from "./PeriodModal";
import { ArrowLeftIcon, CheckIcon } from "react-native-heroicons/solid";
import { Platform } from "react-native-web";
import AsyncStorage from "@react-native-async-storage/async-storage";
const FinishModal = ({ visible, onCancel, pill }) => {
  const navigation = useNavigation();
  const [startNow, setStartNow] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedImageURI, setSelectedImageURI] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [scrollVisible, setScrollVisible] = useState(false);
  const [formPeriod, setFormPeriod] = useState({
    numberDate: "1",
    typeDate: "DAY",
  });

  const [formData, setFormData] = useState({
    imageURI: selectedImageURI,
    name: "",
    pill: pill,
    period: formPeriod?.numberDate + " " + formPeriod?.typeDate,
    startNow: startNow,
    startDate: startNow ? new Date().toLocaleDateString("en-GB") : startDate.toLocaleDateString("en-GB"),
    alarm: true,
    deviceToken: "",
  });

  //change state switch
  const toggleSwitch = (value) => {
    setStartNow((previousState) => !previousState);
    handleFormChange("startNow", value);
  };

  // change image select
  const handleImageSelection = (imageURI) => {
    setSelectedImageURI(imageURI);
  };

  // change properties form data
  const handleFormChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const onSavePeriod = (form) => {
    setFormPeriod(form);
    setScrollVisible(false);

    const periodValue = form.numberDate + " " + form.typeDate;
    setFormData((prevFormData) => ({
      ...prevFormData,
      period: periodValue,
    }));
  };

  // open modal date
  const openDatePicker = () => {
    setIsDatePickerVisible(true);
  };
  const openScrollPicker = () => {
    setScrollVisible(true);
  };

  //save data
  const handleSave = async () => {
    const newMedicine = {
      ...formData,
      imageURI: selectedImageURI,
      startDate: startNow ? new Date().toLocaleDateString("en-GB") : startDate.toLocaleDateString("en-GB"),
      deviceToken: await AsyncStorage.getItem("deviceToken"),
      id: uuid.v4(),
      key: uuid.v4(),
    };
    // console.log(newMedicine);
    navigation.navigate("Home Page", { medicineData: newMedicine });
  };

  const handleDateChange = (date) => {
    handleFormChange("startDate", date.toLocaleDateString("en-GB"));
    setStartDate(date);
    setIsDatePickerVisible(false);
  };
  // close modal
  const closeDatePicker = () => {
    setIsDatePickerVisible(false);
  };
  const closeScrollPicker = () => {
    setScrollVisible(false);
  };

  return (
    <Modal visible={visible} onRequestClose={onCancel} transparent animationType="slide">
      {/* <View className="w-[96%] mx-2 h-[80%] justify-center items-center mt-12 bg-slate-400"> */}
      <View className="h-[1000px]  justify-center items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View
          className={`flex-row justify-between items-center w-[90%] py-5 rounded-t-lg  ${
            Platform.OS === "ios" ? "mt-24" : "mt-5"
          }`}
          style={{ backgroundColor: color.main_color }}
        >
          <TouchableOpacity onPress={onCancel} className="ml-4">
            <ArrowLeftIcon size={30} color={"white"} />
          </TouchableOpacity>
          <Text className="text-center font-bold text-xl flex-1 text-white">Prescription</Text>
          <TouchableOpacity onPress={handleSave} className="mr-4">
            <CheckIcon size={30} color={"white"} />
          </TouchableOpacity>
        </View>
        <View className="flex-[0.9]   form  w-[90%]">
          <View className="flex-[0.6] w-full bg-white rounded-b-lg">
            <UploadImage onImageSelect={handleImageSelection} />
            <View className="my-4">
              <TextInput
                label={"Prescription Name"}
                left={<TextInput.Icon icon="file-document-outline" />}
                mode="outlined"
                className=" text-gray-700 bg-white rounded-lg mx-2"
                value={formData?.name}
                onChangeText={(value) => handleFormChange("name", value)}
              />
            </View>
            <View className=" flex-row  justify-between items-center  mx-2 my-1 rounded-lg border-2 border-gray-300">
              <TextInput
                placeholder="Start Now"
                className="bg-white w-28 rounded-lg border-b-0"
                underlineColor="transparent"
                editable={false}
              />
              <Switch
                trackColor={{ false: "gray", true: "#34C724" }}
                value={startNow}
                thumbColor={startNow ? "white" : "white"}
                onValueChange={(value) => toggleSwitch(value)}
                className="mr-5"
                style={{ transform: [{ scale: 1.5 }] }}
              />
            </View>

            <View
              className="flex-row justify-between items-center  m-2 rounded-lg border-2 border-gray-300"
              pointerEvents={startNow ? "none" : "auto"}
            >
              <TextInput
                value={formData?.startDate}
                className=" text-gray-700 rounded-lg flex-1 text-center"
                editable={false}
                style={{ backgroundColor: startNow ? "#cccccc" : "white" }}
                underlineColor="transparent"
                left={<TextInput.Icon icon="calendar-start" />}
                right={<TextInput.Icon icon="pencil-outline" onPress={openDatePicker} />}
              />

              {isDatePickerVisible && (
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleDateChange}
                  onCancel={closeDatePicker}
                  date={startDate}
                />
              )}
            </View>

            <View className=" flex-row  justify-between items-center  mx-2 my-1 rounded-lg border-2 border-gray-300">
              <TextInput
                placeholder="Period"
                className="bg-gray-200 w-28 rounded-sm border-b-0"
                underlineColor="transparent"
                editable={false}
              />

              <TextInput
                value={formData?.period}
                className="rounded-lg text-lg border-b-0 bg-white flex-1 text-center"
                underlineColor="transparent"
                editable={false}
                pointerEvents="none"
              />

              <TouchableOpacity className="mr-4" onPress={openScrollPicker}>
                <PencilIcon size={25} color={"black"} />
              </TouchableOpacity>
              {scrollVisible && (
                <PeriodModal
                  visible={scrollVisible}
                  onCancel={closeScrollPicker}
                  initData={formPeriod}
                  onSave={onSavePeriod}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FinishModal;
