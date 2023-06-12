import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import React from "react";
import { ArrowLeftIcon, CheckIcon, PencilSquareIcon } from "react-native-heroicons/solid";
import color from "../utils/color";
import ItemTakeMedicine from "./ItemTakeMedicine";

const TakeMedicineModal = ({ onOpen, onCancel, item, onOption }) => {
  const renderItem = ({ item }) => <ItemTakeMedicine item={item} />;
  return (
    <Modal visible={onOpen} transparent animationType="slide">
      {/* <View className="w-[96%] mx-2 h-[80%] justify-center items-center mt-12 bg-slate-400"> */}
      <View className="h-[1000px]  justify-center items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View
          className="flex-row justify-between items-center w-[92%] py-5 rounded-t-lg mt-5"
          style={{ backgroundColor: color.main_color }}
        >
          <TouchableOpacity onPress={onCancel} className="ml-4">
            <ArrowLeftIcon size={30} color={"white"} />
          </TouchableOpacity>
          <Text className="text-center font-bold text-xl flex-1 text-white">Take Medicines</Text>
          <TouchableOpacity onPress={onOption} className="mr-4">
            <PencilSquareIcon size={30} color={"white"} />
          </TouchableOpacity>
        </View>
        <View className="flex-[0.9]   form  w-[92%]">
          <View className="flex-[0.65] w-full bg-white rounded-b-lg items-center">
            <View className="mt-2">
              <FlatList
                data={item}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                className="max-h-[510px] w-[100%]"
                contentContainerStyle={{ flexGrow: 1 }}
              ></FlatList>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TakeMedicineModal;
