import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import {
  XCircleIcon,
  PencilSquareIcon,
  EyeIcon,
  ClockIcon,
  ClipboardDocumentIcon,
  ExclamationTriangleIcon,
} from "react-native-heroicons/solid";
import { FancyAlert } from "react-native-expo-fancy-alerts";

const ItemComponent = ({ item, onDelete, onOption }) => {
  const [visible, setVisible] = React.useState(false);
  const toggleAlert = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  return (
    <View className="w-[380px]">
      <Card className="flex-auto m-1">
        <View className="flex-row justify-between items-center  border-b border-gray-600 bp-2">
          <Text className="text-lg text-center font-bold flex-1 ml-12">{item.pillName}</Text>
          <TouchableOpacity className=" mr-5" onPress={toggleAlert}>
            <XCircleIcon size={25} color="red" />
          </TouchableOpacity>
        </View>
        <Card.Content className=" ">
          <View className="flex-row justify-center items-center">
            <Image source={require("../../assets/icons/add_medicine.png")} className="w-16 h-16 mr-4" />
            <View className="flex-1">
              {/* <View className="flex-row items-center">
                <Text className="font-bold text-lg">Quantity: {item.quantity}</Text>
                <Text className="font-bold text-xl mx-5">-</Text>
                <Text className="font-bold text-lg">Dose: {item.dose}</Text>
              </View> */}

              <View className="flex-row items-center">
                <ClockIcon size={25} color="black" />
                <Text className="font-bold text-lg">:</Text>
                <Text className="font-bold ml-2 text-lg">{item.time}</Text>
              </View>

              <View className="flex-row items-center">
                <ClipboardDocumentIcon size={25} color="black" />
                <Text className="font-bold text-lg">:</Text>
                <Text className="font-bold ml-2 text-lg">{item.note}</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => onOption(item, "Edit")}>
                <PencilSquareIcon size={25} color="#29C5F6" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="">
            <TouchableOpacity className="flex-row justify-center items-center " onPress={() => onOption(item, "View")}>
              <EyeIcon size={25} color="#29C5F6" />
              <Text className="ml-1 font-bold">View Detail</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
      <FancyAlert
        visible={visible}
        icon={
          <View className="flex flex-1 justify-center items-center bg-red-500 rounded-full w-full">
            <ExclamationTriangleIcon size={30} color={"white"} />
          </View>
        }
        style={{ backgroundColor: "white" }}
      >
        <Text className="text-center mb-8 font-bold">You Want To Delete "{item?.pillName}" ?</Text>
        <View className="flex-row  mb-2  justify-between">
          <View className="flex-1 mr-2">
            <TouchableOpacity className="bg-gray-500 rounded-lg" onPress={toggleAlert}>
              <Text className="text-center p-3">Cancel</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1">
            <TouchableOpacity className="bg-red-500 rounded-lg" onPress={() => onDelete(item?.id)}>
              <Text className="text-center p-3">Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </FancyAlert>
    </View>
  );
};

export default ItemComponent;
