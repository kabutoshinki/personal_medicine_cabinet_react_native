import React, { useContext, useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, Switch, useWindowDimensions, Animated, Platform } from "react-native";
import UploadImage from "./UploadImage";
import { TextInput } from "react-native-paper";
import color from "../utils/color";
import { BellAlertIcon } from "react-native-heroicons/outline";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PeriodModal from "./PeriodModal";
import { ArrowLeftIcon, CheckIcon, ExclamationTriangleIcon, PlusIcon } from "react-native-heroicons/solid";
import AddMedicineModal from "./AddMedicineModal";
import AlertCustom from "./AlertCustom";
import * as prescriptionService from "../service/prescriptionService";
import * as prescriptionDetailService from "../service/prescriptionDetailService";
import uuid from "react-native-uuid";
import { changeDateFormat } from "../utils/dataHandle";
import PrescriptionMedicineList from "./PrescriptionMedicineList";
import { AppContext } from "../context/AppContext";

const MedicineModal = ({ visible, onCancel, onDelete, item, onSave }) => {
  const [statePill, setStatePill] = useState("");
  const [imageURI, setImageURI] = useState(null);
  const [prescription, setPrescription] = useState(item);
  const [listMedicine, setListMedicine] = useState([]);
  const [isEnabled, setIsEnabled] = useState(item?.alarm);
  const [editingPill, setEditingPill] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [periodVisible, setPeriodVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const { width: screenWidth } = useWindowDimensions();
  const [addMedVisible, setAddMedVisible] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const toggleAlert = React.useCallback(() => {
    setVisibleAlert(!visibleAlert);
  }, [visibleAlert]);
  const { stateChange, setStateChange } = useContext(AppContext);

  const getStartDate = item?.startDate; // "2023-06-19"
  const dateParts = getStartDate.split("-"); // ["2023", "06", "19"]
  const modifiedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // "19/06/2023"

  const [formData, setFormData] = useState({
    ...item,
    imageURI: item?.image,
    regimenName: item?.regimenName,
    startDate: modifiedDate,
    alarm: item?.alarm,
    period: item?.dosageRegimen + " " + item?.period,
  });

  const [startDate, setStartDate] = useState(new Date(getStartDate));
  const toggleSwitch = (value) => {
    setIsEnabled((previousState) => !previousState);
    handleFormChange("alarm", value);
  };

  useEffect(() => {
    setImageURI(item?.image);
  }, []);

  const [numberDate, typeDate] = formData?.period.split(" ");
  const [formPeriod, setFormPeriod] = useState({
    numberDate: numberDate,
    typeDate: typeDate,
  });
  const handleFormChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleDateChange = (date) => {
    handleFormChange("startDate", date.toLocaleDateString("en-GB"));
    setStartDate(date);

    setIsDatePickerVisible(false);
  };

  const handleImageSelection = (image) => {
    setImageURI(image);
    handleFormChange("imageURI", image);
  };

  const openDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const openPeriod = () => {
    setPeriodVisible(true);
  };

  const handleSavePrescription = async () => {
    const [numberDate, typeDate] = formData?.period.split(" ");
    const newPrescriptionData = {
      ...item,
      regimenId: item?.regimenId,
      image: formData?.imageURI,
      regimenName: formData?.regimenName,
      period: typeDate,
      startDate: changeDateFormat(formData?.startDate),
      alarm: formData?.alarm,
      dosageRegimen: numberDate,
      totalTypeMedicine: formData?.totalTypeMedicine,
    };
    // console.log(newPrescriptionData);
    setStateChange((pre) => !pre);
    onSave(newPrescriptionData);
    try {
      await prescriptionService.editRegimen(newPrescriptionData);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };
  const onSavePeriod = (form) => {
    setFormPeriod(form);
    setPeriodVisible(false);

    const periodValue = form.numberDate + " " + form.typeDate;
    setFormData((prevFormData) => ({
      ...prevFormData,
      period: periodValue,
    }));
  };

  const handleDeletePrescription = async () => {
    try {
      await prescriptionService.deleteRegimen(item?.regimenId);
      onDelete(item?.regimenId);
      onCancel();
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  return (
    <Modal visible={visible} onRequestClose={onCancel}>
      {/* <View className="w-[96%] mx-2 h-[80%] justify-center items-center mt-12 bg-slate-400"> */}
      {visibleAlert && (
        <AlertCustom
          onOpen={visibleAlert}
          onClose={toggleAlert}
          icon={<ExclamationTriangleIcon size={30} color={"white"} />}
          color={color.danger}
          text={`Are you sure you want to delete "${item?.regimenName}" ?`}
          action={handleDeletePrescription}
        />
      )}
      <View className="flex-1 justify-center items-center bg-black">
        <View className="flex-1 w-[100%]">
          <View
            className="flex-row justify-between items-center py-2"
            style={{
              backgroundColor: color.main_color,
              paddingTop: Platform.OS === "android" ? 14 : 70,
              paddingBottom: Platform.OS === "android" ? 10 : 20,
            }}
          >
            <TouchableOpacity onPress={onCancel}>
              <View className="ml-4">
                <ArrowLeftIcon size={30} color={"white"} />
              </View>
            </TouchableOpacity>
            <Text className="text-center font-bold text-xl text-white flex-1">Edit Prescription</Text>
            <TouchableOpacity onPress={handleSavePrescription}>
              <View className="mr-4">
                <CheckIcon size={30} color={"white"} />
              </View>
            </TouchableOpacity>
          </View>

          <View className="flex-1  h-full w-full  bg-white">
            <UploadImage onImageSelect={handleImageSelection} imageURI={imageURI} />
            <View className="flex-row ">
              <View className="flex-1 mx-1">
                <TextInput
                  placeholder={"Name"}
                  left={<TextInput.Icon icon="file-document-outline" />}
                  mode="outlined"
                  className=" text-gray-700 text-sm rounded-lg justify-center p-1"
                  value={formData?.regimenName}
                  onChangeText={(value) => handleFormChange("regimenName", value)}
                  maxLength={15}
                />
              </View>
              <View className=" flex-row flex-1  justify-between items-center  mx-1 my-1 rounded-lg border-2 border-gray-300">
                <TextInput
                  placeholder="Period"
                  className="bg-white  rounded-lg text-sm border-b-0 font-bold flex-1"
                  underlineColor="transparent"
                  editable={false}
                  value={formData?.period}
                  left={<TextInput.Icon icon="calendar-clock-outline" />}
                  right={<TextInput.Icon icon="pencil-outline" onPress={openPeriod} />}
                />

                {periodVisible && (
                  <PeriodModal
                    visible={periodVisible}
                    onCancel={() => setPeriodVisible(false)}
                    initData={formPeriod}
                    onSave={onSavePeriod}
                  />
                )}
              </View>
            </View>
            <View className="flex-row">
              <View className="flex-1 flex-row justify-between items-center  mx-1 my-2 rounded-lg border-2 border-gray-300">
                <TextInput
                  value={formData?.startDate}
                  className=" text-gray-700 text-sm rounded-lg text-center bg-white flex-1 font-bold"
                  editable={false}
                  underlineColor="transparent"
                  left={<TextInput.Icon icon="calendar-start" />}
                  right={<TextInput.Icon icon="pencil-outline" onPress={openDatePicker} />}
                />
              </View>

              {isDatePickerVisible && (
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleDateChange}
                  onCancel={() => setIsDatePickerVisible(false)}
                  date={startDate}
                />
              )}

              <View className="flex-1 flex-row justify-between items-center  mx-1 my-2 rounded-lg border-2 border-gray-300">
                <View className="ml-4">
                  <BellAlertIcon size={30} color={"black"} />
                </View>
                <Switch
                  trackColor={{ false: "gray", true: "#34C724" }}
                  value={isEnabled}
                  thumbColor={isEnabled ? "white" : "white"}
                  onValueChange={(value) => toggleSwitch(value)}
                  className="mr-5"
                  style={{ transform: [{ scale: 1.5 }] }}
                />
              </View>
            </View>

            <PrescriptionMedicineList item={item} />
            <View className="flex-row justify-center items-center mb-2">
              <TouchableOpacity onPress={toggleAlert} className="bg-red-500 flex-1 py-4 rounded-lg mx-2">
                <Text className="text-white font-bold text-center">Remove Prescription</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MedicineModal;
