import { View, Image, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import Header from "../../components/Header";
import { medicineTimeData } from "../../../fakedata.js";
import { useRoute } from "@react-navigation/native";
import ListMedicines from "../list/ListMedicines";
import ListTest from "../list/ListTest";
import HeaderCustom from "../../components/HeaderCustom";
import { AppProvider } from "../../context/AppContext";

const Home = ({ navigation }) => {
  const [medicine, setMedicine] = useState([]);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [editMedicine, setEditMedicine] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [stateMedicine, setStateMedicine] = useState("");

  const onOpenDrawer = () => {
    navigation.openDrawer();
  };

  const handleSave = (updatedItem) => {
    setPills((prevPills) => prevPills.map((pill) => (pill.id === updatedItem.id ? updatedItem : pill)));
    setEditingPill(null);
    setModalVisible(false);
  };

  return (
    <View className="flex-1">
      <HeaderCustom
        left={
          <TouchableOpacity className=" p-2 ml-8" onPress={onOpenDrawer}>
            <Image
              source={{ uri: "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png" }}
              className="w-8 h-8 rounded-full"
            />
          </TouchableOpacity>
        }
        name={
          <View className="justify-center items-center mr-20">
            <Text className="text-center font-bold text-white text-xl">Home</Text>
          </View>
        }
      />
      <AppProvider>
        <ListTest />
      </AppProvider>
    </View>
  );
};

export default Home;
