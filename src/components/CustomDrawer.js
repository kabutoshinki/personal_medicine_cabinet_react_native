import { View, Text, ImageBackground, Image, Touchable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import color from "../utils/color";
import { ArrowRightOnRectangleIcon, ExclamationTriangleIcon } from "react-native-heroicons/solid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FancyAlert } from "react-native-expo-fancy-alerts";
import { useNavigation } from "@react-navigation/native";
const CustomDrawer = (props) => {
  //Get user info
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const toggleAlert = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    try {
      AsyncStorage.getItem("user").then((value) => {
        if (value !== null) {
          setUserInfo(JSON.parse(value));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("user");
      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex-1">
      {/* Header Of Drawer */}
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: color.main_color }}>
        <ImageBackground source={require("../../assets/images/bg_med_5.jpg")} style={{ padding: 20 }}>
          <Image
            source={{ uri: "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png" }}
            className="w-20 h-20 bg-black rounded-full mb-10"
          />
          <Text className="text-sm font-semibold text-white">Welcome</Text>
          <Text className="text-xl font-semibold text-white">{userInfo?.username}</Text>
        </ImageBackground>
        {/* Item Of Drawer */}
        <View className="flex-1 bg-white pt-3">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View className="border-t-2 border-t-gray-200 mb-24" style={{ padding: 20 }}>
        <TouchableOpacity onPress={toggleAlert}>
          <View className="flex-row items-center">
            <ArrowRightOnRectangleIcon size={25} color={"black"} />
            <Text className="font-bold ml-3 text-lg">Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FancyAlert
        visible={visible}
        icon={
          <View
            className="flex flex-1 justify-center items-center rounded-full w-full"
            style={{ backgroundColor: color.warning }}
          >
            <ArrowRightOnRectangleIcon size={30} color={"white"} />
          </View>
        }
        style={{ backgroundColor: "white" }}
      >
        <Text className="text-center mb-8 font-bold text-lg">Are you sure you want to Logout ?</Text>
        <View className="flex-row  mb-2  justify-between">
          <View className="flex-1">
            <TouchableOpacity className="rounded-lg" style={{ backgroundColor: color.warning }} onPress={removeData}>
              <Text className="text-center p-3 font-bold">Yes</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1 ml-2">
            <TouchableOpacity className="bg-gray-500 rounded-lg" onPress={toggleAlert}>
              <Text className="text-center p-3 text-white font-bold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </FancyAlert>
    </View>
  );
};

export default CustomDrawer;
