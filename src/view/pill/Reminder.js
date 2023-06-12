import { View, Text, FlatList, TouchableOpacity, Image, ScrollView, ToastAndroid } from "react-native";
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

const ADD_MEDICINE = "ADD_MEDICINE";
const LIST_MEDICINES = "LIST_MEDICINES";

const HeaderComp = ({ pills, page, setPage }) => {
  const [title, setTitle] = useState("Reminder");
  const [visible, setVisible] = React.useState(false);
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

  return (
    <View>
      {visible && (
        <AlertCustom
          onOpen={visible}
          onClose={toggleAlert}
          icon={<ShieldExclamationIcon size={30} color={"white"} />}
          color={color.warning}
          text={`Pills Data Are Not Null, You Sure Want To Go Back ?`}
          action={() => navigation.goBack()}
        />
      )}
      <Header
        name={title}
        onPress_1={checkPillEmpty}
        icon_1={<ArrowLeftIcon size="30" color="white" />}
        icon_2={<MagnifyingGlassIcon size="30" color="white" />}
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
          onPress={() => setPage(LIST_MEDICINES)}
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
  const flatListRef = useRef(null);
  const [editingPill, setEditingPill] = useState(null);
  const addPill = (pillData) => {
    const newPill = {
      ...pillData,
      id: uuid.v4(),
      key: uuid.v4(), // Generate a unique id
    };

    setPills((prevPills) => [...prevPills, newPill]);
    flatListRef.current?.scrollToEnd({ animated: true });
    //
    setPage(LIST_MEDICINES);
  };

  const updateListPills = (listPills) => {
    const newListPills = [...listPills];
    setPills(newListPills);
  };
  return (
    <View className="flex-1">
      <HeaderComp page={page} setPage={setPage} pills={pills} />
      {page === "ADD_MEDICINE" ? (
        <View className="justify-center items-center pt-4 h-full w-full bg-white">
          {/* <ScrollView className="bg-white"> */}
          <FormAddMedicine addPill={addPill} />
          {/* </ScrollView> */}
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
