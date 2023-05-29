import { View, Text } from "react-native";
import React from "react";

import { PhoneIcon, ArrowLeftIcon, MagnifyingGlassIcon, EnvelopeIcon, PencilIcon } from "react-native-heroicons/solid";
import { CreditCardIcon, PresentationChartBarIcon, Cog6ToothIcon } from "react-native-heroicons/outline";
import Header from "../../components/Header";
import { Avatar, Caption, Title, TouchableRipple } from "react-native-paper";

const Profile = ({ navigation }) => {
  return (
    <View className="flex-1">
      <Header
        name={"Profile"}
        onPress_1={() => navigation.goBack()}
        onPress_2={() => navigation.navigate("EditProfile")}
        icon_1={<ArrowLeftIcon size="30" color="white" />}
        icon_2={<PencilIcon size="30" color="white" />}
      />
      <View className="px-10 mb-5">
        <View className="flex-row mt-2 items-center">
          <Avatar.Image
            source={{ uri: "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png" }}
            size={80}
          />

          <View className="ml-4">
            <Title style={{ fontSize: 24, fontWeight: "bold" }}>John Doe</Title>
            <Caption>@john</Caption>
          </View>
        </View>
      </View>

      <View className="px-10 mb-5 ">
        <View className="flex-row items-center mb-2">
          <PhoneIcon size={18} color={"gray"} />
          <Text className="text-gray-400 text-sm ml-2">+0123456789</Text>
        </View>
        <View className=" flex-row items-center mb-2">
          <EnvelopeIcon size={18} color={"gray"} />
          <Text className="text-gray-400 text-sm ml-2">johnDoe@gmail.com</Text>
        </View>
      </View>

      <View className="border-b-gray-400 border-t-2 border-t-gray-400 border-b-2 flex-row h-[100px] mb-3">
        <View className="w-1/2 items-center justify-center border-r-2 border-r-gray-400">
          <Text>12</Text>
          <Caption>Pill take</Caption>
        </View>
        <View className="w-1/2 items-center justify-center">
          <Text>12</Text>
          <Caption>Pill take</Caption>
        </View>
      </View>

      <View className="mt-5 ">
        <TouchableRipple onPress={() => {}}>
          <View className="flex-row items-center px-10 py-4 ">
            <PresentationChartBarIcon size={25} color="red" />
            <Text className="ml-3 text-gray-500 font-bold">Progress</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View className="flex-row items-center px-10 py-4 ">
            <CreditCardIcon size={25} color="red" />
            <Text className="ml-3 text-gray-500 font-bold">Premium</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View className="flex-row items-center px-10 py-4 ">
            <Cog6ToothIcon size={25} color="red" />
            <Text className="ml-3 text-gray-500 font-bold">Setting</Text>
          </View>
        </TouchableRipple>
      </View>
    </View>
  );
};

export default Profile;
