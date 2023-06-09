import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
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
import AlertCustom from "./AlertCustom";

const ItemComponent = ({ item, onDelete, onOption, rightActionState, rowHeightAnimatedValue }) => {
  const [visible, setVisible] = React.useState(false);
  const toggleAlert = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  console.log(item);
  return (
    <Animated.View className="w-[400px]">
      <Card className="flex-auto m-1">
        <Card.Content className=" ">
          <TouchableOpacity onPress={() => onOption(item, "Edit")}>
            <View className="flex-row justify-center items-center">
              <View className="flex-[0.4]">
                {item?.imageURI !== null ? (
                  <Image source={{ uri: item?.imageURI }} className="w-24 h-20  rounded-lg" />
                ) : (
                  <Image source={require("../../assets/images/medicine.gif")} className="w-24 h-20" />
                )}
              </View>
              {/* <Image source={require("../../assets/icons/add_medicine.png")} className="w-16 h-16 mr-4" /> */}
              <View className="flex-[0.9]">
                <View className="flex-row items-center">
                  <Image source={require("../../assets/icons/pill.png")} className="w-5 h-5" />
                  <Text className="font-bold text-lg ml-1">:</Text>
                  <Text className="font-bold ml-2 text-xl">{item?.name}</Text>
                </View>
                <View className="flex-row items-center">
                  <ClockIcon size={20} color="gray" />
                  <Text className="font-bold text-lg">:</Text>
                  {item?.time?.map((selectTime, index) => (
                    <View key={index}>
                      <Text className="font-bold ml-2 text-sm text-gray-600">
                        {selectTime?.time} {index !== item?.time?.length - 1 && "-"}
                      </Text>
                    </View>
                  ))}
                </View>

                <View className="flex-row items-center">
                  <ClipboardDocumentIcon size={20} color="gray" />
                  <Text className="font-bold text-lg">:</Text>
                  <Text className="font-bold ml-2 text-sm text-gray-600">{item?.note}</Text>
                </View>
              </View>
              {/* <View>
                <TouchableOpacity onPress={() => onOption(item, "Edit")}>
                  <PencilSquareIcon size={25} color="#29C5F6" />
                </TouchableOpacity>
              </View> */}
            </View>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </Animated.View>
  );
};

export default ItemComponent;
