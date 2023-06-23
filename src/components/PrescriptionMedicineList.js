import { View, Text, useWindowDimensions, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import ItemComponentApi from "./ItemComponentApi";
import HiddenItem from "./HiddenItem";
import color from "../utils/color";
import * as prescriptionDetailService from "../service/prescriptionDetailService";
import uuid from "react-native-uuid";
import { PlusIcon } from "react-native-heroicons/solid";
import { SwipeListView } from "react-native-swipe-list-view";
import AddMedicineModal from "./AddMedicineModal";
import EditPillModal from "./EditPillModal";
const PrescriptionMedicineList = ({ item }) => {
  const [listMedicine, setListMedicine] = useState([]);
  const [editMedicine, setEditMedicine] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { width: screenWidth } = useWindowDimensions();
  const [addMedVisible, setAddMedVisible] = useState(false);
  const PrescriptionItems = async () => {
    const { data } = await prescriptionDetailService.getRegimenDetailsList(item?.regimenId);
    const updatedMedicines = data.map((item) => ({ ...item, key: uuid.v4(), alarm: true }));
    setListMedicine(updatedMedicines);
  };
  useEffect(() => {
    PrescriptionItems();
  }, []);
  const handleSaveMed = (form) => {
    setListMedicine((prevPills) => [...prevPills, form]);
    setAddMedVisible(false);
  };
  const openAddMedVisible = () => {
    setAddMedVisible(true);
  };
  const handleSaveEditMed = (updatedItem) => {
    setListMedicine((prevPills) => prevPills.map((pill) => (pill.id === updatedItem.id ? updatedItem : pill)));

    setEditMedicine(null);
    setModalVisible(false);
  };
  const deletePill = (id) => {
    setListMedicine((prevPills) => {
      const updatedPills = prevPills.filter((pill) => pill.id !== id);
      return updatedPills;
    });
  };
  const optionPill = (item) => {
    setEditMedicine(item);
    setModalVisible(true);
  };

  const handleSaveMedicine = (updatedItem) => {
    setListMedicine((prevMedicines) => {
      const updatedMedicines = prevMedicines.map((medicine) =>
        medicine.regimenDetailId === updatedItem.regimenDetailId ? updatedItem : medicine
      );
      return updatedMedicines;
    });
    setEditMedicine(updatedItem);
    setModalVisible(false);
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

  const renderItem = ({ item }) => <ItemComponentApi item={item} onDelete={deletePill} onOption={optionPill} />;
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

  return (
    <View className=" mb-4 justify-center items-center h-[300px]">
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

      {addMedVisible && (
        <AddMedicineModal onOpen={addMedVisible} onCancel={() => setAddMedVisible(false)} onSave={handleSaveMed} />
      )}
      {modalVisible && (
        <EditPillModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          item={editMedicine}
          onSave={handleSaveMedicine}
        />
      )}
    </View>
  );
};

export default PrescriptionMedicineList;
