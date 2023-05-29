import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import { TrashIcon, PencilSquareIcon } from "react-native-heroicons/outline";
import MedicineModal from "../../components/MedicineModal";
import { useNavigation } from "@react-navigation/native";
import { medicineTimeData } from "../../../fakedata";
import { SwipeListView } from "react-native-swipe-list-view";
import color from "../../utils/color";

const Item = ({ item, onDelete, onOption }) => (
  <View className="w-[400px]">
    <Card className="flex-auto m-1">
      <TouchableOpacity onPress={() => onOption(item, "Edit")}>
        <View className="flex-row justify-between items-center  border-b border-gray-400 bp-2">
          <Text className="text-lg text-center font-bold flex-1 ml-12">{item.medicineName}</Text>
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
  </View>
);

const HiddenItem = (props) => {
  const {
    swipeAnimatedValue,
    leftActionActivated,
    rightActionActivated,
    rowActionAnimatedValue,
    rowHeightAnimatedValue,
    item,
    rowMap,
    deleteRow,
    medicines,
  } = props;
  const closeRow = () => {
    if (rowMap[item.key]) {
      rowMap[item.key].closeRow();
    }
  };
  const rowKey = item.key;
  if (rightActionActivated) {
    Animated.spring(rowActionAnimatedValue, {
      toValue: 500,
    }).start();
  }
  return (
    <View className="w-[388px] rounded-lg m-1" style={{ height: 90 }}>
      <TouchableWithoutFeedback className="" onPress={closeRow}>
        <View
          style={{ width: 80, right: 80, backgroundColor: color.lightBlue }}
          className="absolute bottom-0 top-0 justify-center"
        >
          <Animated.View
            style={{
              alignItems: "center",
              transform: [
                {
                  scale: swipeAnimatedValue.interpolate({
                    inputRange: [-90, -45],
                    outputRange: [1, 0],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          >
            <PencilSquareIcon size={25} color={"white"} />
            <Text className="font-bold text-white mt-2">Edit</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback className="" onPress={() => deleteRow(rowMap, item.key, medicines)}>
        <View
          style={{ width: 80, right: 0, backgroundColor: color.danger }}
          className="absolute bottom-0 top-0 justify-center rounded-r-lg"
        >
          <Animated.View
            style={{
              alignItems: "center",
              backgroundColor: "black",
              transform: [
                {
                  scale: swipeAnimatedValue.interpolate({
                    inputRange: [-90, -45],
                    outputRange: [1, 0],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          >
            <TrashIcon size={25} color={"white"} />
            <Text className="font-bold text-white mt-2 bg-green-800">Delete</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SwipeList = ({ medicineData }) => {
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

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const deleteRow = (rowKey, medicines) => {
    const deletedMedicine = medicines.find((item) => item.key === rowKey);
    if (deletedMedicine) {
      const updatedMedicines = medicines.filter((item) => item.key !== rowKey);
      setMedicines(updatedMedicines);
    }
  };
  const renderItem = ({ item }) => <Item item={item} onOption={optionMedicine} />;

  const renderHiddenItem = (data, rowMap) => {
    const { item } = data;
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);
    return (
      <HiddenItem
        item={item}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        rowMap={rowMap}
        deleteRow={deleteRow}
      />
    );
  };

  const onRightActionStatusChange = () => {
    console.log("hello");
  };
  const swipeGestureEnded = () => {
    console.log("left");
  };

  return (
    <SwipeListView
      data={medicines}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      // leftOpenValue={75}
      rightOpenValue={-150}
      disableRightSwipe
      stopRightSwipe={-300}
      rightActivationValue={-250}
      leftActivationValue={100}
      rightActionValue={-screenWidth}
      onRightActionStatusChange={onRightActionStatusChange}
      swipeGestureEnded={swipeGestureEnded}
      swipeToOpenPercent={10}
      swipeToClosePercent={10}
      useNativeDriver={false}
    />
  );
};

export default SwipeList;
