import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, Switch, useWindowDimensions, Animated, Platform } from "react-native";
import UploadImage from "./UploadImage";
import { TextInput } from "react-native-paper";
import EditPillModal from "./EditPillModal";
import ItemComponent from "./ItemComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import color from "../utils/color";
import { BellAlertIcon } from "react-native-heroicons/outline";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PeriodModal from "./PeriodModal";
import HiddenItem from "./HiddenItem";
import { SwipeListView } from "react-native-swipe-list-view";
import { ExclamationTriangleIcon, PlusIcon } from "react-native-heroicons/solid";
import AddMedicineModal from "./AddMedicineModal";
import AlertCustom from "./AlertCustom";

const MedicineModal = ({ visible, onCancel, onSave, item, state, onDelete }) => {
  const [statePill, setStatePill] = useState("");
  const [imageURI, setImageURI] = useState(null);
  const [prescription, setPrescription] = useState(null);
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

  const [formData, setFormData] = useState({
    ...item,
    imageURI: item?.imageURI,
    name: item?.name,
    startDate: item?.startDate,
    alarm: item?.alarm,
    period: item?.period,
    pill: item?.pill,
  });
  const toggleSwitch = (value) => {
    setIsEnabled((previousState) => !previousState);
    handleFormChange("alarm", value);
  };
  const [startDate, setStartDate] = useState(startDate);
  useState(() => {
    setPrescription(item);
    setListMedicine(item?.pill);
    setImageURI(item?.imageURI);
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
    // setStartDate(date);
    setIsDatePickerVisible(false);
  };

  const handleSaveMed = (form) => {
    setListMedicine((prevPills) => [...prevPills, form]);
    setAddMedVisible(false);
  };

  const handleSaveEditMed = (updatedItem) => {
    setListMedicine((prevPills) => prevPills.map((pill) => (pill.id === updatedItem.id ? updatedItem : pill)));

    setEditingPill(null);
    setModalVisible(false);
  };

  const handleImageSelection = (image) => {
    setImageURI(image);
    handleFormChange("imageURI", image);
  };

  const deletePill = (id) => {
    setListMedicine((prevPills) => {
      const updatedPills = prevPills.filter((pill) => pill.id !== id);
      return updatedPills;
    });
  };

  const optionPill = (item, state) => {
    setEditingPill(item);
    setModalVisible(true);
    setStatePill(state);
  };
  const openDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const closeDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const openPeriod = () => {
    setPeriodVisible(true);
  };
  const openAddMedVisible = () => {
    setAddMedVisible(true);
  };
  const closePeriodModal = () => {
    setPeriodVisible(false);
  };

  const handleSavePrescription = () => {
    const newPrescriptionData = {
      ...formData,
      imageURI: formData?.imageURI,
      name: formData?.name,
      period: formData?.period,
      startDate: formData?.startDate,
      alarm: formData?.alarm,
      pill: listMedicine,
    };
    console.log(newPrescriptionData);
    onSave(newPrescriptionData);
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

  const deleteRow = (rowKey) => {
    if (listMedicine) {
      const deletedMedicine = listMedicine.find((item) => item.key === rowKey);
      if (deletedMedicine) {
        const updatedMedicines = listMedicine.filter((item) => item.key !== rowKey);
        setListMedicine(updatedMedicines);
        handleFormChange("pill", updatedMedicines);
      }
    }
  };
  const renderItem = ({ item }) => <ItemComponent item={item} onDelete={deletePill} onOption={optionPill} />;
  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(115);
    const { item } = data;

    return (
      <HiddenItem
        item={item}
        rowMap={rowMap}
        onOption={optionPill}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        deleteRow={deleteRow}
      />
    );
  };

  const onRightActionStatusChange = () => {};
  const swipeGestureEnded = (rowKey, data) => {
    const rowHeightAnimatedValue = new Animated.Value(90);
    if (data.translateX < -220) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        deleteRow(rowKey);
      });
    }
  };
  const handleDeletePrescription = () => {
    onDelete(item?.id);
    onCancel();
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
          text={`Are you sure you want to delete "${item?.name}" ?`}
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
              <Text className="font-bold text-lg text-gray-700 ml-4">Cancel</Text>
            </TouchableOpacity>
            <Text className="text-center font-bold text-xl text-white flex-1">Edit Prescription</Text>
            <TouchableOpacity onPress={handleSavePrescription}>
              <Text className="font-bold text-lg text-gray-700 mr-4">Save</Text>
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
                  value={formData?.name}
                  onChangeText={(value) => handleFormChange("name", value)}
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
                    onCancel={closePeriodModal}
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
                  onCancel={closeDatePicker}
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

            <View className=" mb-4 justify-center items-center h-[312px]">
              <View className="flex-row w-full items-center justify-between">
                <View className="ml-4">
                  <Text className="text-gray-700 text-3xl font-bold  text-center">List Medicines</Text>
                </View>

                <TouchableOpacity
                  style={{ backgroundColor: color.success }}
                  className="mr-4 rounded-lg p-2 my-2"
                  onPress={openAddMedVisible}
                >
                  <PlusIcon size={30} color={"white"} />
                </TouchableOpacity>
              </View>

              <SwipeListView
                data={listMedicine}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                disableRightSwipe
                rightOpenValue={-150}
                stopRightSwipe={-300}
                rightActivationValue={-220}
                rightActionValue={-screenWidth}
                onRightActionStatusChange={onRightActionStatusChange}
                swipeGestureEnded={swipeGestureEnded}
                swipeToOpenPercent={10}
                swipeToClosePercent={10}
                useNativeDriver={false}
              />
            </View>

            <View className="flex-row justify-center items-center">
              <TouchableOpacity onPress={toggleAlert} className="bg-red-500 flex-1 py-4 rounded-lg mx-2">
                <Text className="text-white font-bold text-center">Remove Prescription</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {addMedVisible && (
        <AddMedicineModal onOpen={addMedVisible} onCancel={() => setAddMedVisible(false)} onSave={handleSaveMed} />
      )}
      {modalVisible && (
        <EditPillModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          item={editingPill}
          state={statePill}
          onSave={handleSaveEditMed}
          onDelete={deletePill}
        />
      )}
    </Modal>
  );
};

export default MedicineModal;
