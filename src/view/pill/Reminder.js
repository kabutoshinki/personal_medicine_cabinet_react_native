import { View, Text, FlatList, TouchableOpacity, Image, ScrollView, ToastAndroid } from "react-native";
import React, { useRef, useState } from "react";

import Header from "../../components/Header";
import FormAddPill from "../../components/FormAddPill";
import { Card } from "react-native-paper";
import uuid from "react-native-uuid";
import fakeData from "../../../fakedata";
import {
  XCircleIcon,
  PencilSquareIcon,
  EyeIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";

const Item = ({ name, quantity, dose }) => (
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
            <Text style={{ fontSize: 16 }}>Quantity: {quantity}</Text>
            <Text style={{ fontSize: 16 }}>Dose: {dose}</Text>
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

const Reminder = ({ navigation }) => {
  const [pills, setPills] = useState(fakeData);
  const flatListRef = useRef(null);

  const addPill = (pillData) => {
    const newPill = {
      ...pillData,
      id: uuid.v4(), // Generate a unique id
    };
    setPills((prevPills) => [...prevPills, newPill]);
    flatListRef.current?.scrollToEnd({ animated: true });
    ToastAndroid.show("Add Successfully", ToastAndroid.SHORT);
  };

  const handleFinish = () => {
    const medicineData = {
      id: uuid.v4(),
      time: "12:30",
      medicineName: "abcd",
      date: "2 week",
      pill: pills,
    };
    console.log(medicineData);
    navigation.navigate("HomeScreen", { medicineData });
  };

  const renderItem = ({ item }) => <Item name={item.medicineName} quantity={item.quantity} dose={item.dose} />;

  return (
    <View className="flex-1">
      <Header
        name={"Reminder"}
        onPress_1={() => navigation.goBack()}
        icon_1={<ArrowLeftIcon size="30" color="white" />}
        icon_2={<MagnifyingGlassIcon size="30" color="white" />}
      />
      <View className="my-3 justify-center items-center">
        <Text className="text-2xl font-bold">Medicine Information</Text>
      </View>
      <View className="flex-2 justify-center items-center bg-black">
        <ScrollView>
          <FormAddPill addPill={addPill} />
        </ScrollView>
      </View>
      <View className="mt-1 justify-center items-center  h-[300px]">
        <Text className="text-xl font-bold text-center mb-3">List Pills</Text>
        <FlatList
          data={pills}
          ref={flatListRef}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          className="max-h-[300px]"
          contentContainerStyle={{ flexGrow: 1 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        ></FlatList>
      </View>
      <View className="mt-6 bg-green-300 mb-8 py-4    ">
        <TouchableOpacity onPress={handleFinish}>
          <Text className="text-center">Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Reminder;
