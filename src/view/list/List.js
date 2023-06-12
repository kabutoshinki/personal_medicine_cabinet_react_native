import { View, Text, FlatList, TouchableOpacity, Animated, useWindowDimensions, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import fakedata from "../../../fakedata";
import EditPillModal from "../../components/EditPillModal";
import Header from "../../components/Header";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import ItemComponent from "../../components/ItemComponent";
import FinishModal from "../../components/FinishModal";
import { SwipeListView } from "react-native-swipe-list-view";
import HiddenItem from "../../components/HiddenItem";
const List = ({ listPills, setPage, updateListPills }) => {
  const [pills, setPills] = useState(listPills);
  const [editingPill, setEditingPill] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [statePill, setStatePill] = useState("");
  const [finishVisible, setFinishVisible] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    updateListPills(pills);
  }, [pills]);
  const { width: screenWidth } = useWindowDimensions();
  const renderItem = ({ item }) => {
    return <ItemComponent item={item} onDelete={deletePill} onOption={optionPill} />;
  };

  const deletePill = (id) => {
    setPills((prevPills) => {
      const updatedPills = prevPills.filter((pill) => pill.id !== id);
      return updatedPills;
    });
  };

  const optionPill = (item, state) => {
    setEditingPill(item);
    setModalVisible(true);
    setStatePill(state);
  };
  const deleteRow = (rowKey) => {
    if (pills) {
      const deletedMedicine = pills.find((item) => item.key === rowKey);
      if (deletedMedicine) {
        const updatedMedicines = pills.filter((item) => item.key !== rowKey);
        setPills(updatedMedicines);
      }
    }
  };
  const handleSave = (updatedItem) => {
    setPills((prevPills) => prevPills.map((pill) => (pill.id === updatedItem.id ? updatedItem : pill)));
    console.log("edit");
    console.log(pills);
    setEditingPill(null);
    setModalVisible(false);
  };

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

  return (
    <View className="flex-1 w-[96%]">
      <View className="justify-center items-center w-full h-[55%]">
        <View className="">
          <Text className=" text-xl font-bold text-center">List Medicines</Text>
        </View>
        {modalVisible && (
          <EditPillModal
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            item={editingPill}
            state={statePill}
            onSave={handleSave}
            onDelete={deletePill}
          />
        )}
        {pills.length === 0 ? (
          <View className=" w-[96%] flex-1 justify-center items-center">
            <Image source={require("../../../assets/images/pill.gif")} className="w-60 h-60" />
            <Text className="text-center font-bold text-xl">Empty Pill</Text>
          </View>
        ) : (
          <View className="flex-1 mt-5">
            <SwipeListView
              data={pills}
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
        )}
      </View>
      <View className="flex-[0.5] justify-center mx-auto w-[98%]">
        <TouchableOpacity className=" bg-blue-400 py-4 rounded-lg my-2">
          <Text className=" text-center font-bold text-white text-xl " onPress={setPage}>
            Add More
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-green-400 py-4 rounded-lg">
          <Text className="text-center font-bold text-white text-xl" onPress={() => setFinishVisible(true)}>
            Finish
          </Text>
        </TouchableOpacity>
      </View>

      <View className="justify-center items-center">
        {finishVisible && (
          <FinishModal
            visible={finishVisible}
            onCancel={() => setFinishVisible(false)}
            item={editingPill}
            pill={pills}
            onSave={handleSave}
          />
        )}
      </View>
    </View>
  );
};

export default List;
