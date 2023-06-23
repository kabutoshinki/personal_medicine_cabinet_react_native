import { View, Text, FlatList, TouchableOpacity, Image, ScrollView, Dimensions, TextInput } from "react-native";
import React, { useRef, useState } from "react";
import Header from "../../components/Header";
import uuid from "react-native-uuid";
import fakeData from "../../../fakedata";
import { ArrowLeftIcon, MagnifyingGlassIcon, ShieldExclamationIcon } from "react-native-heroicons/solid";
import AlertCustom from "../../components/AlertCustom";
import color from "../../utils/color";
import { useNavigation } from "@react-navigation/native";
import List from "../list/List";
import FormAddMedicine from "../../components/FormAddMedicine";
import HeaderCustom from "../../components/HeaderCustom";
import SearchMedicine from "../../components/SearchMedicineModal";
// import { TextInput } from "react-native-paper";

const ADD_MEDICINE = "ADD_MEDICINE";
const LIST_MEDICINES = "LIST_MEDICINES";

const HeaderComp = ({ pills, page, setPage, setSelectedMedicine }) => {
  const [visible, setVisible] = React.useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const navigation = useNavigation();
  const toggleAlert = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const checkPillEmpty = () => {
    if (pills?.length === 0) {
      navigation.goBack();
    } else {
      setVisible(true);
    }
  };
  const openSearch = () => {
    setSearchVisible(true);
  };
  const setPageListMedicines = () => {
    setPage(LIST_MEDICINES);
    setSelectedMedicine("");
  };
  return (
    <View>
      {visible && (
        <AlertCustom
          onOpen={visible}
          onClose={toggleAlert}
          icon={<ShieldExclamationIcon size={30} color={"white"} />}
          color={color.warning}
          text={`Medicine Data Are Not Empty          Are You Sure Want To Go Back ?`}
          action={() => navigation.goBack()}
        />
      )}
      <View className="flex-1">
        {searchVisible && (
          <SearchMedicine
            onOpen={searchVisible}
            onCancel={() => setSearchVisible(false)}
            setSelectedMedicine={setSelectedMedicine}
          />
        )}
      </View>
      <HeaderCustom
        left={
          <TouchableOpacity className=" p-2 ml-4" onPress={checkPillEmpty}>
            <ArrowLeftIcon size="30" color="white" />
          </TouchableOpacity>
        }
        name={
          <View className="justify-center items-center">
            <Text className="text-center font-bold text-white text-xl">Reminder</Text>
          </View>
        }
        right={
          page !== "LIST_MEDICINES" ? (
            <TouchableOpacity className="p-2 mr-2 rounded-full" onPress={openSearch}>
              <MagnifyingGlassIcon size={30} color={"white"} />
            </TouchableOpacity>
          ) : (
            <View className="mr-12 p-2"></View>
          )
        }
      />
      <View className="flex-row items-center justify-between h-12 bg-white">
        <TouchableOpacity
          className="flex-1 h-full justify-center items-center"
          disabled={page === "ADD_MEDICINE" ? true : false}
          onPress={() => setPage(ADD_MEDICINE)}
        >
          <Text className="text-center text-lg font-bold">Add Medicine</Text>
          {page === "ADD_MEDICINE" ? (
            <View className="absolute bottom-0 h-1 w-full" style={{ backgroundColor: color.main_color }}></View>
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 h-full justify-center items-center"
          disabled={page === "LIST_MEDICINES" ? true : false}
          onPress={setPageListMedicines}
        >
          <Text className="text-center text-lg font-bold">List Medicines</Text>
          {page === "LIST_MEDICINES" ? (
            <View className="absolute bottom-0 h-1 w-full" style={{ backgroundColor: color.main_color }}></View>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Reminder = ({ navigation }) => {
  const [page, setPage] = useState(ADD_MEDICINE);
  const [pills, setPills] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const addPill = (pillData) => {
    const newPill = {
      ...pillData,
      id: uuid.v4(),
      key: uuid.v4(), // Generate a unique id
    };
    setPills((prevPills) => [...prevPills, newPill]);
    setSelectedMedicine(null);
    setPage(LIST_MEDICINES);
  };

  const updateListPills = (listPills) => {
    const newListPills = [...listPills];
    setPills(newListPills);
  };
  return (
    <View className="flex-1">
      <HeaderComp page={page} setPage={setPage} pills={pills} setSelectedMedicine={setSelectedMedicine} />
      {page === "ADD_MEDICINE" ? (
        <View className="justify-center items-center pt-4 h-full w-full bg-white">
          <FormAddMedicine addPill={addPill} initData={selectedMedicine} />
        </View>
      ) : null}
      {page === "LIST_MEDICINES" ? (
        <View className="justify-center items-center pt-4 h-full w-full">
          <List listPills={pills} setPage={() => setPage(ADD_MEDICINE)} updateListPills={updateListPills} />
        </View>
      ) : null}
    </View>
  );
};

export default Reminder;
