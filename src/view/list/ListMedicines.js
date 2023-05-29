import { View, Text, TouchableOpacity, Image, useWindowDimensions, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import MedicineModal from "../../components/MedicineModal";
import { useNavigation } from "@react-navigation/native";
import { medicineTimeData } from "../../../fakedata";
import { SwipeListView } from "react-native-swipe-list-view";
import HiddenItem from "../../components/HiddenItem";

const Item = ({ item, onOption, rowHeightAnimatedValue, removeRow, leftActionState, rightActionState }) => {
  if (rightActionState) {
    Animated.timing(rowHeightAnimatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      // console.log(item?.key);
      removeRow(item?.key);
    });
  }
  return (
    <Animated.View className="w-[400px]">
      <Card className="flex-auto m-1">
        <TouchableOpacity onPress={() => onOption(item, "Edit")}>
          <View className="flex-row justify-between items-center  border-b border-gray-400 bp-2">
            <Text className="text-lg text-center font-bold flex-1">{item.medicineName}</Text>
          </View>
          <Card.Content className=" ">
            <View className="flex-row justify-center items-center">
              <Image source={require("../../../assets/icons/add_medicine.png")} className="w-16 h-16 mr-4" />
              <View className="flex-1">
                <Text className="font-bold text-lg text-gray-600">Pill(s): {item?.pill?.length}</Text>
                <Text className="font-bold text-lg text-gray-600">Duration: 2 week</Text>
              </View>
              {/* <View>
                <TouchableOpacity onPress={() => onOption(item, "Edit")}>
                  <PencilSquareIcon size={25} color="#29C5F6" />
                </TouchableOpacity>
              </View> */}
            </View>
          </Card.Content>
        </TouchableOpacity>
      </Card>
    </Animated.View>
  );
};

const ListMedicines = ({ medicineData }) => {
  console.log("Medicine");
  const [editMedicine, setEditMedicine] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [stateMedicine, setStateMedicine] = useState("");
  const [medicines, setMedicines] = useState(medicineTimeData);
  const navigation = useNavigation();
  const { width: screenWidth } = useWindowDimensions();
  useEffect(() => {
    if (medicineData) {
      setMedicines((prev) => [...prev, medicineData]); // Update 'medicine' state when 'medicines' prop changes
    }
  }, [medicineData]);

  const onPressHandler = () => {
    navigation.navigate("PillReminder");
  };

  const optionMedicine = (item, state) => {
    setEditMedicine(item);
    setModalVisible(true);
    setStateMedicine(state);
  };
  const handleSave = (updatedItem) => {
    setPills((prevPills) => prevPills.map((pill) => (pill.id === updatedItem.id ? updatedItem : pill)));
    setEditingPill(null);
    setModalVisible(false);
  };

  const closeRow = (rowMap, rowKey) => {};
  const deleteRow = (rowKey) => {
    if (medicines) {
      const deletedMedicine = medicines.find((item) => item.key === rowKey);
      if (deletedMedicine) {
        const updatedMedicines = medicines.filter((item) => item.key !== rowKey);
        setMedicines(updatedMedicines);
      }
    }
  };
  const renderItem = ({ item }) => {
    const rowHeightAnimatedValue = new Animated.Value(90);
    return (
      <Item
        item={item}
        removeRow={deleteRow}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onOption={optionMedicine}
      />
    );
  };
  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(90);
    const { item } = data;
    return (
      <HiddenItem
        item={item}
        rowMap={rowMap}
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
  return (
    <View>
      {medicines?.length > 0 ? (
        <View className="mt-1 justify-center items-center h-[600px]">
          <Text className="text-xl font-bold text-center mb-3">List Medicines</Text>
          <SwipeListView
            data={medicines}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            disableRightSwipe
            rightOpenValue={-150}
            stopRightSwipe={-300}
            rightActivationValue={-200}
            rightActionValue={-screenWidth}
            onRightActionStatusChange={onRightActionStatusChange}
            swipeGestureEnded={swipeGestureEnded}
            swipeToOpenPercent={10}
            swipeToClosePercent={10}
            useNativeDriver={false}
          />
        </View>
      ) : (
        <View className="flex my-4 justify-center items-center mt-24">
          <View className="">
            <Image source={require("../../../assets/images/medicine.gif")} className="w-56 h-56 rounded-lg" />
          </View>
          <View className="mt-5 mx-12">
            <Text className="font-bold text-center text-xl mb-3">Welcome to PMC</Text>
            <Text className="text-center text-base mb-3">
              Add new medication, to help us manage your medicine cabinet.
            </Text>
          </View>
          <View className="items-center justify-center">
            <TouchableOpacity className="bg-[#4D9FEC] rounded-xl px-12 py-5" onPress={onPressHandler}>
              <Text className="text-2xl text-center items-center justify-center text-white">Add new medicine</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {modalVisible && (
        <MedicineModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          item={editMedicine}
          state={stateMedicine}
          onSave={handleSave}
        />
      )}
    </View>
  );
};

export default ListMedicines;
