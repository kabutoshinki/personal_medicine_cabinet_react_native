import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import React, { useState } from "react";
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
import AlertCustom from "./AlertCustom";
import { handleUnit, handleTime } from "../utils/dataHandle";
import EditPillModal from "./EditPillModal";

const ItemComponentApi = ({ item, onDelete, onOption, rightActionState, rowHeightAnimatedValue }) => {
  const [visible, setVisible] = React.useState(false);
  const toggleAlert = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const timeMed = () => {
    const getTime = handleTime(item);
    return (
      <View className="flex-row">
        {getTime?.map((selectTime, index) => (
          <View key={index} className="flex-row">
            <Text className="font-bold ml-2 text-sm text-gray-600">
              {selectTime?.time} {index !== getTime?.length - 1 && "-"}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <Animated.View className="w-[400px]">
      {/* {visible && <EditPillModal visible={visible} onCancel={() => setVisible(false)} item={item} />} */}
      <Card className="flex-auto m-1 py-1">
        <Card.Content className=" ">
          <TouchableOpacity onPress={() => onOption(item)}>
            <View className="flex-row justify-center items-center">
              <View className="flex-[0.4]">
                {item?.imageURI !== null ? (
                  <Image source={{ uri: item?.medicineUrl }} className="w-24 h-20  rounded-lg" />
                ) : (
                  <Image source={require("../../assets/images/medicine.gif")} className="w-24 h-20" />
                )}
              </View>
              {/* <Image source={require("../../assets/icons/add_medicine.png")} className="w-16 h-16 mr-4" /> */}
              <View className="flex-[0.9]">
                <View className="flex-row items-center">
                  <Image source={require("../../assets/icons/pill.png")} className="w-5 h-5" />
                  <Text className="font-bold text-lg ml-1">:</Text>
                  <Text className="font-bold ml-2 text-xl">{item?.medicineName}</Text>
                </View>
                <View className="flex-row items-center">
                  <ClockIcon size={20} color="gray" />
                  <Text className="font-bold text-lg">:</Text>
                  {timeMed()}
                </View>

                <View className="flex-row items-center">
                  <Text className="font-bold text-sm text-gray-600">Take :</Text>
                  <Text className="font-bold ml-2 text-sm text-green-500">{item?.takenQuantity}</Text>
                  <Text className="font-bold text-sm text-green-500"> {handleUnit(item)}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </Animated.View>
  );
};

export default ItemComponentApi;
