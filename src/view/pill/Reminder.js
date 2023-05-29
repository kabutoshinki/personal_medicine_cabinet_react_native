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
  ShieldExclamationIcon,
} from "react-native-heroicons/solid";
import EditPillModal from "../../components/EditPillModal";
import { FancyAlert } from "react-native-expo-fancy-alerts";

const Reminder = ({ navigation }) => {
  const [pills, setPills] = useState(fakeData);
  const flatListRef = useRef(null);
  const [editingPill, setEditingPill] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [visible, setVisible] = React.useState(false);
  const toggleAlert = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const addPill = (pillData) => {
    const newPill = {
      ...pillData,
      id: uuid.v4(), // Generate a unique id
    };
    setPills((prevPills) => [...prevPills, newPill]);
    flatListRef.current?.scrollToEnd({ animated: true });
    ToastAndroid.show("Add Successfully", ToastAndroid.SHORT);
    //
    navigation.navigate("ListPill", { pills: [...pills, newPill] });
  };
  const checkPillEmpty = () => {
    if (pills.length === 0) {
      navigation.goBack();
    } else {
      setVisible(true);
    }
  };

  return (
    <View className="flex-1 bg-gray-300">
      <Header
        name={"Reminder"}
        onPress_1={checkPillEmpty}
        icon_1={<ArrowLeftIcon size="30" color="white" />}
        icon_2={<MagnifyingGlassIcon size="30" color="white" />}
      />

      <View className="my-3 justify-center items-center">
        <Text className="text-2xl font-bold">Medicine Information</Text>
      </View>
      <View className="flex-1 mx-2">
        <ScrollView>
          <FormAddPill addPill={addPill} />
        </ScrollView>
      </View>
      <FancyAlert
        visible={visible}
        icon={
          <View className="flex flex-1 justify-center items-center bg-yellow-400 rounded-full w-full">
            <ShieldExclamationIcon size={30} color={"white"} />
          </View>
        }
        style={{ backgroundColor: "white" }}
      >
        <Text className="text-center mb-8 font-bold">Pills Data Are Not Null, You Sure Want To Go Back ?</Text>
        <View className="flex-row  mb-2  justify-between">
          <View className="flex-1 mr-2">
            <TouchableOpacity className="bg-gray-500 rounded-lg" onPress={toggleAlert}>
              <Text className="text-center p-3">Cancel</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1">
            <TouchableOpacity className="bg-green-300 rounded-lg" onPress={() => navigation.goBack()}>
              <Text className="text-center p-3">Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </FancyAlert>
    </View>
  );
};

export default Reminder;
