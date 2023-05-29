import { View, Text, TouchableOpacity, ImageBackground, Platform, TextInput } from "react-native";
import React, { useRef } from "react";
import { Avatar } from "react-native-paper";

import { ArrowLeftIcon, CameraIcon } from "react-native-heroicons/solid";
import { UserIcon, PhoneIcon, EnvelopeIcon } from "react-native-heroicons/outline";
import HeaderCustom from "../../components/HeaderCustom";
import { BottomSheet } from "react-native-sheet";

const BottomSheetCustom = ({ bottomSheet }) => (
  <BottomSheet height={350} ref={bottomSheet}>
    <View className="items-center justify-center mt-5">
      <Text className="text-xl font-bold">Upload Photo</Text>
      <Text className="text-sm text-gray-600 font-semibold">Chose Your Profile Picture</Text>
    </View>
    <TouchableOpacity onPress={() => {}} className="bg-[#FF6347] items-center p-3 mt-5 mx-4 rounded-lg">
      <Text className="font-bold text-white text-lg">Take Photo</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {}} className="bg-[#FF6347] items-center p-3 mt-5 mx-4  rounded-lg">
      <Text className="font-bold text-white text-lg">Choose From Library</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => bottomSheet.current?.hide()}
      className="bg-[#FF6347] items-center p-3 mt-5 mx-4  rounded-lg"
    >
      <Text className="font-bold text-white text-lg">Cancel</Text>
    </TouchableOpacity>
  </BottomSheet>
);

const EditProfile = ({ navigation }) => {
  const bottomSheet = useRef(null);

  return (
    <View className="flex-1 bg-white">
      <HeaderCustom
        name={
          <View className="justify-center items-center mr-16">
            <Text className="text-center font-bold text-white text-xl">Edit Profile</Text>
          </View>
        }
        left={
          <TouchableOpacity className=" p-2 ml-4" onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size="30" color="white" />
          </TouchableOpacity>
        }
      />

      <View className="m-5 ">
        <BottomSheetCustom bottomSheet={bottomSheet} />
        <View className="justify-center items-center">
          <TouchableOpacity className="" onPress={() => bottomSheet.current.show()}>
            <View className="h-[100px] w-[100px]">
              <ImageBackground
                source={{ uri: "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png" }}
                className="w-[100px] h-[100px] rounded-lg bg-yellow-400"
              >
                <View className="justify-center items-center   h-[100px] w-[100px]">
                  <CameraIcon size={25} color={"white"} />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <Text className="font-bold text-lg">John Doe</Text>
        </View>

        <View className="items-center justify-center flex-row border-b-2 border-b-gray-200 mt-4 ">
          <UserIcon size={25} color={"gray"} />
          <TextInput
            placeholder="Name"
            placeholderTextColor={"#666666"}
            autoCorrect={false}
            style={{ flex: 1, marginTop: Platform.OS === "ios" ? 0 : 0, paddingLeft: 10, color: "#05375a" }}
          />
        </View>
        <View className="items-center justify-center flex-row border-b-2 border-b-gray-200 mt-4 ">
          <EnvelopeIcon size={25} color={"gray"} />
          <TextInput
            placeholder="Email"
            placeholderTextColor={"#666666"}
            autoCorrect={false}
            style={{ flex: 1, marginTop: Platform.OS === "ios" ? 0 : 0, paddingLeft: 10, color: "#05375a" }}
          />
        </View>
        <View className="items-center justify-center flex-row border-b-2 border-b-gray-200 mt-4 ">
          <PhoneIcon size={25} color={"gray"} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor={"#666666"}
            autoCorrect={false}
            style={{ flex: 1, marginTop: Platform.OS === "ios" ? 0 : 0, paddingLeft: 10, color: "#05375a" }}
          />
        </View>
        <TouchableOpacity onPress={() => {}} className="bg-[#FF6347] items-center p-3 mt-5 rounded-lg">
          <Text className="font-bold text-white text-lg">Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;
