import { View, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import Header from "../../components/Header";
import { medicineTimeData } from "../../../fakedata.js";
import { useRoute } from "@react-navigation/native";
import ListMedicines from "../list/ListMedicines";
import ListTest from "../list/ListTest";

const Home = ({ navigation }) => {
  const route = useRoute();

  const { medicineData } = route.params || { medicineData: null };
  const [medicine, setMedicine] = useState([]);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [editMedicine, setEditMedicine] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [stateMedicine, setStateMedicine] = useState("");

  useEffect(() => {
    if (medicineData) {
      setMedicine((prev) => [...prev, medicineData]);
    }
  }, [medicineData]);

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
      <Header
        name={"Home"}
        onPress_1={onOpenDrawer}
        onPress_2={onOpenDrawer}
        icon_1={
          <Image
            source={{ uri: "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png" }}
            className="w-8 h-8 rounded-full"
          />
        }
        icon_2={<MagnifyingGlassIcon size="30" color="white" />}
      />
      <ListTest medicineData={medicineData} />
    </View>
  );
};

export default Home;
