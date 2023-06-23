import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card, TextInput } from "react-native-paper";
import color from "../utils/color";
import { SelectCountry, Dropdown } from "react-native-element-dropdown";
import { options, local_data } from "../../fakedata";
import { ArrowLeftIcon, CheckIcon, PlusIcon } from "react-native-heroicons/solid";
import UploadImage from "./UploadImage";
import TimeComponentCustom from "./TimeComponentCustom";
import { ClipboardDocumentIcon } from "react-native-heroicons/outline";
import uuid from "react-native-uuid";
import { listMedicinesData } from "../../fakedata";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import MedicineDetailModal from "./MedicineDetailModal";
import * as medicineService from "../service/medicineService";
const Item = ({ item, onSave, getItem }) => {
  return (
    <View className="w-[96%]   mx-auto  h-[120px]">
      <Card className="flex-auto m-1 w-full">
        <TouchableOpacity onPress={() => getItem(item)}>
          <Card.Content className=" ">
            <View className="flex-row justify-center items-center">
              <View className="flex-[0.7] my-2">
                <Image source={{ uri: item?.image }} className="w-32 h-24 rounded-lg" resizeMode="cover" />
              </View>
              <View className="flex-1 ml-2">
                <Text className="text-lg font-bold text-[#4D9FEC]">{item.name}</Text>
              </View>
              <View className="items-center justify-center">
                <TouchableOpacity
                  style={{ backgroundColor: color.success }}
                  className=" rounded-lg p-3 my-2"
                  onPress={() => onSave(item)}
                >
                  <PlusIcon size={25} color={"white"} />
                </TouchableOpacity>
              </View>
            </View>
          </Card.Content>
        </TouchableOpacity>
      </Card>
    </View>
  );
};
const SearchMedicine = ({ onOpen, onCancel, onSave, setSelectedMedicine }) => {
  const [listMedicines, setListMedicines] = useState(listMedicines);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState(listMedicinesData);
  const [checkAddMed, setCheckAddMed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [getDetailItem, setGetDetailItem] = useState(null);
  const openVisible = () => {
    setVisible(true);
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
    filterMedicines(query);
  };

  // const SearchQuery = async (query) => {
  //   if (query != "") {
  //     const { data } = await medicineService.getMedicines(query);
  //   }
  // };

  // useEffect(() => {
  //   SearchQuery(searchQuery);
  // }, [searchQuery]);

  const filterMedicines = (query) => {
    const filtered = listMedicinesData.filter((medicine) => medicine.name.toLowerCase().includes(query.toLowerCase()));
    setFilteredMedicines(filtered);
  };
  if (checkAddMed) {
    setCheckAddMed(false);
    onCancel();
  }
  const addMedicine = (item) => {
    setSelectedMedicine(item);
    onCancel();
  };
  const getMedicineDetail = (item) => {
    setGetDetailItem(item);
    setVisible(true);
  };

  const addMedicineDetail = (item) => {
    setSelectedMedicine(item);
    setVisible(false);
    onCancel();
  };
  const renderItem = ({ item }) => <Item item={item} onSave={addMedicine} getItem={getMedicineDetail} />;
  return (
    <Modal visible={onOpen} onRequestClose={onCancel} animationType="slide">
      {visible && (
        <MedicineDetailModal
          onOpen={visible}
          onCancel={() => setVisible(false)}
          item={getDetailItem}
          onSave={addMedicineDetail}
        />
      )}
      <View className="flex-1 bg-red-400" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <SafeAreaView>
          <View
            className={`flex-row justify-between items-center w-[100%] py-5 rounded-t-lg ${
              Platform.OS === "ios" ? "h-28" : "h-16"
            }`}
            style={{ backgroundColor: color.main_color }}
          >
            <TouchableOpacity onPress={onCancel} className="ml-4">
              <ArrowLeftIcon size={30} color={"white"} />
            </TouchableOpacity>
            <Text className="text-center font-bold text-xl flex-1 mr-6 text-white">Search Medicine</Text>
          </View>
        </SafeAreaView>

        <View className=" flex-1 w-full  bg-white ">
          <View className="m-2">
            <TextInput
              placeholder="Search"
              mode="outlined"
              value={searchQuery}
              className=" text-gray-700 rounded-lg mx-2 bg-gray-200"
              left={<TextInput.Icon icon="magnify" />}
              onChangeText={handleSearchQueryChange}
              right={
                searchQuery !== "" ? <TextInput.Icon icon="alpha-x-circle" onPress={() => setSearchQuery("")} /> : null
              }
            />
          </View>
          <View className="flex-1 w-[98%] h-[80%]">
            {searchQuery !== "" ? (
              filteredMedicines.length !== 0 ? (
                <FlatList data={filteredMedicines} renderItem={renderItem} keyExtractor={(item) => item.id} />
              ) : (
                <View className={`justify-center h-full items-center ${Platform.OS == "ios" ? "pb-64" : "pb-4"}`}>
                  <Text className="font-bold text-xl">Medicine name "{searchQuery}" not found</Text>
                </View>
              )
            ) : (
              // <View className={`justify-center h-full items-center ${Platform.OS == "ios" ? "pb-64" : "pb-4"}`}>
              //   <Image source={require("../../assets/images/search_medicine.png")} className="w-56 h-56" />
              //   <Text className="font-bold text-xl">Enter a few words</Text>
              //   <Text className="font-bold text-xl">to search medicines</Text>
              // </View>
              <FlatList data={listMedicinesData.slice(0, 5)} renderItem={renderItem} keyExtractor={(item) => item.id} />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SearchMedicine;
