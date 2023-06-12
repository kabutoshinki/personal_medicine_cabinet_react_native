import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { XCircleIcon, XMarkIcon } from "react-native-heroicons/outline";
import color from "../utils/color";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimeComponentCustom_2 = ({ onTimeChange, state, timeCurrent }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [timeBoxes, setTimeBoxes] = useState([
    { id: 1, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) },
  ]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editTime, setEditTime] = useState({});
  const [editTimeVisible, setEditTimeVisible] = useState(false);

  const handlePopup = (timeBox) => {
    setEditTime(timeBox);
    setModalVisible(true);
    setSelectedTime(new Date());
    // Find the time box in the timeBoxes array
    const selectedTimeBox = timeBoxes.find((box) => box.id === timeBox.id);
    if (selectedTimeBox) {
      const { time } = selectedTimeBox;
      const [hours, minutes] = time.split(":");
      const selectedDate = new Date();
      selectedDate.setHours(hours);
      selectedDate.setMinutes(minutes);
      setSelectedTime(selectedDate);
    }
  };

  const handleDeleteTime = (timeBox) => {
    console.log(timeBox);
    const updatedTimeBoxes = timeBoxes.filter((box) => box.id !== timeBox.id);
    setTimeBoxes(updatedTimeBoxes);
    setModalVisible(false);
  };

  const handleEditTime = () => {
    setEditTimeVisible(true);
    setModalVisible(false);
  };

  const renderTimeBoxes = () => {
    return timeBoxes
      .sort((a, b) => (a.time > b.time ? 1 : -1))
      .map((timeBox) => (
        <View key={timeBox.id} className="flex-1 mx-2">
          <TouchableOpacity onPress={() => handlePopup(timeBox)} className="bg-gray-200 py-3 rounded-lg">
            <Text style={{ color: "black", fontSize: 14, fontWeight: "bold" }} className="text-center">
              {timeBox.time}
            </Text>
          </TouchableOpacity>
        </View>
      ));
  };

  const renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        className="bg-black"
      >
        <View className="flex-1 justify-center items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <View className="bg-white w-60 h-60 rounded-lg p-3">
            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg text-gray-700 text-center font-bold">Time Popup</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <XCircleIcon size={30} color={"#808080"} />
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-1 items-center justify-center border border-black rounded-lg">
              <Text className="font-bold text-2xl">{editTime?.time}</Text>
            </View>
            <View className="flex-1">
              <View style={{ flexDirection: "row", justifyContent: "center" }} className="space-x-6 items-center mt-5">
                <TouchableOpacity
                  style={{ backgroundColor: color.danger }}
                  onPress={() => handleDeleteTime(editTime)}
                  className="h-12 w-24 rounded-lg justify-center items-center"
                >
                  <Text className="text-white font-bold text-[16px]">Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleEditTime}
                  style={{ backgroundColor: color.warning }}
                  className="h-12 w-24 rounded-lg  justify-center items-center"
                >
                  <Text className="text-white font-bold text-[16px]">Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };
  const hideEditDatePicker = () => {
    setEditTimeVisible(false);
    setModalVisible(true);
  };

  const handleConfirm = (selectDate) => {
    const currentDate = selectDate || date;
    const selectedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    console.log(selectedTime);
    setTimeBoxes((prevTimeBoxes) => [...prevTimeBoxes, { id: prevTimeBoxes.length + 1, time: selectedTime }]);
    hideDatePicker();
  };
  const handleEditConfirm = (selectDate) => {
    const selectedTime = selectDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    const updatedTime = { ...editTime, time: selectedTime };
    const updatedTimeBoxes = timeBoxes.map((box) => {
      if (box.id === editTime.id) {
        return updatedTime;
      }
      return box;
    });
    setTimeBoxes(updatedTimeBoxes);
    setEditTimeVisible(false);
  };

  return (
    <View className="flex-1 my-2">
      <View className="flex-row items-center justify-between">
        <Text className="text-gray-700 ml-4 font-bold my-2 text-lg">Time</Text>
        {timeBoxes?.length < 4 ? (
          <TouchableOpacity onPress={showDatePicker}>
            <Text className="text-gray-700 mr-4 font-bold my-2 text-lg">Add Time</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 0 }} className="justify-center items-center mb-5">
        {renderTimeBoxes()}
      </View>
      {modalVisible && renderModal()}
      <View className="flex">
        {show && (
          <DateTimePickerModal
            isVisible={show}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            is24Hour={true}
            date={date}
          />
        )}
        {editTimeVisible && (
          <DateTimePickerModal
            isVisible={editTimeVisible}
            mode="time"
            onConfirm={handleEditConfirm}
            onCancel={hideEditDatePicker}
            is24Hour={true}
            date={selectedTime}
          />
        )}
      </View>
    </View>
  );
};

export default TimeComponentCustom_2;
