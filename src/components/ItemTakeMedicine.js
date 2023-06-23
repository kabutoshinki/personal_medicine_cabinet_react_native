import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Checkbox } from "react-native-paper";
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
import color from "../utils/color";
import { handleUnit } from "../utils/dataHandle";
const ItemTakeMedicine = ({ item, isCheck, onItemCheck }) => {
  const [visible, setVisible] = useState(false);
  const [itemMedicine, setItemMedicine] = useState(item?.item);
  useEffect(() => {
    setItemMedicine(item?.item);
  }, [item?.item]);
  const toggleAlert = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const [isChecked, setIsChecked] = useState(false);

  const handleTime = () => {
    const firstTime = itemMedicine?.firstTime?.substring(0, 5);
    const secondTime = itemMedicine?.secondTime?.substring(0, 5);
    const thirdTime = itemMedicine?.thirdTime?.substring(0, 5);
    const fourthTime = itemMedicine?.fourthTime?.substring(0, 5);
    if (firstTime && secondTime && thirdTime && fourthTime) {
      return firstTime + " - " + secondTime + " - " + thirdTime + " - " + fourthTime;
    } else if (firstTime && secondTime && thirdTime) {
      return firstTime + " - " + secondTime + " - " + thirdTime;
    } else if (firstTime && secondTime) {
      return firstTime + " - " + secondTime;
    } else {
      return firstTime;
    }
  };

  return (
    <Animated.View className="w-[360px]">
      <Card className="flex-auto m-1 bg-gray-100">
        <Card.Content className=" ">
          <TouchableOpacity
            onPress={() => {
              setIsChecked(!isChecked);
              onItemCheck(itemMedicine?.regimenDetailId);
            }}
          >
            <View className="flex-row justify-center items-center">
              <View className="flex-[0.4]">
                {itemMedicine?.imageURI !== null ? (
                  <Image source={{ uri: itemMedicine?.medicineUrl }} className="w-24 h-20  rounded-lg" />
                ) : (
                  <Image source={require("../../assets/images/medicine.gif")} className="w-24 h-20" />
                )}
              </View>

              <View className="flex-[0.65]">
                <View className="flex-row items-center">
                  <Image source={require("../../assets/icons/pill.png")} className="w-5 h-5" />
                  <Text className="font-bold text-lg ml-1">:</Text>
                  <Text className="font-bold ml-2 text-xl">{itemMedicine?.medicineName}</Text>
                </View>
                <View className="flex-row items-center">
                  <ClockIcon size={20} color="gray" />
                  <Text className="font-bold text-lg">:</Text>
                  {/* {itemMedicine?.time?.map((selectTime, index) => (
                    <View key={index}>
                      <Text className="font-bold ml-2 text-sm text-gray-600">
                        {selectTime?.time} {index !== itemMedicine?.time?.length - 1 && "-"}
                      </Text>
                    </View>
                  ))} */}
                  <Text className="font-bold ml-2 text-sm text-gray-600">{handleTime()}</Text>
                </View>

                <View className="flex-row items-center">
                  <Text className="font-bold text-sm text-gray-600">Take :</Text>
                  <Text className="font-bold ml-2 text-sm text-green-500">{itemMedicine?.numberOfMedicine}</Text>
                  <Text className="font-bold text-sm text-green-500"> {handleUnit(itemMedicine)}</Text>
                </View>
              </View>

              <Checkbox
                status={isChecked ? "checked" : "unchecked"}
                onPress={() => {
                  setIsChecked(!isChecked);
                  onItemCheck(itemMedicine.id);
                }}
              />
            </View>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </Animated.View>
  );
};

export default ItemTakeMedicine;
