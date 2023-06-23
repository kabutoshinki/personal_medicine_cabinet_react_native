import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ArrowLeftIcon, CheckIcon, PencilSquareIcon } from "react-native-heroicons/solid";
import color from "../utils/color";
import ItemTakeMedicine from "./ItemTakeMedicine";
import * as historyService from "../service/historyService";
import * as prescriptionService from "../service/prescriptionDetailService";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Loading from "./Loading";
import { AppContext } from "../context/AppContext";
const TakeMedicineModal = ({ onOpen, onCancel, item, onOption }) => {
  const { stateChange, setStateChange } = useContext(AppContext);
  const [checkedItems, setCheckedItems] = useState([]);
  const [form, setForm] = useState();
  const [loading, setLoading] = useState(true);
  const PrescriptionItems = async () => {
    setLoading(true);
    const { data } = await prescriptionService.getRegimenDetailsList(item?.regimenId);
    setForm(data);
    setLoading(false);
  };

  useEffect(() => {
    PrescriptionItems();
  }, [stateChange]);

  const handleConfirm = async () => {
    const takenForm = {
      regimentId: item?.regimenId,
      takenStatus: "TAKEN",
      medicineName: getListNames(),
    };

    try {
      await historyService.postHistory(takenForm);
      Toast.show({
        type: "success",
        text1: "Taken Success",
      });
      onCancel();
    } catch (error) {
      console.log(error?.response?.data?.message);
      Toast.show({
        type: "error",
        text1: "Taken Failed",
      });
      onCancel();
    }
  };
  const getListNames = () => {
    const names = form
      ?.filter((form) => checkedItems.includes(form?.regimenDetailId))
      ?.map((form) => form?.medicineName);
    return names || [];
  };

  const handleItemCheck = (itemId) => {
    if (checkedItems.includes(itemId)) {
      setCheckedItems(checkedItems.filter((id) => id !== itemId));
    } else {
      setCheckedItems([...checkedItems, itemId]);
    }
  };

  const renderItem = (form) => (
    <ItemTakeMedicine item={form} isCheck={checkedItems.includes(form?.id)} onItemCheck={handleItemCheck} />
  );
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
        <View className="flex-[0.75]    form  w-[92%]">
          <View className="flex-[0.505] w-full bg-white items-center">
            <View className="mt-2">
              <FlatList
                data={form}
                keyExtractor={(form) => form?.regimenDetailId}
                renderItem={renderItem}
                className="max-h-[510px] w-[100%]"
                contentContainerStyle={{ flexGrow: 1 }}
              />
            </View>
            <View className="p-3 w-full  h-[25%] justify-center items-center   rounded-b-lg bg-white">
              <TouchableOpacity
                className="w-[80%] rounded-lg"
                style={{ backgroundColor: checkedItems?.length !== 0 ? color.success : "gray" }}
                onPress={handleConfirm}
                disabled={checkedItems?.length !== 0 ? false : true}
              >
                <Text className="text-center text-white font-bold p-3 text-lg">Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {loading && <Loading />}
    </Modal>
  );
};

export default TakeMedicineModal;
