import { View, Text, TouchableOpacity, Animated, Image, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import color from "../utils/color";
import TakeMedicineModal from "./TakeMedicineModal";

const ItemPrescription = (props) => {
  const {
    item,
    onOption,
    rowMap,
    rowHeightAnimatedValue,
    setRowMap,
    removeRow,
    leftActionState,
    rightActionState,
    updateState,
  } = props;
  const [formData, setFormData] = useState({});
  const [isEnabled, setIsEnabled] = useState(item?.alarm);
  const [takeMedVisible, setTakeMedVisible] = useState(false);
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...item,
      alarm: item?.alarm,
    }));
  }, [item]);
  const handleFormChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  useEffect(() => {
    setRowMap(rowMap);
  }, []);

  const openTakeMedVisible = () => {
    setTakeMedVisible(true);
    updateState(true);
  };
  const handleCancel = () => {
    setTakeMedVisible(false);
    updateState(false);
  };
  const toggleSwitch = (value) => {
    setIsEnabled((previousState) => !previousState);
    console.log(value);
    handleFormChange("alarm", value);
  };

  return (
    <Animated.View className="w-[98%] justify-center items-center mx-auto  h-[120px]">
      <Card className="flex-auto m-1 w-full">
        {/* <TouchableOpacity onPress={() => onOption(formData, "Edit")}> */}
        {takeMedVisible && (
          <TakeMedicineModal
            onOpen={takeMedVisible}
            onCancel={handleCancel}
            item={formData}
            onOption={() => onOption(formData, "Edit")}
          />
        )}
        <TouchableOpacity onPress={openTakeMedVisible}>
          <Card.Content className="">
            <View className="flex-row justify-center items-center h-full">
              <View className="flex-[0.3]  w-full h-full justify-center items-center">
                {item?.image ? (
                  <Image source={{ uri: item?.image }} resizeMode="cover" className="w-24 h-20 rounded-lg" />
                ) : (
                  <Image
                    source={require("../../assets/images/med_tracking.png")}
                    resizeMode="cover"
                    className="w-24 h-20 rounded-lg"
                  />
                )}
              </View>
              <View className="flex-[0.7] mx-5 h-full w-full">
                <View className="flex-row  items-center">
                  <Image source={require("../../assets/icons/prescription.png")} className="w-6 h-6" />
                  <Text className="font-bold text-lg mr-2 ml-1">:</Text>
                  <Text className="text-2xl font-bold" style={{ color: color.main_color }}>
                    {item?.regimenName}
                  </Text>
                </View>
                <View className="flex-row items-center my-2">
                  <Image source={require("../../assets/icons/medicine.png")} className="w-6 h-6" />
                  <Text className="font-bold text-lg mr-2 ml-1">:</Text>
                  <Text className="font-bold text-lg text-gray-600"> {item?.totalTypeMedicine}</Text>
                </View>
                <View className="flex-row items-center">
                  <Image source={require("../../assets/icons/duration.png")} className="w-6 h-6" />
                  <Text className="font-bold text-lg mr-2 ml-1">:</Text>
                  <Text className="font-bold text-lg text-gray-600">
                    {item?.dosageRegimen} {item?.period}
                  </Text>
                </View>
              </View>
              <View>
                <Switch
                  trackColor={{ false: "gray", true: "#34C724" }}
                  value={formData?.alarm}
                  thumbColor={formData?.alarm ? "white" : "white"}
                  onValueChange={(value) => toggleSwitch(value)}
                  className="mr-5"
                  style={{ transform: [{ scale: 2.0 }] }}
                />
              </View>
            </View>
          </Card.Content>
        </TouchableOpacity>
      </Card>
    </Animated.View>
  );
};

export default ItemPrescription;
