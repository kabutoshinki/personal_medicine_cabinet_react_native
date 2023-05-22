import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Bars3Icon, MagnifyingGlassIcon, XCircleIcon, PencilSquareIcon, EyeIcon } from "react-native-heroicons/solid";
import Header from "../../components/Header";
import { medicineDate } from "../../../fakedata";

import { Card } from "react-native-paper";
import { useRoute } from "@react-navigation/native";

const Item = ({ name, date, time }) => (
  <View className="w-[400px] bg-slate-300">
    <Card className="flex-auto m-1">
      <View className="flex-row justify-between items-center  border-b border-gray-600 bp-2">
        <Text className="text-lg text-center font-bold flex-1 ml-12">{name}</Text>
        <TouchableOpacity className=" mr-5" onPress={() => console.log(name)}>
          <XCircleIcon size={25} color="red" />
        </TouchableOpacity>
      </View>
      <Card.Content className=" ">
        <View className="flex-row justify-center items-center">
          <Image source={require("../../../assets/icons/add_medicine.png")} />
          <View className="flex-1">
            <Text style={{ fontSize: 16 }}>Date: {date}</Text>
            <Text style={{ fontSize: 16 }}>Time: {time}</Text>
          </View>
          <View>
            <TouchableOpacity>
              <PencilSquareIcon size={25} color="#29C5F6" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="">
          <TouchableOpacity className="flex-row justify-center items-center ">
            <EyeIcon size={25} color="#29C5F6" />
            <Text className="ml-1 font-bold">View Detail</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  </View>
);

const Home = ({ navigation }) => {
  const route = useRoute();
  const { medicineData } = route.params || { medicineData: null };
  const [medicine, setMedicine] = useState(medicineDate);
  useEffect(() => {
    setMedicine(medicineData);
  }, [medicineData]);

  console.log("medicineData");
  console.log(medicine);
  const renderItem = ({ item }) => <Item name={item.medicineName} date={item.date} time={item.time} />;

  const onPressHandler = () => {
    navigation.navigate("PillReminder");
  };
  const onOpenDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View className="flex-1">
      <Header
        name={"Home"}
        onPress_1={onOpenDrawer}
        onPress_2={onOpenDrawer}
        icon_1={<Bars3Icon size="30" color="white" />}
        icon_2={<MagnifyingGlassIcon size="30" color="white" />}
      />

      {medicine !== null ? (
        <View className="mt-1 justify-center items-center  h-[300px]">
          <Text className="text-xl font-bold text-center mb-3">List Medicines</Text>
          <FlatList
            data={medicine}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ flexGrow: 1 }}
          ></FlatList>
        </View>
      ) : (
        <View className="flex my-4 justify-center items-center mt-24">
          <View className="">
            <Image source={require("../../../assets/images/Medical.png")} />
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
    </View>
  );
};

export default Home;
